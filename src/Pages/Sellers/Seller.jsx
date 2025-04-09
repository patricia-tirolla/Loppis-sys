import { useParams } from "react-router";
import { useEffect, useState } from "react";
import sellersApi from "../../API/sellers";

const Seller = () => {
    const { sellerId } = useParams();
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        const fetchSeller = async () => {
            const fetchedSeller = await sellersApi.getSpecificSeller(sellerId);
            setSeller(fetchedSeller);
        };
        fetchSeller()
    }, [sellerId])

    return seller ? (
        <>
            <h2>This is the seller</h2>
            <h3>{seller.name}</h3>
            <p>{seller.phone}</p>
        </>
    ) : (
        <p>Seller not found</p>
    )
};

export default Seller