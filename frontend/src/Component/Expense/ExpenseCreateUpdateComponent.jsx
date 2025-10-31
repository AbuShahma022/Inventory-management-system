import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ExpenseCreate, ExpenseDetailsByID, ExpenseUpdate } from "../../APIRequest/ExpenseAPI";
import { ExpenseTypeDropdownList } from "../../APIRequest/ExpenseTypeAPI";
import { ErrorToast, SuccessToast } from "../../Helper/FormHelper";

function ExpenseCreateUpdateComponent() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [typeList, setTypeList] = useState([]);
  const [formData, setFormData] = useState({
    TypeId: "",
    Amount: "",
    Note: ""
  });

  // Fetch dropdown list
  useEffect(() => {
    ExpenseTypeDropdownList().then((res) => {
      setTypeList(res);
    });
  }, []);

  // If update load details
  useEffect(() => {
    if (id) {
      ExpenseDetailsByID(id).then((res) => {
        if (res !== null) {
          setFormData({
            TypeId: res.TypeId,
            Amount: res.Amount,
            Note: res.Note
          });
        }
      });
    }
  }, [id]);

  // Form Input Handler
  const inputOnChange = (property, value) => {
    setFormData((prev) => ({
      ...prev,
      [property]: value
    }));
  };

  // Submit Handler
  const onSubmit = async () => {
    if (!formData.TypeId) return ErrorToast("Expense Type is Required");
    if (!formData.Amount) return ErrorToast("Expense Amount is Required");

    if (id) {
      // Update Mode
      let result = await ExpenseUpdate(id, formData);
      if (result === true) {
        navigate("/expense/List");
      }
    } else {
      // Create Mode
      let result = await ExpenseCreate(formData);
      if (result === true) {
        
        setFormData({ TypeId: "", Amount: "", Note: "" });
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl bg-white rounded shadow">

      <h3 className="text-lg font-semibold mb-4">
        {id ? "Update Expense" : "Create Expense"}
      </h3>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Expense Type</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={formData.TypeId}
          onChange={(e) => inputOnChange("TypeId", e.target.value)}
        >
          <option value="">Select Type</option>
          {typeList.map((item) => (
            <option key={item._id} value={item._id}>
              {item.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={formData.Amount}
          onChange={(e) => inputOnChange("Amount", e.target.value)}
          placeholder="Enter Expense Amount"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Note </label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={formData.Note}
          onChange={(e) => inputOnChange("Note", e.target.value)}
          placeholder="Enter Note"
        ></textarea>
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {id ? "Update" : "Create"}
      </button>

    </div>
  );
}

export default ExpenseCreateUpdateComponent;
