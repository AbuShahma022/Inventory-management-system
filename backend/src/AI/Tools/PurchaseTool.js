import {tool} from "@langchain/core/tools"
import {z} from "zod"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const baseUrl = process.env.BASEURL

const purchaseAnalysisTool = tool(
  async ({ fromDate, toDate }, { configurable }) => {
    const { token } = configurable || {};
    if (!token) return " Authorization token missing.";

    try {
      // Auto last 30 days if no date provided
      if (!fromDate || !toDate) {
        const now = new Date();
        const past = new Date();
        past.setDate(now.getDate() - 30);

        fromDate = past.toISOString();
        toDate = now.toISOString();
      }

      const response = await axios.post(
        `${baseUrl}/PurchaseByDate`,
        { fromDate, toDate },
        { headers: { token } }
      );

      const status = response.data.Status || response.data.status;
      if (status !== "success") return " No purchase records found in this date range.";

      const block = response.data.data?.[0];
      if (!block) return " No purchase data returned.";

      const totalPurchase = block.Total?.[0]?.TotalAmount || 0;
      const rows = block.Rows || [];
      if (rows.length === 0) return " No purchase records found.";

      // Group totals by Brand
      const brandTotals = {};
      // Group totals by Category
      const categoryTotals = {};
      // Group totals by Product Name
      const productTotals = {};

      rows.forEach((item) => {
        const brand = item.Brand?.[0]?.Name || "Unknown";
        const category = item.Category?.[0]?.Name || "Unknown";
        const product = item.Products?.Name || "Unknown";

        brandTotals[brand] = (brandTotals[brand] || 0) + item.Total;
        categoryTotals[category] = (categoryTotals[category] || 0) + item.Total;
        productTotals[product] = (productTotals[product] || 0) + item.Total;
      });

      // Helper to find biggest group
      const getTop = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])[0];

      const topBrand = getTop(brandTotals);
      const topCategory = getTop(categoryTotals);
      const topProduct = getTop(productTotals);

      // Build Summary
      let summary = ` **Purchase Summary** (${new Date(fromDate).toLocaleDateString()} → ${new Date(toDate).toLocaleDateString()})\n\n`;
      summary += ` **Total Purchase Amount:** ${totalPurchase}\n\n`;
      summary += ` **Top Brand Purchased:** ${topBrand[0]} (${topBrand[1]})\n`;
      summary += ` **Most Purchased Category:** ${topCategory[0]} (${topCategory[1]})\n`;
      summary += ` **Most Purchased Product:** ${topProduct[0]} (${topProduct[1]})\n\n`;

      // Advice
      if (topBrand[1] > totalPurchase * 0.5) {
        summary += ` Over 50% of expenditure is from brand **"${topBrand[0]}"**. Consider balancing your supplier sources.\n`;
      } else {
        summary += ` Purchases seem well-distributed across brands.\n`;
      }

      summary += `\n **Category Breakdown:**\n`;
      for (const [cat, amt] of Object.entries(categoryTotals)) {
        summary += `• ${cat}: ${amt}\n`;
      }

      return summary;

    } catch (err) {
      console.error(" purchaseAnalysisTool Error:", err.response?.data || err.message);
      return ` Could not analyze purchases. Error: ${err.response?.data?.data || err.message}`;
    }
  },
  {
    name: "purchase_summary_analysis",
    description:
      "Summarize & analyze purchase activity. If no date is given, analyzes last 30 days.",
    schema: z.object({
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
    }),
  }
);

export { purchaseAnalysisTool }