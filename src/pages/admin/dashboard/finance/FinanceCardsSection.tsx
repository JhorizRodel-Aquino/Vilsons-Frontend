import { useState } from "react";
import MonthYearFilter from "../../../../components/MonthYearFilter";
import { type MonthYearParams } from "../../../../hooks/useGetByMonthYear";
import useMonthYearFilter from "../../../../hooks/useMonthYearFilter";
import CustomerBalanceCard from "./CustomerBalanceCard";
import ExpensesCard from "./ExpensesCard";
import ProfitCard from "./ProfitCard";
import RevenueCard from "./RevenueCard";
import dayjs from "dayjs";

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
                <RevenueCard monthYearParams={monthYearParams} branchParams={branchParams}/>
                <ProfitCard monthYearParams={monthYearParams} branchParams={branchParams}/>
                <ExpensesCard monthYearParams={monthYearParams} branchParams={branchParams}/>
                <CustomerBalanceCard monthYearParams={monthYearParams} branchParams={branchParams}/>
            </div>
        </section>
    )
}