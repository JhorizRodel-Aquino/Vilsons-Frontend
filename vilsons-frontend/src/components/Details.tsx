type DetailsProps = {
    subtitle: string;
    modifiedDate?: string;
}

function Details({ subtitle, modifiedDate }: DetailsProps) {
    return (
        <div className="text-base">
            <h2 className="text-darker font-bold">{subtitle}</h2>
            {modifiedDate && <p className="text-dark font-medium">Last updated: {modifiedDate}</p>}
        </div>
    )
}

export default Details;