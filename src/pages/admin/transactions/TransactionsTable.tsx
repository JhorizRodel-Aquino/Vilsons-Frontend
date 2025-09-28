import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function TransactionsTable() {
        type Transaction = { 
        referenceNumber: string; 
        jobNumber: string; 
        senderName: string; 
        datetime: string;
        paymentMode: string;
        amount: number
    };

    const transactionColumns: Column<Transaction>[] = [
        {key: "referenceNumber", label: "Reference Number"},
        {key: "jobNumber", label: "Job Number"},
        {key: "senderName", label: "Sender Name"},
        {key: "datetime", label: "Datetime"},
        {key: "paymentMode", label: "Payment Mode"},
        {key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number)},
    ];

    const transactions: Transaction[] = [
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
        {referenceNumber: '12-435-00233', jobNumber: 'JO-25-233', senderName: 'Kinlie Venice', datetime: 'Jan 4, 2022 11:30 AM', paymentMode: 'BPI', amount: 10000000},
    ];

    return (
        <>
                      <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={transactionColumns} rows={transactions} total={10000000}/>
        </>
    )
}