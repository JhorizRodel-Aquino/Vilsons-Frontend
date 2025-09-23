import type { Column } from "../../../components/table/Table";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function RevenueAndProfitContent() {
    return (
        <>
            <Info>
                <Details subtitle={'All Overhead Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Bill'} onClick={() => console.log('clicked')} variant="primary" />
            </Info>

            <TableFilter>
                <MonthYearFilter />
            </TableFilter>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Revenue */}
                <tr className="font-bold bg-gray-100">
                  <td className="p-2">Revenue Total</td>
                  <td className="p-2 text-right">₱500,000</td>
                </tr>
                <tr>
                  <td className="p-2 pl-6">- Service Revenue</td>
                  <td className="p-2 text-right">₱400,000</td>
                </tr>
                <tr>
                  <td className="p-2 pl-6">- Other Income</td>
                  <td className="p-2 text-right">₱100,000</td>
                </tr>

                {/* Expenses */}
                <tr className="font-bold bg-gray-100">
                  <td className="p-2">Expenses Total</td>
                  <td className="p-2 text-right">₱300,000</td>
                </tr>
                <tr>
                  <td className="p-2 pl-6">- Operational</td>
                  <td className="p-2 text-right">₱250,000</td>
                </tr>
                <tr>
                  <td className="p-2 pl-10">-- Material</td>
                  <td className="p-2 text-right">₱100,000</td>
                </tr>
                <tr>
                  <td className="p-2 pl-10">-- Equipment</td>
                  <td className="p-2 text-right">₱80,000</td>
                </tr>
                <tr>
                  <td className="p-2 pl-10">-- Labor</td>
                  <td className="p-2 text-right">₱70,000</td>
                </tr>
                <tr>
                  <td className="p-2 pl-6">- Overhead</td>
                  <td className="p-2 text-right">₱50,000</td>
                </tr>

                {/* Gross Profit */}
                <tr className="font-bold bg-green-100 border-t">
                  <td className="p-2">Gross Profit</td>
                  <td className="p-2 text-right">₱200,000</td>
                </tr>
              </tbody>
            </table>
        </> 
    )
}