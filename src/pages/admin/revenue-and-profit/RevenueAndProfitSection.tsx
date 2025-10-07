import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import TableFilter from "../../../components/TableFilter"
import MonthYearFilter from "../../../components/MonthYearFilter";
import RevenueAndProfitTable from "./RevenueAndProfitTable";
import type { RevenueAndProfit } from "./RevenueAndProfitTable";
import useGetFinances from "../../../hooks/finances/useGetFinances";
import { useEffect, useState } from "react";
import MessageModal from "../../../components/MessageModal";
import Loading from "../../../components/Loading";
import dayjs from "dayjs";

export default function RevenueAndProfitSection() {
  const options = ['Monthly', 'Yearly']
  const [option, setOption] = useState(options[0]);
  const today = dayjs();
  const monthToday = today.format('MM');
  const yearToday = today.format('YYYY');
  const [monthYear, setMonthYear] = useState(`${yearToday}-${monthToday}`)
  const [year, setYear] = useState(`${yearToday}`)

  const [showMessageModal, setShowMessageModal] = useState(false)
  const { data, loading, error, setMonthYearParams } = useGetFinances();


  const financeItems = data.data;
  let revenueAndProfits: RevenueAndProfit[] = []

  if (financeItems) {
    const { grossProfit, totalEquipmments, totalExpenses, totalLabor, totalMaterials, totalOperationals, totalOtherIncomes, totalOverheads, totalRevenue, totalTransactions } = financeItems;
    revenueAndProfits = [
      { category: "Revenue", amount: totalRevenue, depth: 0 },
      { category: "Service Revenue", amount: totalTransactions, depth: 1 },
      { category: "Other Income", amount: totalOtherIncomes, depth: 1 },
      { category: "Expenses", amount: totalExpenses, depth: 0 },
      { category: "Operational Expenses", amount: totalOperationals, depth: 1 },
      { category: "Material Expenses", amount: totalMaterials, depth: 2 },
      { category: "Equipment Expenses", amount: totalEquipmments, depth: 2 },
      { category: "Labor Expenses", amount: totalLabor, depth: 2 },
      { category: "Overhead Expenses", amount: totalOverheads, depth: 1 },
      { category: "Gross Profit", amount: grossProfit, depth: 0 }
    ]
  }

  useEffect(() => {
    if (error) setShowMessageModal(true);
  }, [error]);

  useEffect(() => {
    if (option === 'Monthly') {
      setMonthYearParams({
        year: Number(monthYear.split('-')[0]),
        month: Number(monthYear.split('-')[1]),
      });
    } else {
      setMonthYearParams({ year: Number(year) });
    }
  }, [option, monthYear, year, setMonthYearParams]);

  if (loading) return <Loading />;

  return (
    <>
      <SectionHeading>
        <Details subtitle={'All Income Statements'} description={'Detailed Financial Breakdown'} />
      </SectionHeading>

      <TableFilter>
        <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
      </TableFilter>

      <RevenueAndProfitTable rows={revenueAndProfits} />

      {showMessageModal && <MessageModal title='Error' message={error!} setShowModal={setShowMessageModal} />}
    </>
  )
}