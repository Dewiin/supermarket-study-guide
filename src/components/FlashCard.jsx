
export function FlashCard( {productCode, value} ) {

    function handleClick(e) {
        e.currentTarget.classList.toggle("active");
    }

    return (
        <div onClick={e => handleClick(e)} className="flash-card">
            <div className="card-front">
                <p className="card-text">{productCode}</p>
            </div>
            <div className="card-back">
                <p className="card-text">{value}</p>
            </div> 
        </div>
    )
}