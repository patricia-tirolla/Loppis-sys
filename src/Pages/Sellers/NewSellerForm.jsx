const NewSellerForm = ({ addNewSeller, setSeller, seller }) => {
    return (

        <form onSubmit={addNewSeller}>
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
            <button>Add</button>
        </form>
    )
};

export default NewSellerForm;