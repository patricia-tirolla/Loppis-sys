import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import productsApi from '../../API/products';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productsApi.getAllProducts(setProducts);
    }, [])

    return (
        <>
         <h2>These are the products</h2>
         <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        {product.category}
                    </Link>
                </li>
            ))}
         </ul>
        </>
       
    )
};

export default Products