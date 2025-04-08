const SellerForm = ({
    onSubmit,
    mode,
    seller =  { sellerName: '', sellerPhone: '' },
    setSeller,
    sellerId,
    setSellerId
}) => {
    let buttonText;
    if (mode === 'add') {
        buttonText = "Add Seller";
    } else if (mode === 'update') {
        buttonText = "Update Seller";
    } else if (mode === 'delete') {
        buttonText = "Delete Seller";
    }

    return (

        <form onSubmit={onSubmit}>
            {(mode === 'update' || mode === 'delete') && (
                <label>Seller Id
                    <input
                        type="number"
                        value={sellerId}
                        onChange={(e) => setSellerId(Number(e.target.value))}
                    />
                </label>
            )}

            {mode !== 'delete' && (
                <>
                    <label>Name
                        <input
                            type="text"
                            name="name"
                            value={seller.sellerName}
                            onChange={(e) => setSeller({ ...seller, sellerName: e.target.value })}
                        />
                    </label>
                    <label>Phone
                        <input
                            type="tel"
                            name="phone"
                            pattern="[0-9]{10}"
                            value={seller.sellerPhone}
                            onChange={(e) => setSeller({ ...seller, sellerPhone: Number(e.target.value) })}
                        />
                    </label>
                </>
            )}

            <button type="submit">{buttonText}</button>
        </form>
    )
};

export default SellerForm;