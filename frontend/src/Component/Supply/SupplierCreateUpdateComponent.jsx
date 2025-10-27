import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  SupplyCreate,
  SupplyDetailsByID,
  SupplyUpdate,
} from "../../APIRequest/SupplyAPI.js";
import { ErrorToast, SuccessToast, IsEmpty } from "../../Helper/FormHelper.js";

function SupplierCreateUpdateComponent() {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // Load Supplier data if editing
  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        setLoading(true);
        const data = await SupplyDetailsByID(id);

        if (data) {
          setFormData({
            Name: data?.Name || "",
            Address: data?.Address || "",
            Phone: data?.Phone || "",
            email: data?.email || "",
          });
        }
        setLoading(false);
      })();
    }
  }, [id]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (IsEmpty(formData.Name)) return ErrorToast("Supplier Name Required");
    if (IsEmpty(formData.Address)) return ErrorToast("Address Required");
    if (IsEmpty(formData.Phone)) return ErrorToast("Phone Required");
    if (IsEmpty(formData.email)) return ErrorToast("Supplier Email Required");

    setLoading(true);

    try {
      if (id === undefined) {
        const result = await SupplyCreate(formData);
        if (result === true) {
          SuccessToast("Supplier Created Successfully");
          // Stay on same page, reset form
          setFormData({ Name: "", Address: "", Phone: "", email: "" });
        }
      } else {
        const result = await SupplyUpdate(id, formData);
        if (result === true) {
          SuccessToast("Supplier Updated Successfully");
          navigate("/supplier/list");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {id ? "Update Supplier" : "Create Supplier"}
      </h2>

      <div className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supplier Name
          </label>
          <input
            type="text"
            value={formData.Name}
            onChange={(e) => handleChange("Name", e.target.value)}
            placeholder="Enter supplier name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={formData.Address}
            onChange={(e) => handleChange("Address", e.target.value)}
            placeholder="Enter address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              value={formData.Phone}
              onChange={(e) => handleChange("Phone", e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
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

export default SupplierCreateUpdateComponent;
