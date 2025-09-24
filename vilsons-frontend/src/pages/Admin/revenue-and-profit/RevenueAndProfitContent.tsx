import Info from "../../../components/Info"
import Details from "../../../components/Details"
import TableFilter from "../../../components/TableFilter"
import MonthYearFilter from "../../../components/MonthYearFilter";
import RevenueAndProfitTable from "./RevenueAndProfitTable";
import type { RevenueAndProfit } from "./RevenueAndProfitTable";

export default function RevenueAndProfitContent() {
  const revenueAndProfits: RevenueAndProfit[] = [
    {category: "Revenue", amount: 10000000, depth: 0},
    {category: "Service Revenue", amount: 10000000, depth: 1},
    {category: "Other Income", amount: 10000000, depth: 1},
    {category: "Expenses", amount: 10000000, depth: 0},
    {category: "Operational Expenses", amount: 10000000, depth: 1},
    {category: "Material Expenses", amount: 10000000, depth: 2},
    {category: "Equipment Expenses", amount: 10000000, depth: 2},
    {category: "Labor Expenses", amount: 10000000, depth: 2},
    {category: "Overhead Expenses", amount: 10000000, depth: 1},
    {category: "Gross Profit", amount: 10000000, depth: 0}
  ]

  return (
    <>
      <Info>
        <Details subtitle={'All Income Statements'} description={'Detailed Financial Breakdown'} />
      </Info>

      <TableFilter>
        <MonthYearFilter />
      </TableFilter>

      <RevenueAndProfitTable rows={revenueAndProfits} />
    </>
  )
}