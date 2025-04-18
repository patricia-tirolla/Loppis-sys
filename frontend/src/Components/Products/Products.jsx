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

    const handleChange = (e, index, field) => {
        const updatedProducts = [...products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [field]: field === 'price' ? Number(e.target.value) : e.target.value,
        };
        setProducts(updatedProducts);
    };

    const handleSubmit = (e, productId) => {
        e.preventDefault();

        const product = products.find((product) => product.id === productId);
        if (product) {
            productsApi.updateProduct(
                { category: product.category, price: product.price },
                productId,
                setProducts
            );
        }
    };

    const handleDelete = (productId) => {
        productsApi.deleteProduct(productId, setProducts, products);
    };

    return (
        <div className="products-page">
            <h2 className="page-title">Products</h2>
            <table className="product-table">
            <caption className="table-caption">List of products</caption>
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className="product-row">
                            <td>{product.id}</td>
                            <td>
                                <form onSubmit={(e) => handleSubmit(e, product.id)}>
                                    <input
                                        type="text"
                                        value={product.category}
                                        onChange={(e) => handleChange(e, index, 'category')}
                                        onBlur={(e) => handleSubmit(e, product.id)}
                                        className="product-input"
                                        aria-label="product-id"
                                    />
                                </form>
                            </td>
                            <td>
                                <form onSubmit={(e) => handleSubmit(e, product.id)}>
                                    <input
                                        type="number"
                                        value={product.price}
                                        onChange={(e) => handleChange(e, index, 'price')}
                                        onBlur={(e) => handleSubmit(e, product.id)}
                                        className="product-input"
                                        aria-label="product-price"
                                    />
                                </form>
                            </td>
                            <td>
                                <button
                                    className="product-delete-btn"
                                    onClick={() => handleDelete(product.id)}
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