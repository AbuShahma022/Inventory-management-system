import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ExpenseTypeCreate,
  ExpenseTypeDetailsByID,
  ExpenseTypeUpdate,
} from "../../APIRequest/ExpenseTypeAPI";
import { ErrorToast, SuccessToast, IsEmpty } from "../../Helper/FormHelper";

function ExpenseTypeCreateUpdateComponent() {
  const { id } = useParams(); // optional id for edit
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
  });

  const [loading, setLoading] = useState(false);

  // Load data when editing
  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        setLoading(true);
        const data = await ExpenseTypeDetailsByID(id);
        if (data) {
          setFormData({
            Name: data?.Name || "",
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
    if (IsEmpty(formData.Name)) return ErrorToast("Expense Type Name Required");

    setLoading(true);

    try {
      if (id === undefined) {
        // Create
        const result = await ExpenseTypeCreate(formData);
        if (result === true) {
          SuccessToast("Expense Type Created Successfully");
          // stay on page; reset form
          setFormData({ Name: "" });
        }
      } else {
        // Update
        const result = await ExpenseTypeUpdate(id, formData);
        if (result === true) {
          SuccessToast("Expense Type Updated Successfully");
          navigate("/expense/type/list");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {id ? "Update Expense Type" : "Create Expense Type"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expense Type Name
          </label>
          <input
            type="text"
            value={formData.Name}
            onChange={(e) => handleChange("Name", e.target.value)}
            placeholder="Enter Expense Type Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
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

export default ExpenseTypeCreateUpdateComponent;
