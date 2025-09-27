import Detail from "../../../../components/Detail"
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";



export default function CustomerDetailsContent() {
    return (
        <>


            <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                <section className="card w-full">
                    <h2 className="font-bold text-primary mb-5">Vehicle Information</h2>
                    <div className="flex flex-wrap gap-x-30 gap-y-5">
                        <Detail label='Plate Number' value={'ZTT 795'} />
                        <Detail label='Make' value={'Volvo'} />
                        <Detail label='Model' value={'VNL 760'} />
                    </div>
                </section>
                <section className="card w-full">
                    <h2 className="font-bold text-primary mb-5">Assigned Contractor</h2>
                    <div className="flex flex-wrap gap-x-30 gap-y-5">
                        <Detail label='Contractor Name' value={'Jhoriz Rodel'} />
                    </div>
                </section>
            </div>

            <section className="card w-full">
                <h2 className="font-bold text-primary mb-5">Customer Information</h2>
                <div className="flex flex-wrap gap-x-30 gap-y-5">
                    <Detail label='Customer Name' value={'Kinlie Trucking'} />
                    <Detail label='Contact Number' value={'09123456789'} />
                    <Detail label='Email Address' value={'contact@venicetransport.com'} />
                </div>
            </section>

            <section className="card w-full">
                <h2 className="font-bold text-primary mb-5">Job Description</h2>
                <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
                    <p>Engine overhaul and transmission service. Vehicle experiencing power loss and rough shifting. Requires complete engine inspection and transmission rebuild.</p>
                </div>
            </section>


            <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                <section className="card w-full">
                    <h2 className="font-bold text-primary mb-5">Materials</h2>
                    <div className="grid gap-5">
                        <div className="flex justify-between">
                            <Detail label='Contractor Name' value={`${8} × ${formatPesoFromCents(45000)}`} />
                            <span>{formatPesoFromCents(360000)}</span>
                        </div>
                        <div className="flex justify-between">
                            <Detail label='Contractor Name' value={`${8} × ${formatPesoFromCents(45000)}`} />
                            <span>{formatPesoFromCents(360000)}</span>
                        </div>
                        <div className="flex justify-between">
                            <Detail label='Contractor Name' value={`${8} × ${formatPesoFromCents(45000)}`} />
                            <span>{formatPesoFromCents(360000)}</span>
                        </div>
                        <Detail label='Total' value={formatPesoFromCents(360000)} variant="adjacent" align="between" highlight={true} className="font-bold" />
                    </div>
                </section>
                <div className="grid gap-[20px] content-start">
                    <section className="card w-full">
                        <h2 className="font-bold text-primary mb-5">Labor</h2>
                        <div className="grid gap-5">
                            <Detail label='Contractor Commission' value={formatPesoFromCents(360000)} variant="adjacent" align="between" />
                            <Detail label='Contractor Commission' value={formatPesoFromCents(360000)} variant="adjacent" align="between" />
                            <Detail label='Total' value={formatPesoFromCents(360000)} variant="adjacent" align="between" highlight={true} className="font-bold" />
                        </div>
                    </section>
                    <section className="card w-full grid items-center">
                        <Detail label='Total Bill' value={formatPesoFromCents(360000)} variant="adjacent" align="between" highlight={true} className="font-bold" />
                    </section>
                </div>
            </div>












        </>


    )
}