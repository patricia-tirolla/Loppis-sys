import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import sellersApi from "../../API/sellers";

const AddNewProduct = () => {

    const { sellerId } = useParams();
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    return (
        <>
            <h2>Let's add a new product</h2>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    sellersApi.addNewProduct({ category, price }, sellerId);
                    setCategory('');
                    setPrice('');
                    navigate(-1);
                }
            }>
                <label htmlFor="category">Category
                    <input 
                    id="category" 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}/>
                </label>

                <label htmlFor="price">Price
                    <input id="price" 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}/>
                </label>
                <button>Add</button>
            </form>
        </>

    )
};

export default AddNewProduct