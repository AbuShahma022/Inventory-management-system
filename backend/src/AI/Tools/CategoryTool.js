import {tool} from "@langchain/core/tools"
import {z} from "zod"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const baseUrl = process.env.BASEURL

const createCategoryTool = tool(
  async ({ categoryName }, { configurable }) => {
    const { token } = configurable;

    if (!categoryName) return " Category name cannot be empty.";

    try {
      const response = await axios.post(
        `${baseUrl}/CreateCategory`,
        {
          Name: categoryName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.data.status === "success") {
        return `✅ Category "${categoryName}" created successfully!`;
      } else {
        return `⚠️ Unable to create category. Server says: ${response.data.message}`;
      }
    } catch (err) {
      console.error(" createCategoryTool Error:", err.response?.data || err);
      return ` Failed to create category. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "create_category",
    description: "Create a new category in the IMS.",
    schema: z.object({
      categoryName: z.string().describe("The category name to create"),
    }),
  }
);

const updateCategoryTool = tool(
  async ({ oldCategoryName, newCategoryName }, { configurable }) => {
    const { token } = configurable;

    if (!oldCategoryName || !newCategoryName) {
      return " Both old and new category names are required.";
    }

    try {
      // 1️⃣ Get Category Dropdown to find ID
      const dropdownRes = await axios.get(`${baseUrl}/CategoryDropDown`, {
        headers: { token }
      });

      const categories = dropdownRes.data?.data || dropdownRes.data;

      // 2️⃣ Find matching category
      const category = categories.find(
        (cat) => cat.Name.toLowerCase() === oldCategoryName.toLowerCase()
      );

      if (!category) {
        return ` Category "${oldCategoryName}" not found.`;
      }

      const categoryId = category._id;

      // 3️⃣ Update Category
      const updateRes = await axios.post(
        `${baseUrl}/UpdateCategory/${categoryId}`,
        { Name: newCategoryName },
        { headers: { token } }
      );

      if (updateRes.data.status === "success") {
        return `✅ Category updated successfully: "${oldCategoryName}" → "${newCategoryName}"`;
      } else {
        return `⚠️ Unable to update category. Server says: ${updateRes.data.message}`;
      }
    } catch (err) {
      console.error(" updateCategoryTool Error:", err.response?.data || err);
      return ` Failed to update category. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "update_category",
    description: "Update a category name in the IMS using only names.",
    schema: z.object({
      oldCategoryName: z.string().describe("The current category name"),
      newCategoryName: z.string().describe("The new category name to update to"),
    }),
  }
);

const categoryDropdownTool = tool(
  async ({}, { configurable }) => {
    try {
      const { token } = configurable || {};

      const response = await axios.get(`${baseUrl}/CategoryDropDown`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (response.data.status === "success") {
        const categories = response.data.data.map(item => item.Name) || [];

        if (categories.length === 0) {
          return "⚠️ No categories found in your inventory.";
        }

        return "🟢 Available Categories:\n" + categories.map(c => `• ${c}`).join("\n");
      } else {
        return `⚠️ Unable to fetch category list. Server says: ${response.data.message}`;
      }
    } catch (err) {
      console.error(" categoryDropdownTool Error:", err.response?.data || err);
      return ` Failed to load categories. Error: ${err.response?.data?.message || err.message}`;
    }
  },
  {
    name: "category_dropdown_list",
    description: "Fetches the list of all categories as dropdown options.",
    schema: z.object({}),
  }
);



export {createCategoryTool, updateCategoryTool, categoryDropdownTool}