import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import Button from "../../../components/Button";
import StatusSelection from "../../../components/StatusSelection";
import SearchBar from "../../../components/SearchBar";
import DateRange from '../../../components/DateRange'

function JobOrdersPage() {
    type User = { id: number; name: string; email: string };

    const userColumns: Column<User>[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
    ];

    const users: User[] = [
        { id: 1, name: "Alice", email: "alice@mail.com" },
        { id: 2, name: "Bob", email: "bob@mail.com" },
    ];


    return (

        <div className='flex h-dvh w-dvw'>
            {/* Left Side */}
            <Sidebar />


            {/* Right Side */}
            <div className='bg-light-gray flex-1 flex flex-col'>
                <Header />

                <main className='flex-1 h-full overflow-y-auto'>
                    <div className='contain'>
                        <h1 className='mb-[34px]'>Dashboard</h1>

                        <div className="grid gap-5">
                            <div className="grid grid-flow-col justify-between items-center">
                                <div className="text-base">
                                    <h2 className="text-darker font-bold">All Job Orders</h2>
                                    <p className="text-dark font-medium">Last updated: August 9, 2025</p>
                                </div>

                                <Button label={'Create Job Order'} onClick={() => console.log('clicked')} variant="primary" />
                            </div>

                            <div className="grid grid-flow-col justify-between items-stretch">
                                <SearchBar />
                                <StatusSelection />
                                <DateRange />
                            </div>
                            
                            <Table columns={userColumns} rows={users} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default JobOrdersPage;