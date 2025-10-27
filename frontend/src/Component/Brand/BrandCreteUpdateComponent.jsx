import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BrandDetailsByID,
  CreateBrand,
  UpdateBrand,
} from "../../APIRequest/BrandAPIRequest";
import { ErrorToast, SuccessToast } from "../../Helper/FormHelper";

function BrandCreteUpdateComponent() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");

  // ✅ Load existing data safely
  useEffect(() => {
    if (isEdit) {
      (async () => {
        const details = await BrandDetailsByID(id);

        if (details && details.Name !== undefined) {
          setName(details.Name);
        }
      })();
    }
  }, [id, isEdit]);

  // ✅ Submit handler
  const handleSubmit = async () => {
    if (!name.trim()) {
      ErrorToast("Brand name required!");
      return;
    }

    let result;
    if (isEdit) {
      result = await UpdateBrand({ id, Name: name });
      if (result === true) {
        SuccessToast("Brand Updated Successfully");
        navigate("/brand/list"); // ✅ Go to list only when editing
      }
    } else {
      result = await CreateBrand({ Name: name });
      if (result === true) {
        SuccessToast("Brand Created Successfully");
        setName(""); // ✅ Stay on page & clear form
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md border border-gray-200">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEdit ? "Update Brand" : "Create Brand"}
        </h2>

        <label className="block mb-2 text-gray-700">Brand Name</label>
        <input
          type="text"
          value={name ?? ""} // ✅ Prevent undefined → controlled always
          placeholder="Enter brand name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}

export default BrandCreteUpdateComponent;
