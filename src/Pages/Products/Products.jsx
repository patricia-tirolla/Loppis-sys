import { useEffect, useState } from 'react';
import productsApi from '../../API/products';

const Products = ({ inicialProducts }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!inicialProducts) {
            productsApi.getAllProducts(setProducts);
        } else {
            setProducts(inicialProducts);
        }
    }, [inicialProducts])

    return (
        <>
            <h2>These are the products</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={product.id}>
                        {/* <Link to={`/products/${product.id}`}> */}
                        <p>{product.id}</p>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                productsApi.updateProduct({ category: product.category, price: product.price }, product.id, setProducts)
                            }}>
                            
                            <label>
                                <input 
                                type="text" 
                                value={product.category}
                                onChange={(e) => {const updatedProducts = [...products];
                                    updatedProducts[index] = {
                                      ...updatedProducts[index],
                                      category: e.target.value
                                    };
                                    setProducts(updatedProducts);
                                }}
                                />
                            </label>
                            <label>
                                <input 
                                type="text" 
                                value={product.price}
                                onChange={(e) => {const updatedProducts = [...products];
                                    updatedProducts[index] = {
                                      ...updatedProducts[index],
                                      price: Number(e.target.value)
                                    };
                                    setProducts(updatedProducts);
                                }}
                                />
                            </label>
                            <button type="submit">Update</button>
                            </form>
                            {product.category}
                            {product.price}
{/*                             Fix delete button
                            <button>Delete</button> */}
                        {/* </Link> */}
                    </li>
                ))}
            </ul>
        </>

    )
};

export default Products