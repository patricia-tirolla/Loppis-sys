import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import productsApi from "../../API/products";

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

    return product ? (
        <>
            <h2>This is the product with id: {productId}</h2>
            <h3>{product.category}</h3>
            <p>{product.price}</p>
        </>
    ) : (
        <p>Product not found</p>
    )
};

export default Product