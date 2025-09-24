import type { Column } from "../../../components/table/Table";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function TransactionContent() {
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
            <Info>
                <Details subtitle={'All Transactions'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Transaction'} onClick={() => console.log('clicked')} variant="primary" />
            </Info>

            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={transactionColumns} rows={transactions} total={10000000}/>
        </>
    )
}