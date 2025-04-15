import { useEffect, useState } from 'react';
import productsApi from '../../API/products';
import './Products.css'

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
        <div className="products-page">
            <h2 className="page-title">Products</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className="product-row">
                            <td>{product.id}</td>
                            <td>
                                <input
                                    type="text"
                                    value={product.category}
                                    onChange={(e) => {
                                        const updatedProducts = [...products];
                                        updatedProducts[index] = {
                                            ...updatedProducts[index],
                                            category: e.target.value,
                                        };
                                        setProducts(updatedProducts);
                                    }}
                                    className="product-input"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => {
                                        const updatedProducts = [...products];
                                        updatedProducts[index] = {
                                            ...updatedProducts[index],
                                            price: Number(e.target.value),
                                        };
                                        setProducts(updatedProducts);
                                    }}
                                    className="product-input"
                                />
                            </td>
                            <td>
                                <button
                                    className="product-update-btn"
                                    onClick={() =>
                                        productsApi.updateProduct(
                                            { category: product.category, price: product.price },
                                            product.id,
                                            setProducts
                                        )
                                    }
                                >
                                    Update
                                </button>
                                <button
                                    className="product-delete-btn"
                                    onClick={() => productsApi.deleteProduct(product.id, setProducts)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Products