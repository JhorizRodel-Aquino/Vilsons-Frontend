import { useState } from "react";
import MonthYearFilter from "../../../components/MonthYearFilter";
import { type MonthYearParams } from "../../../hooks/useGetByMonthYear";
import useMonthYearFilter from "../../../hooks/useMonthYearFilter";
import CustomerBalanceCard from "./CustomerBalanceCard";
import ExpensesCard from "./ExpensesCard";
import ProfitCard from "./ProfitCard";
import RevenueCard from "./RevenueCard";
import dayjs from "dayjs";
import { hasPermissions } from "../../../services/permissionService";
import ContractorOwnBalanceCard from "./ContractorOwnBalanceCard";
import CustomerOwnBalanceCard from "./CustomerOwnBalanceCard";

export default function FinanceCardsSection({ branchParams }: { branchParams: string }) {
    const monthYearToday: MonthYearParams = { year: +dayjs().format("YYYY"), month: +dayjs().format("MM") }
    const [monthYearParams, setMonthYearParams] = useState<MonthYearParams>(monthYearToday);
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    return (
        <section className='grid gap-5'>
            <div className='flex items-center gap-5'>
                <h2 className='text-base font-medium text-darker'>Monthly Financial Overview</h2>
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </div>
            <div className='grid gap-[10px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
                {hasPermissions(["view_admin_dashboard_revenue"]) && <RevenueCard monthYearParams={monthYearParams} branchParams={branchParams}/>}
                {hasPermissions(["view_admin_dashboard_profit"]) && <ProfitCard monthYearParams={monthYearParams} branchParams={branchParams}/>}
                {hasPermissions(["view_admin_dashboard_expenses"]) && <ExpensesCard monthYearParams={monthYearParams} branchParams={branchParams}/>}
                {hasPermissions(["view_admin_dashboard_customer_balance"]) && <CustomerBalanceCard monthYearParams={monthYearParams} branchParams={branchParams}/>}
                {hasPermissions(["view_contractor_dashboard_balance"]) && <ContractorOwnBalanceCard monthYearParams={monthYearParams} branchParams={branchParams}/>}
                {hasPermissions(["view_customer_dashboard_balance"]) && <CustomerOwnBalanceCard monthYearParams={monthYearParams} branchParams={branchParams}/>}
            </div>
        </section>
    )
}