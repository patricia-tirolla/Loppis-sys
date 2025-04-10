import { useState } from "react";
import { useParams } from "react-router";
import sellersApi from "../../API/sellers";

const AddNewProduct = () => {

    const { sellerId } = useParams();
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    return (
        <>
            <h2>Let's add a new product</h2>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    sellersApi.addNewProduct({ category, price }, sellerId);
                    setCategory('');
                    setPrice('');
                }
            }>
                <label>Category
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </label>

                <label>Price
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </label>
                <button>Add</button>
            </form>
        </>

    )
};

export default AddNewProduct