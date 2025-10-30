import { tool } from "@langchain/core/tools";
import { z } from "zod";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const baseUrl = process.env.BASEURL;

const returnAnalysisTool = tool(
  async ({ fromDate, toDate }, { configurable }) => {
    const { token } = configurable || {};
    if (!token) return " Authorization token missing.";

    try {
      // Auto last 30 days if missing
      if (!fromDate || !toDate) {
        const now = new Date();
        const past = new Date();
        past.setDate(now.getDate() - 30);

        fromDate = past.toISOString();
        toDate = now.toISOString();
      }

      // API request
      const response = await axios.post(
        `${baseUrl}/ReturnByDate`,
        { fromDate, toDate },
        { headers: { token } }
      );

      const status = response.data.Status || response.data.status;
      if (status !== "success") return " No return records found in this date range.";

      const block = response.data.data?.[0];
      const totalReturned = block?.Total?.[0]?.TotalAmount || 0;
      const rows = block?.Rows || [];

      if (rows.length === 0) return " No return records found.";

      // Grouping totals
      const brandTotals = {};
      const categoryTotals = {};
      const productTotals = {};

      rows.forEach((item) => {
        const brand = item.brands?.[0]?.Name || "Unknown";
        const category = item.categories?.[0]?.Name || "Unknown";
        const product = item.products?.Name || "Unknown";

        brandTotals[brand] = (brandTotals[brand] || 0) + item.Total;
        categoryTotals[category] = (categoryTotals[category] || 0) + item.Total;
        productTotals[product] = (productTotals[product] || 0) + item.Total;
      });

      const getTop = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])[0];

      const topBrand = getTop(brandTotals);
      const topCategory = getTop(categoryTotals);
      const topProduct = getTop(productTotals);

      const formattedFrom = new Date(fromDate).toLocaleDateString();
      const formattedTo = new Date(toDate).toLocaleDateString();

      let summary = ` Return Summary (${formattedFrom} → ${formattedTo})`;
      summary += ` Total Returned Amount: ${totalReturned}`;

      if (topBrand) summary += ` Most Returned Brand: ${topBrand[0]} (${topBrand[1]})\n`;
      if (topCategory) summary += ` Most Returned Category: ${topCategory[0]} (${topCategory[1]})`;
      if (topProduct) summary += ` Most Returned Product: ${topProduct[0]} (${topProduct[1]})`;

      summary += `\n🔍 Category Breakdown:`;
      Object.entries(categoryTotals).forEach(([cat, amt]) => {
        summary += `• ${cat}: ${amt}\n`;
      });

      // Insight logic
      if (topBrand && topBrand[1] > totalReturned * 0.6) {
        summary += `Insight: Large number of returns from ${topBrand[0]}. Investigate quality or service issues.`;
      } else {
        summary += ` Insight:** Return distribution looks balanced.`;
      }

      return summary;

    } catch (err) {
      console.error(" returnAnalysisTool Error:", err.response?.data || err.message);
      return ` Could not analyze returns. Error: ${err.response?.data?.data || err.message}`;
    }
  },
  {
    name: "return_analysis",
    description:
      "Analyze product returns within a date range. If no date is given, analyzes the last 30 days automatically.",
    schema: z.object({
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
    }),
  }
);

export { returnAnalysisTool };
