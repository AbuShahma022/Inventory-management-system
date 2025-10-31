import React, { useEffect, useState } from "react";
import { CategoryCreate, CategoryUpdate, CategoryDetailsByID } from "../../APIRequest/CategoryAPI";
import { ErrorToast, IsEmpty } from "../../Helper/FormHelper";
import { useParams, useNavigate } from "react-router-dom";

function CategoryCreateUpdateComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Name, setName] = useState("");

  // Load existing data when updating
  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const data = await CategoryDetailsByID(id);
        if (data) setName(data.Name);
      })();
    }
  }, [id]);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (IsEmpty(Name)) {
      ErrorToast("Category name is required");
      return;
    }

    let result;
    if (id !== undefined) {
      // Update
      result = await CategoryUpdate(id, { Name });
    } else {
      // Create
      result = await CategoryCreate({ Name });
      
    }

    if (result === true) {
    
        if (id) {
    // If updating → Go back to list page
    navigate("/category/list");
  } else {
    // If creating → Stay on the same page and clear input
    setName("");
  }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {id ? "Update Category" : "Create Category"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Category Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-4"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Category Name"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CategoryCreateUpdateComponent;
