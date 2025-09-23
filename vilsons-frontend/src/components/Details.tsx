type DetailsProps = {
    subtitle: string;
    modifiedDate?: string;
    description?: string;
}

function Details({ subtitle, modifiedDate, description }: DetailsProps) {
    return (
        <div className="text-base">
            <h2 className="text-darker font-bold">{subtitle}</h2>
            <p className="text-dark font-medium">
                {modifiedDate && `Last updated: ${modifiedDate}`}
                {description && `${description}`}
            </p>
        </div>
    )
}

export default Details;