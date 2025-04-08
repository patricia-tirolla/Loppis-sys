const SellerForm = ({ addNewSeller, updateSeller, deleteSeller, setSeller, seller, setSellerId, sellerId }) => {
    let handleSubmit;

    if (deleteSeller) {
        handleSubmit = deleteSeller;
    } else if (updateSeller) {
        handleSubmit = updateSeller;
    } else {
        handleSubmit = addNewSeller;
    }
    return (

        <form onSubmit={handleSubmit}>
            {(updateSeller || deleteSeller) && (
                <label>Seller Id
                <input
                    type="number"
                    value={sellerId}
                    onChange={(e) => setSellerId(Number(e.target.value))}
                />
            </label>
            )}

            {!deleteSeller && (
                <label>Name
                <input
                    type="text"
                    name="name"
                    value={seller.sellerName}
                    onChange={(e) => setSeller({ ...seller, sellerName: e.target.value })}
                />
            </label>
            )}
            
            {!deleteSeller && (
                <label>Phone
                <input
                    type="tel"
                    name="phone"
                    pattern="[0-9]{10}"
                    value={seller.sellerPhone}
                    onChange={(e) => setSeller({ ...seller, sellerPhone: Number(e.target.value) })}
                />
            </label>
            )}
            
            <button>Add</button>
        </form>
    )
};

export default SellerForm;