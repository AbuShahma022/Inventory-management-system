import {tool} from "@langchain/core/tools"
import {z} from "zod"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const baseUrl = process.env.BASEURL


const salesAnalysisTool = tool(
  async ({ fromDate, toDate }, { configurable }) => {
    const { token } = configurable || {};
    if (!token) return " Authorization token missing.";

    try {
      // Auto last 30 days if user didn't provide date
      if (!fromDate || !toDate) {
        const now = new Date();
        const past = new Date();
        past.setDate(now.getDate() - 30);

        fromDate = past.toISOString();
        toDate = now.toISOString();
      }

      // API request
      const response = await axios.post(
        `${baseUrl}/SalesByDate`,
        { fromDate, toDate },
        { headers: { token } }
      );

      const status = response.data.Status || response.data.status;
      if (status !== "success") return " No sales records found in this date range.";

      const block = response.data.data?.[0];
      const totalSales = block?.Total?.[0]?.TotalAmount || 0;
      const rows = block?.Rows || [];

      if (rows.length === 0) return " No sales found.";

      // Grouping
      const brandTotals = {};
      const categoryTotals = {};
      const productTotals = {};

      rows.forEach((item) => {
        const brand = item.Brand?.[0]?.Name || "Unknown";
        const category = item.Category?.[0]?.Name || "Unknown";
        const product = item.Products?.Name || "Unknown";

        brandTotals[brand] = (brandTotals[brand] || 0) + item.Total;
        categoryTotals[category] = (categoryTotals[category] || 0) + item.Total;
        productTotals[product] = (productTotals[product] || 0) + item.Total;
      });

      // Find top in each
      const getTop = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])[0];

      const topBrand = getTop(brandTotals);
      const topCategory = getTop(categoryTotals);
      const topProduct = getTop(productTotals);

      const formattedFrom = new Date(fromDate).toLocaleDateString();
      const formattedTo = new Date(toDate).toLocaleDateString();

      let summary = ` **Sales Summary** (${formattedFrom} → ${formattedTo})\n\n`;
      summary += ` **Total Sales Amount:** ${totalSales}\n\n`;

      if (topBrand) summary += ` **Top Brand Sold:** ${topBrand[0]} (${topBrand[1]})\n`;
      if (topCategory) summary += ` **Most Sold Category:** ${topCategory[0]} (${topCategory[1]})\n`;
      if (topProduct) summary += ` **Best-selling Product:** ${topProduct[0]} (${topProduct[1]})\n`;

      summary += `\n🔍 **Category Breakdown:**\n`;
      Object.entries(categoryTotals).forEach(([cat, amt]) => {
        summary += `• ${cat}: ${amt}\n`;
      });

      // Smart insight
      if (topBrand && topBrand[1] > totalSales * 0.6) {
        summary += `\n **Insight:** Your sales heavily depend on **${topBrand[0]}**. Consider promoting variety to reduce risk.`;
      } else {
        summary += `\n **Insight:** Sales distribution is balanced across brands.`;
      }

      return summary;

    } catch (err) {
      console.error(" salesAnalysisTool Error:", err.response?.data || err.message);
      return ` Could not analyze sales. Error: ${err.response?.data?.data || err.message}`;
    }
  },
  {
    name: "sales_analysis",
    description:
      "Analyze sales within date range. If no date is given, analyzes last 30 days automatically.",
    schema: z.object({
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
    }),
  }
);
export { salesAnalysisTool }