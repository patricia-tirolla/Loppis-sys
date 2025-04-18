import { useParams } from "react-router";
import { useEffect, useState } from "react";
import productsApi from "../../../API/products";

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await productsApi.getSpecificProduct(productId);
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, [productId])

    return (
        <div className="product-page">
            {product ? (
                <>
                    <h2 className="product-title">This is the product with id: {productId}</h2>
                    <h3 className="product-category">{product.category}</h3>
                    <p className="product-price">{product.price}:-</p>
                </>
            ) : (
                <p className="product-not-found">Product not found</p>
            )}
        </div>
    )
};

export default Product