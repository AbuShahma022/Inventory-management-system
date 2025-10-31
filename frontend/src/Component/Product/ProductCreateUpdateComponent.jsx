import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProductCreate,
  ProductUpdate,
  ProductDetailsById,
} from "../../APIRequest/ProductAPI";
import { BrandDropDownList } from "../../APIRequest/BrandAPIRequest";
import { CategoryDropDown } from "../../APIRequest/CategoryAPI";
import { ErrorToast, IsEmpty } from "../../Helper/FormHelper";

function ProductCreateUpdateComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [formData, setFormData] = useState({
    Name: "",
    Unit: "",
    Details: "",
    BrandId: "",
    CategoryId: "",
  });

  // Load Dropdown Data
  useEffect(() => {
    (async () => {
      const brands = await BrandDropDownList();
      const categories = await CategoryDropDown();
      setBrandList(brands || []);
      setCategoryList(categories || []);
    })();
  }, []);

  // Load Product Data if update mode
  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        setLoading(true);
        const data = await ProductDetailsById(id);
        if (data) {
          setFormData({
            Name: data?.Name || "",
            Unit: data?.Unit || "",
            Details: data?.Details || "",
            BrandId: data?.BrandId || "",
            CategoryId: data?.CategoryId || "",
          });
        }
        setLoading(false);
      })();
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (IsEmpty(formData.Name)) return ErrorToast("Product Name Required");
    if (IsEmpty(formData.Unit)) return ErrorToast("Product Unit Required");
    if (IsEmpty(formData.BrandId)) return ErrorToast("Select a Brand");
    if (IsEmpty(formData.CategoryId)) return ErrorToast("Select a Category");

    setLoading(true);
    try {
      if (id === undefined) {
        // Create
        const result = await ProductCreate(formData);
        if (result === true) {
          
          setFormData({
            Name: "",
            Unit: "",
            Details: "",
            BrandId: "",
            CategoryId: "",
          });
        }
      } else {
        // Update
        const result = await ProductUpdate(id, formData);
        if (result === true) {
          
          navigate("/product/list");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {id ? "Update Product" : "Create Product"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.Name}
            onChange={(e) => handleChange("Name", e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <input
            type="text"
            value={formData.Unit}
            onChange={(e) => handleChange("Unit", e.target.value)}
            placeholder="e.g. pcs, kg, box"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            value={formData.BrandId}
            onChange={(e) => handleChange("BrandId", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Brand</option>
            {brandList.map((item, i) => (
              <option key={i} value={item._id}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.CategoryId}
            onChange={(e) => handleChange("CategoryId", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Category</option>
            {categoryList.map((item, i) => (
              <option key={i} value={item._id}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Details
          </label>
          <textarea
            value={formData.Details}
            onChange={(e) => handleChange("Details", e.target.value)}
            placeholder="Enter details"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-blue-400 cursor-wait"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {loading ? (id ? "Updating..." : "Creating...") : id ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCreateUpdateComponent;
