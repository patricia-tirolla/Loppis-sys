import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import sellersApi from "../../../../API/sellers";
import "./AddNewProduct.css"

const AddNewProduct = () => {

    const { sellerId } = useParams();
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    return (
        <div className="add-product-page">
            <h2 className="add-product-title">Let's add a new product</h2>

            <form 
            className="add-product-form"
            onSubmit={
                (e) => {
                    e.preventDefault();
                    sellersApi.addNewProduct({ category, price }, sellerId);
                    setCategory('');
                    setPrice('');
                    navigate(-1);
                }
            }>
                <label htmlFor="category" className="form-label">Category
                    <input 
                    id="category" 
                    type="text" 
                    className="form-input"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}/>
                </label>

                <label htmlFor="price" className="form-label">Price
                    <input id="price" 
                    type="number" 
                    className="form-input"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}/>
                </label>
                <button type="submit" className="submit-btn">Add</button>
            </form>
        </div>

    )
};

export default AddNewProduct