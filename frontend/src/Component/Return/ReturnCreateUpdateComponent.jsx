import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ReturnCreate, ReturnDetailsById } from "../../APIRequest/ReturnAPI";
import { CustomerDropdownList } from "../../APIRequest/CustomerAPI";
import { ProductDropDownList } from "../../APIRequest/ProductAPI";
import { ErrorToast, SuccessToast, IsEmpty } from "../../Helper/FormHelper";

function ReturnCreateUpdateComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detailsData, setDetailsData] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [parent, setParent] = useState({
    CustomerId: "",
    VatTax: "",
    Discount: "",
    OtherCost: "",
    ShippingCost: "",
    GrandTotal: "",
    Note: ""
  });

  const [child, setChild] = useState([
    { ProductId: "", Qty: "", UnitCost: "", Total: "" }
  ]);

  // Load dropdown lists
  useEffect(() => {
    (async () => {
      setCustomers((await CustomerDropdownList()) || []);
      setProducts((await ProductDropDownList()) || []);
    })();
  }, []);

  // Load details if editing/viewing
  useEffect(() => {
    if (id) {
      (async () => {
        const data = await ReturnDetailsById(id);
        if (data) setDetailsData(data);
      })();
    }
  }, [id]);

  const handleParentChange = (key, value) =>
    setParent((prev) => ({ ...prev, [key]: value }));

  const handleChildChange = (index, key, value) => {
    const rows = [...child];
    rows[index][key] = value;

    if (key === "Qty" || key === "UnitCost") {
      const qty = parseFloat(rows[index].Qty) || 0;
      const cost = parseFloat(rows[index].UnitCost) || 0;
      rows[index].Total = qty * cost;
    }

    setChild(rows);
  };

  const addRow = () =>
    setChild([...child, { ProductId: "", Qty: "", UnitCost: "", Total: "" }]);

  const removeRow = (index) => {
    if (child.length === 1) return;
    setChild(child.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (IsEmpty(parent.CustomerId)) return ErrorToast("Customer Required");
    if (child.some((x) => IsEmpty(x.ProductId)))
      return ErrorToast("Product Required");

    const res = await ReturnCreate({ Parent: parent, Child: child });

    if (res === true) {
      

      setParent({
        CustomerId: "",
        VatTax: "",
        Discount: "",
        OtherCost: "",
        ShippingCost: "",
        GrandTotal: "",
        Note: ""
      });

      setChild([{ ProductId: "", Qty: "", UnitCost: "", Total: "" }]);
    }
  };

  // ✅ DETAILS UI
  if (id && detailsData) {
    const customerName =
      customers.find((c) => c._id === detailsData.CustomerId)?.Name ||
      "Unknown Customer";

    return (
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Return Details
        </h2>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Customer:</span>
            <span>{customerName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">VAT / Tax:</span>
            <span>{detailsData.VatTax}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Discount:</span>
            <span>{detailsData.Discount}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Other Cost:</span>
            <span>{detailsData.OtherCost}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Shipping Cost:</span>
            <span>{detailsData.ShippingCost}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
            <span>Grand Total:</span>
            <span>{detailsData.GrandTotal}</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-gray-600">
            <span className="font-medium text-gray-700">Note:</span> {detailsData.Note}
          </div>

          <p className="text-sm text-gray-500 italic text-right">
            Created: {new Date(detailsData.CreatedDate).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => navigate("/return/list")}
          className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg font-medium transition"
        >
          Back to List
        </button>
      </div>
    );
  }

  // ✅ CREATE UI
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create Return
      </h2>

      {/* Customer */}
      <div className="mb-4">
        <select
          className="w-full px-4 py-2 border rounded-lg"
          value={parent.CustomerId}
          onChange={(e) => handleParentChange("CustomerId", e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>{c.Name}</option>
          ))}
        </select>
      </div>

      {/* Parent Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {["VatTax", "Discount", "OtherCost", "ShippingCost", "GrandTotal"].map((field) => (
          <input
            key={field}
            type="number"
            placeholder={field}
            className="px-4 py-2 border rounded-lg"
            value={parent[field]}
            onChange={(e) => handleParentChange(field, e.target.value)}
          />
        ))}
      </div>

      <textarea
        placeholder="Note"
        className="w-full px-4 py-2 border rounded-lg mb-6"
        value={parent.Note}
        onChange={(e) => handleParentChange("Note", e.target.value)}
      ></textarea>

      {/* Products Section */}
      <h3 className="text-lg font-semibold mb-2">Products</h3>

      {child.map((row, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3 border p-3 rounded-lg">
          <select
            className="border px-2 py-2 rounded"
            value={row.ProductId}
            onChange={(e) => handleChildChange(i, "ProductId", e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>{p.Name}</option>
            ))}
          </select>

          <input type="number" placeholder="Qty" className="border px-2 py-2 rounded"
            value={row.Qty} onChange={(e) => handleChildChange(i, "Qty", e.target.value)} />

          <input type="number" placeholder="Unit Cost" className="border px-2 py-2 rounded"
            value={row.UnitCost} onChange={(e) => handleChildChange(i, "UnitCost", e.target.value)} />

          <input type="number" readOnly className="border px-2 py-2 rounded bg-gray-100" value={row.Total} />

          <button onClick={() => removeRow(i)} className="text-red-600 text-sm">Remove</button>
        </div>
      ))}

      <button onClick={addRow} className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        + Add Product
      </button>

      <button
        onClick={handleSubmit}
        className="w-full py-3 text-white rounded-lg font-medium bg-blue-600 hover:bg-blue-700"
      >
        Create Return
      </button>
    </div>
  );
}

export default ReturnCreateUpdateComponent;
