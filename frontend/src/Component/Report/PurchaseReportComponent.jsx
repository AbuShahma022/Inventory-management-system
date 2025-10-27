import React, { useState } from "react";
import { PurchaseReport } from "../../APIRequest/ReportAPI";
import { ErrorToast, IsEmpty } from "../../Helper/FormHelper";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import exportFromJSON from "export-from-json";

function PurchaseReportComponent() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearch = async () => {
    if (IsEmpty(fromDate)) return ErrorToast("Select From Date");
    if (IsEmpty(toDate)) return ErrorToast("Select To Date");

    let data = await PurchaseReport(fromDate, toDate);

    if (data && data[0]) {
      setRows(data[0]["Rows"] || []);
      setTotal(data[0]["Total"]?.[0]?.TotalAmount || 0);
    } else {
      setRows([]);
      setTotal(0);
    }
  };

  const handleExport = () => {
    if (rows.length === 0) return ErrorToast("No Data To Export");

    const formattedRows = rows.map((item) => ({
      Product_Name: item?.Products?.Name || "",
      Brand: item?.Brand?.[0]?.Name || "",
      Category: item?.Category?.[0]?.Name || "",
      Qty: item?.Qty,
      Unit_Cost: item?.UnitCost + "$",
      Total_Cost: item?.Total + "$",
      
    }));

    exportFromJSON({
      data: formattedRows,
      fileName: "Purchase_Report",
      exportType: "csv",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Purchase Report</h2>

      {/* Date Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Total */}
      <div className="text-right text-lg font-semibold text-gray-900">
        Total Purchased:{" "}
        <NumericFormat
          value={total}
          displayType="text"
          thousandSeparator={true}
        />
        $
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Brand</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border text-right">Qty</th>
              <th className="p-3 border text-right">Unit Cost ($)</th>
              <th className="p-3 border text-right">Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3 border">
                  {dayjs(item.CreatedDate).format("DD MMM, YYYY")}
                </td>
                <td className="p-3 border">{item?.Products?.Name}</td>
                <td className="p-3 border">{item?.Brand?.[0]?.Name}</td>
                <td className="p-3 border">{item?.Category?.[0]?.Name}</td>

                <td className="p-3 border text-right font-semibold">
                  {item.Qty}
                </td>

                <td className="p-3 border text-right font-semibold">
                  <NumericFormat
                    value={item.UnitCost}
                    displayType="text"
                    thousandSeparator={true}
                  />
                </td>

                <td className="p-3 border text-right font-semibold">
                  <NumericFormat
                    value={item.Total}
                    displayType="text"
                    thousandSeparator={true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="text-right">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleExport}
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default PurchaseReportComponent;
