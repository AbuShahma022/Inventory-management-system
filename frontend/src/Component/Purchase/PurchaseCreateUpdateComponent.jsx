import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PurchaseCreate, PurchaseDetailsById } from "../../APIRequest/PurchaseAPI";
import { ProductDropDownList } from "../../APIRequest/ProductAPI";
import { SupplyDropDownList } from "../../APIRequest/SupplyAPI";
import { ErrorToast, IsEmpty } from "../../Helper/FormHelper";

function PurchaseCreateUpdateComponent() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [detailsData, setDetailsData] = useState(null);

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [parent, setParent] = useState({
    SupplierId: "",
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

  // Load dropdowns
  useEffect(() => {
    (async () => {
      setSuppliers(await SupplyDropDownList() || []);
      setProducts(await ProductDropDownList() || []);
    })();
  }, []);

  // If param id exists → Fetch details
  useEffect(() => {
  if (id) {
    (async () => {
      const res = await PurchaseDetailsById(id);
      if (res) {
        setDetailsData(res);
      }
    })();
  }
}, [id]);
  const handleParentChange = (name, value) => {
    setParent((prev) => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (index, name, value) => {
    const updated = [...child];
    updated[index][name] = value;

    if (name === "Qty" || name === "UnitCost") {
      const qty = parseFloat(updated[index].Qty) || 0;
      const cost = parseFloat(updated[index].UnitCost) || 0;
      updated[index].Total = qty * cost;
    }

    setChild(updated);
  };

  const addRow = () => {
    setChild([...child, { ProductId: "", Qty: "", UnitCost: "", Total: "" }]);
  };

  const removeRow = (idx) => {
    if (child.length === 1) return;
    setChild(child.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (IsEmpty(parent.SupplierId)) return ErrorToast("Supplier Required");
    if (child.some((i) => IsEmpty(i.ProductId))) return ErrorToast("Product Required");

    const postBody = { Parent: parent, Child: child };
    const result = await PurchaseCreate(postBody);

    if (result === true) {
      

      // RESET FORM
      setParent({
        SupplierId: "",
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

  // ✅ IF DETAILS MODE
if (id && detailsData) {
  const supplierName = suppliers.find(s => s._id === detailsData.SupplierId)?.Name || "Unknown Supplier";

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Purchase Details
      </h2>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Supplier:</span>
          <span>{supplierName}</span>
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
        onClick={() => navigate("/purchase/list")}
        className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg font-medium transition"
      >
        Back to List
      </button>
    </div>
  );
}

  // ✅ OTHERWISE → SHOW CREATE FORM (unchanged)
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create Purchase
      </h2>

      {/* Supplier */}
      <div className="mb-4">
        <select
          className="w-full px-4 py-2 border rounded-lg"
          value={parent.SupplierId}
          onChange={(e) => handleParentChange("SupplierId", e.target.value)}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s._id} value={s._id}>{s.Name}</option>
          ))}
        </select>
      </div>

      {/* Parent Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {["VatTax", "Discount", "OtherCost", "ShippingCost", "GrandTotal"].map((field) => (
          <input
            key={field}
            type="number"
            placeholder={field}
            value={parent[field]}
            onChange={(e) => handleParentChange(field, e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
        ))}
      </div>

      <textarea
        placeholder="Note"
        value={parent.Note}
        onChange={(e) => handleParentChange("Note", e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-6"
      ></textarea>

      {/* Products */}
      <h3 className="text-lg font-semibold mb-2">Products</h3>

      {child.map((row, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3 border p-3 rounded-lg">
          <select
            value={row.ProductId}
            onChange={(e) => handleChildChange(i, "ProductId", e.target.value)}
            className="border px-2 py-2 rounded"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>{p.Name}</option>
            ))}
          </select>

          <input type="number" placeholder="Qty" value={row.Qty} onChange={(e)=>handleChildChange(i,"Qty",e.target.value)} className="border px-2 py-2 rounded"/>
          <input type="number" placeholder="Unit Cost" value={row.UnitCost} onChange={(e)=>handleChildChange(i,"UnitCost",e.target.value)} className="border px-2 py-2 rounded"/>
          <input type="number" readOnly value={row.Total} className="border px-2 py-2 rounded bg-gray-100"/>

          <button onClick={() => removeRow(i)} className="text-red-600 text-sm">
            Remove
          </button>
        </div>
      ))}

      <button onClick={addRow} className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        + Add Product
      </button>

      <button
        onClick={handleSubmit}
        className="w-full py-3 text-white rounded-lg font-medium bg-blue-600 hover:bg-blue-700"
      >
        Create Purchase
      </button>
    </div>
  );
}

export default PurchaseCreateUpdateComponent;
