import {tool} from "@langchain/core/tools"
import {z} from "zod"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const baseUrl = process.env.BASEURL

const expenseAnalysisTool = tool(
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

      const response = await axios.post(
        `${baseUrl}/ExpenseByDate`,
        { fromDate, toDate },
        { headers: { token } }
      );

      // Accept both Status or status field
      const status = response.data.Status || response.data.status;

      if (status !== "success") {
        return " No expenses found in this date range.";
      }

      const block = response.data.data?.[0];
      if (!block) return " No expense records returned from server.";

      const total = block.Total?.[0]?.TotalAmount || 0;
      const rows = block.Rows || [];

      if (rows.length === 0) return " No expenses found.";

      // Group by category
      const categoryTotals = {};
      rows.forEach((item) => {
        const categoryName = item.Type?.[0]?.Name || "Unknown";
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + item.Amount;
      });

      // Find highest spending category
      const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]; //converting obj to array of key-value pairs
      const highestName = highestCategory?.[0];
      const highestAmount = highestCategory?.[1];

      // Construct summary
      let summary = ` **Expense Summary** (${new Date(fromDate).toLocaleDateString()} → ${new Date(toDate).toLocaleDateString()})\n\n`;
      summary += ` **Total Spending:** ${total}\n`;
      summary += ` **Highest Expense Category:** ${highestName} (${highestAmount})\n\n`;

      // Smart advice
      if (highestAmount > total * 0.5) {
        summary += ` More than *50%* of your spending is in "${highestName}". Consider reducing this cost.\n\n`;
      } else {
        summary += ` Your spending is balanced across categories.\n\n`;
      }

      summary += ` **Category Breakdown:**\n`;
      for (const [cat, amt] of Object.entries(categoryTotals)) {
        summary += `• ${cat}: ${amt}\n`;
      }

      return summary;

    } catch (err) {
      console.error(" expenseAnalysisTool Error:", err.response?.data || err.message);
      return ` Could not analyze expenses. Error: ${err.response?.data?.data || err.message}`;
    }
  },
  {
    name: "expense_summary_analysis",
    description:
      "Summarize & analyze expenses. If no date is given, it summarizes last 30 days automatically.",
    schema: z.object({
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
    }),
  }
);

export {expenseAnalysisTool}