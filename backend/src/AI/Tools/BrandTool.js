import {tool} from "@langchain/core/tools"
import {z} from "zod"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const baseUrl = process.env.BASEURL

const createBrandTool = tool(
  async ({  brandName },{ configurable }) => {
    
    const {  token } = configurable;


    if (!brandName) return " Brand name cannot be empty.";
    

    try {
      const response = await axios.post(
        `${baseUrl}/CreateBrands`,
        {
          Name: brandName,
        },
        {
          headers: {
            "Content-Type": "application/json",
           
            token: token
            },
        }
      );

      if (response.data.status === "success") {
        return `Brand "${brandName}" created successfully  !`; 
      } else {
        return ` Unable to create brand. Server says: ${response.data.message}`;
      }
    } catch (err) {
      console.error(" createBrandTool Error:", err.response?.data || err);
      return ` Failed to create brand. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "create_brand",
    description: "Create a new brand in the IMS (requires user email).",
    schema: z.object({
      
      brandName: z.string().describe("The brand name to create"),
      
    }),
  }
);

const updateBrandTool = tool(
  async ({ oldBrandName, newBrandName }, { configurable }) => {
    const { token } = configurable;

    if (!token) return " Authorization token missing.";
    if (!oldBrandName) return " Old brand name is required.";
    if (!newBrandName) return " New brand name is required.";

    try {
      //  Fetch Brand Dropdown
      const dropdownRes = await axios.get(`${baseUrl}/BrandsDropDown`, {
        headers: { token }
      });

      const brands = dropdownRes.data?.data || dropdownRes.data;

      // Locate brand by name (case-insensitive)
      const brand = brands.find(
        (b) => b.Name.toLowerCase() === oldBrandName.toLowerCase()
      );

      if (!brand) {
        return ` Brand "${oldBrandName}" not found in your system.`;
      }

      const brandId = brand._id;

      //  Update brand
      const updateRes = await axios.post(
        `${baseUrl}/UpdateBrands/${brandId}`,
        { Name: newBrandName },
        { headers: { token } }
      );

      if (updateRes.data.status === "success") {
        return `✅ Brand updated successfully: "${oldBrandName}" → "${newBrandName}"`;
      } else {
        return `⚠️ Update failed. Server says: ${updateRes.data.message}`;
      }

    } catch (err) {
      console.error(" updateBrandTool Error:", err.response?.data || err);
      return ` Failed to update brand. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "update_brand",
    description: "Update an existing brand name using only old and new names.",
    schema: z.object({
      oldBrandName: z.string().describe("The current brand name to modify"),
      newBrandName: z.string().describe("The new brand name to assign"),
    }),
  }
);


const brandListTool = tool(
  async ({ pageNo, perPage, searchKeyword }, { configurable }) => {
    const { token } = configurable || {};

    if (!token) return " Authorization token missing.";

    // Default values
    pageNo = pageNo || 1;
    perPage = perPage || 10;
    searchKeyword = searchKeyword || "0";

    try {
      const response = await axios.get(
        `${baseUrl}/BrandsList/${pageNo}/${perPage}/${searchKeyword}`,
        { headers: { token } }
      );

      const list = response.data?.data[0].Rows || [];
      const total = response.data?.data[0].Total || 0;

      if (list.length === 0) {
        return " No brands found.";
      }

      let formatted = ` Brand List (Total: ${total})`;
      list.forEach((item, index) => {
        formatted += `${index + 1}. **${item.Name}** (id: ${item._id})\n`;
      });

      return formatted;
    } catch (err) {
      console.error(" brandListTool Error:", err.response?.data || err);
      return `Failed to fetch brand list: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "brand_list",
    description: "Fetch a list of brands with pagination and optional search.",
    schema: z.object({
      pageNo: z.number().optional().describe("Page number for pagination"),
      perPage: z.number().optional().describe("Number of items per page"),
      searchKeyword: z.string().optional().describe("Keyword to search brand name"),
    }),
  }
);



const brandDropdownTool = tool(
  async ({}, { configurable }) => {
    try {
      const { token } = configurable || {};
      const response = await axios.get(`${baseUrl}/BrandsDropDown`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.data.status === "success") {
        const brands = response.data.data.map(item => item.Name) || [];

        if (brands.length === 0) {
          return " No brands found in your inventory.";
        }

        return " Available Brands:\n" + brands.map(b => `• ${b}`).join("\n");
      } else {
        return ` Unable to fetch brand list. Server says: ${response.data.message}`;
      }
    } catch (err) {
      console.error(" brandDropdownTool Error:", err.response?.data || err);
      return ` Failed to load brands. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "brand_dropdown_list",
    description: "Fetches the list of all brands as dropdown options.",
    schema: z.object({}),
  }
);


export { createBrandTool, updateBrandTool, brandListTool,brandDropdownTool };