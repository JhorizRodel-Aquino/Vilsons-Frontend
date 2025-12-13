import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import TableFilter from "../../components/TableFilter"
import MonthYearFilter from "../../components/MonthYearFilter";
import RevenueAndProfitTable from "./RevenueAndProfitTable";
import type { RevenueAndProfit } from "./RevenueAndProfitTable";
import Loading from "../../components/Loading";
import useMonthYearFilter from "../../hooks/useMonthYearFilter";
import ErrorModal from "../../components/ErrorModal";
import useGetByMonthYear from "../../hooks/useGetByMonthYear";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";

export default function RevenueAndProfitSection() {
  const branchOptions = [
    { value: '', label: 'All Branches' },
    ...(getBranches() || [])
  ];
  const { data, loading, error, closeError, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/finances', true);
  const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

  if (loading) return <Loading />;

  const financeItems = data.data;
  let revenueAndProfits: RevenueAndProfit[] = []

  if (financeItems) {
    const { grossProfit, totalEquipments, totalExpenses, totalLabor, totalMaterials, totalOperationals, totalOtherIncomes, totalOverheads, totalRevenue, totalTransactions } = financeItems;
    revenueAndProfits = [
      { category: "Revenue", amount: totalRevenue, depth: 0 },
      { category: "Service Revenue", amount: totalTransactions, depth: 1 },
      { category: "Other Income", amount: totalOtherIncomes, depth: 1 },
      { category: "Expenses", amount: totalExpenses, depth: 0 },
      { category: "Operational Expenses", amount: totalOperationals, depth: 1 },
      { category: "Material Expenses", amount: totalMaterials, depth: 2 },
      { category: "Equipment Expenses", amount: totalEquipments, depth: 2 },
      { category: "Labor Expenses", amount: totalLabor, depth: 2 },
      { category: "Overhead Expenses", amount: totalOverheads, depth: 1 },
      { category: "Gross Profit", amount: grossProfit, depth: 0 }
    ]
  }

  return (
    <>
      <SectionHeading>
        <Details subtitle={'All Income Statements'} description={'Detailed Financial Breakdown'} />
      </SectionHeading>

      <TableFilter>
        <Selection
          options={branchOptions}
          value={branchParams}
          onChange={(e) => setBranchParams(e.target.value)}
        />

        <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
      </TableFilter>

      <RevenueAndProfitTable rows={revenueAndProfits} />

      {error && <ErrorModal error={error!} closeError={closeError} />}
    </>
  )
}