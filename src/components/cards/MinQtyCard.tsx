interface ProductProps {
    name: string,
    description: string,
    image: string,
}

function MinQtyCard(props: ProductProps) {
    const truncateText = (text:string, maxLength:number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="card" style={{ width: "100%", marginBottom: "10px" }}>
            <img src={props.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text"> {truncateText(props.description, 60)}</p>
            </div>
        </div>
    )
}

export default MinQtyCard;