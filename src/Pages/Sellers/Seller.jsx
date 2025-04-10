import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import sellersApi from '../../API/sellers';
import Products from '../Products/Products';

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
        <>
            <h2>This is the seller</h2>
            <h3>{seller.name}</h3>
            <p>{seller.phone}</p>
            <button onClick={addProductButton}>Add Product</button>

            <h2>These are all this seller's products</h2>
            <ul>
                <Products inicialProducts={products}/>
            </ul>
        </>
    ) : (
        <p>Seller not found</p>
    )
};

export default Seller