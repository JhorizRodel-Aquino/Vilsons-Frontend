import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";
import useGetOtherIncome from "../../../hooks/other-income/useGetOtherIncome";
import { useEffect, useState } from "react";
import MessageModal from "../../../components/MessageModal";
import Loading from "../../../components/Loading";
import formatDate from "../../../utils/formatDate";

export default function OtherIncomeTable() {
    const [showMessageModal, setShowMessageModal] = useState(false)
    const { data, loading, error } = useGetOtherIncome();

    const otherIncomeItems = data.data?.otherIncome || [];
    const total = data.data?.total || 0;

    useEffect(() => {
        if (error) setShowMessageModal(true);
    }, [error]);

    if (loading) return <Loading />;

    type OtherIncome = {
        datetime: string;
        description: string;
        amount: number;
    };

    const otherIncomeColumns: Column<OtherIncome>[] = [
        { key: "datetime", label: "Datetime", render: (isoString) => formatDate(isoString as string)},
        { key: "description", label: "Description" },
        { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },

    ];

    const otherIncomes: OtherIncome[] = otherIncomeItems.map(
        (item: Record<string, any>) => ({
            datetime: item.createdAt,
            description: item.description,
            amount: item.amount
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar />
                {/* <MonthYearFilter /> */}
            </TableFilter>

            <Table columns={otherIncomeColumns} rows={otherIncomes} total={total} />

            {showMessageModal && <MessageModal title='Error' message={error!} setShowModal={setShowMessageModal} />}
        </>
    )
}