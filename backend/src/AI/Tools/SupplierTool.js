import {tool} from "@langchain/core/tools"
import {z} from "zod"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const baseUrl = process.env.BASEURL

const supplierDropdownTool = tool(
  async ({}, { configurable }) => {
    const { token } = configurable || {};
    if (!token) return " Authorization token missing.";

    try {
      const response = await axios.get(`${baseUrl}/SupplierDropDown`, {
        headers: {
          "Content-Type": "application/json",
          token: token
        }
      });

      if (response.data.status !== "success") {
        return ` Failed to fetch suppliers. Server says: ${response.data.message}`;
      }

      const suppliers = response.data.data || [];
      if (suppliers.length === 0) {
        return " No suppliers found in your inventory.";
      }

      const formattedList = suppliers.map(s => `• ${s.Name}`).join("\n");

      return ` **Available Suppliers:**\n\n${formattedList}`;

    } catch (err) {
      console.error(" supplierDropdownTool Error:", err.response?.data || err);
      return ` Failed to load suppliers. Error: ${
        err.response?.data?.message || err.message
      }`;
    }
  },
  {
    name: "supplier_dropdown_list",
    description: "Fetches a simple dropdown list of all suppliers.",
    schema: z.object({})
  }
);

const supplierDetailsTool = tool(
  async ({ supplierName }, { configurable }) => {
    const { token } = configurable || {};
    if (!token) return " Authorization token missing.";
    if (!supplierName) return " Supplier name is required.";

    try {
      // 1) Load Supplier Dropdown to find the ID
      const dropdownRes = await axios.get(`${baseUrl}/SupplierDropDown`, {
        headers: { token }
      });

      const suppliers = dropdownRes.data?.data || [];

      const match = suppliers.find(
        s => s.Name.toLowerCase() === s.Name.toLowerCase()
      );

      if (!match) {
        return ` Supplier "${supplierName}" not found.`;
      }

      const supplierId = match._id;

      // 2) Fetch Supplier Details Using ID
      const detailRes = await axios.get(
        `${baseUrl}/DetailSupplier/${supplierId}`,
        { headers: { token } }
      );

      if (detailRes.data.status !== "success") {
        return ` Failed to get supplier details. Server says: ${detailRes.data.message}`;
      }

      const data = detailRes.data.data[0];

      // 3) Nice formatted output
      return `
📦 **Supplier Details**
━━━━━━━━━━━━━━━━━━
**Name:** ${data.Name}
**Phone:** ${data.Phone || "N/A"}
**Email:** ${data.email || "N/A"}
**Address:** ${data.Address || "N/A"}
━━━━━━━━━━━━━━━━━━
      `.trim();

    } catch (err) {
      console.error(" supplierDetailsTool Error:", err.response?.data || err);
      return ` Failed to fetch supplier details. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "supplier_details_by_name",
    description: "Get supplier full details by providing the supplier name.",
    schema: z.object({
      supplierName: z.string().describe("The supplier name to lookup")
    })
  }
);

 
export { supplierDropdownTool , supplierDetailsTool}