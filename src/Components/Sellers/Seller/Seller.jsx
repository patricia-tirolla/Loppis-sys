import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import sellersApi from '../../../API/sellers';
import Products from '../../Products/Products';
import "./Seller.css"

const Seller = () => {
    const { sellerId } = useParams();
    const [seller, setSeller] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const addProductButton = () => {
        navigate(`/sellers/${sellerId}/products/add`);
    }

    useEffect(() => {
        const fetchSeller = async () => {
            const fetchedSeller = await sellersApi.getSpecificSeller(sellerId);
            setSeller(fetchedSeller);
        };

        const fetchProducts = async () => {
            const fetchedProducts = await sellersApi.getAllProductsFromSpecificSeller(sellerId);
            setProducts(fetchedProducts);
        };

        fetchSeller();
        fetchProducts();
    }, [sellerId])

    return seller ? (
        <div className="seller-page-container">
            <div className="seller-info-card">
                <h2 className="seller-title">Seller</h2>
                <h3 className="seller-name">Name: {seller.name}</h3>
                <p className="seller-phone">Phone: {seller.phone}</p>
                <button className="seller-add-product-btn" onClick={addProductButton}>Add Product</button>
            </div>

            <div className="seller-products-section">
                <h2 className="products-title">{seller.name}'s products:</h2>
                <ul className="products-list">
                    <Products inicialProducts={products} />
                </ul>
            </div>

        </div>
    ) : (
        <p>Seller not found</p>
    )
};

export default Seller