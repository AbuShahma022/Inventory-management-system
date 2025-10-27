import React, { useEffect, useState } from "react";
import { ExpenseSummary, PurchaseSummary, SalesSummary, ReturnSummary } from "../../APIRequest/SummaryAPI";
import { NumericFormat } from "react-number-format";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DashBoardComponent() {
  const [expense, setExpense] = useState({ total: 0, chart: [] });
  const [purchase, setPurchase] = useState({ total: 0, chart: [] });
  const [sales, setSales] = useState({ total: 0, chart: [] });
  const [returndata, setReturnData] = useState({ total: 0, chart: [] });

  useEffect(() => {
    loadData();
  }, []);

  const calculateSummary = (data) => ({
    total: data?.Total?.[0]?.TotalAmount || 0,
    chart: data?.Last30Days || [],
  });

  const loadData = async () => {
    setExpense(calculateSummary(await ExpenseSummary()));
    setPurchase(calculateSummary(await PurchaseSummary()));
    setSales(calculateSummary(await SalesSummary()));
    setReturnData(calculateSummary(await ReturnSummary()));
  };

  return (
    <div className="p-6 space-y-8">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Expense" value={expense.total } color="text-pink-600" />
        <SummaryCard title="Sales" value={sales.total} color="text-indigo-600" />
        <SummaryCard title="Purchase" value={purchase.total} color="text-emerald-600" />
        <SummaryCard title="Return" value={returndata.total} color="text-rose-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <ChartCard title="Expense Last 30 Days">
          <AreaChartComp data={expense.chart} stroke="#CB0C9F" fill="#CB0C9F" />
        </ChartCard>

        <ChartCard title="Sales Last 30 Days">
          <AreaChartComp data={sales.chart} stroke="#6366F1" fill="#6366F1" />
        </ChartCard>

        <ChartCard title="Purchase Last 30 Days">
          <AreaChartComp data={purchase.chart} stroke="#00A884" fill="#00A884" />
        </ChartCard>

        <ChartCard title="Return Last 30 Days">
          <AreaChartComp data={returndata.chart} stroke="#E11D48" fill="#E11D48" />
        </ChartCard>

      </div>
    </div>
  );
}

export default DashBoardComponent;


// ---- Summary Card ----
const SummaryCard = ({ title, value, color }) => (
  <div className="bg-white p-5 rounded-md shadow-md border">
    <div className={`text-2xl font-bold ${color}`}>
      <NumericFormat value={value} displayType="text" thousandSeparator prefix="$"  />
    </div>
    <div className="text-gray-600 mt-1 text-sm">{title}</div>
  </div>
);

// ---- Chart Wrapper ----
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-5 rounded-md shadow-md border">
    <h2 className="text-lg font-medium mb-3">{title}</h2>
    {children}
  </div>
);

// ---- Recharts Area Component ----
const AreaChartComp = ({ data, stroke, fill }) => (
  <ResponsiveContainer width="100%" height={230}>
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="TotalAmount" stroke={stroke} fill={fill} />
    </AreaChart>
  </ResponsiveContainer>
);
