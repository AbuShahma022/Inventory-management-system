import {tool} from "@langchain/core/tools"
import {z} from "zod"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const baseUrl = process.env.BASEURL

const customerDropdownTool = tool(
  async ({}, { configurable }) => {
    try {
      const { token } = configurable || {};

      const response = await axios.get(`${baseUrl}/CustomerDropDown`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.data.status === "success") {
        const customers = response.data.data.map(item => item.Name) || [];

        if (customers.length === 0) {
          return " No customers found in your records.";
        }

        return " Available Customers:\n" + customers.map(c => `• ${c}`).join("\n");
      } else {
        return ` Unable to fetch customer list. Server says: ${response.data.message}`;
      }
    } catch (err) {
      console.error(" customerDropdownTool Error:", err.response?.data || err);
      return ` Failed to load customers. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "customer_dropdown_list",
    description: "Fetches the list of customers as dropdown options.",
    schema: z.object({}),
  }
);


const customerDetailsByNameTool = tool(
  async ({ customerName }, { configurable }) => {
    const { token } = configurable || {};
    if (!token) return " Authorization token missing.";
    if (!customerName) return " Customer name is required.";

    try {
      // 1) Get customer dropdown to find ID
      const dropdownRes = await axios.get(`${baseUrl}/CustomerDropDown`, {
        headers: { token }
      });

      const list = dropdownRes.data?.data || [];

      if (list.length === 0) {
        return "⚠️ No customers found in your system.";
      }

      // 2) Match customer by Name (case insensitive smart match)
      const found = list.find(
        c => c.Name.toLowerCase() === c.Name.toLowerCase()
      );

      if (!found) {
        return ` Customer "${customerName}" not found. Try verifying spelling.`;
      }

      const customerId = found._id;

      // 3) Now fetch details using ID
      const detailRes = await axios.get(`${baseUrl}/DetailByIdCustomer/${customerId}`, {
        headers: { token }
      });

      if (detailRes.data.status !== "success") {
        return `⚠️ Failed to fetch details. ${detailRes.data.message}`;
      }

      const data = detailRes.data.data[0] || {};

      return (
        `Customer Details Found` +
        `Name: ${data.Name || "N/A"}` +
        `Phone: ${data.Phone || "N/A"}` +
        `Email: ${data.email || "N/A"}` +
        `Address: ${data.Address || "N/A"}`
      );

    } catch (err) {
      console.error(" customerDetailsByNameTool Error:", err.response?.data || err);
      return ` Failed to load customer details. Error: ${
        err.response?.data?.message || err.message
      }`;
    }
  },
  {
    name: "customer_details",
    description: "Get customer details by name without needing the ID.",
    schema: z.object({
      customerName: z.string().describe("Name of the customer to lookup")
    }),
  }
);

export {customerDropdownTool, customerDetailsByNameTool}