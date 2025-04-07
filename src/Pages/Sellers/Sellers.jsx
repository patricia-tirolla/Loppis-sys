import { useEffect, useState } from 'react';
import Popup from "reactjs-popup";
import NewSellerForm from './NewSellerForm';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const [seller, setSeller] = useState({ sellerName: '', sellerPhone: '' });

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await fetch('http://localhost:3001/sellers');
                if (response.ok) {
                    const json = await response.json();
                    setSellers(json);
                } else {
                    console.error("failed to fetch sellers", response.status);
                }
            } catch (err) {
                console.error("Couldn't fetch: ", err);
            }
        };

        fetchSellers();
    }, []);

    const registerSeller = async () => {
        const { sellerName, sellerPhone } = seller;

        try {
            const response = await fetch('http://localhost:3001/sellers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sellerName, sellerPhone })
            });
            if (response.ok) {
                const json = await response.json();
                setSellers((prev) => [...prev, { id: json.id, name: sellerName, phone: sellerPhone }]);
            } else {
                const err = await response.json();
                console.error("failed to fetch seller: ", err.message);
            }
        } catch (err) {
            console.error("Couldn't fetch: ", err);
        }
    };

    return (
        <>
            <h2>These are the sellers</h2>
            <Popup trigger={
                <button >Register Seller</button>
            } modal nested>
                {close => (
                    <NewSellerForm seller={seller} setSeller={setSeller} addNewSeller={(e) => {
                        e.preventDefault();
                        registerSeller();
                        close();

                    }} />
                )}
            </Popup>
            <ul>
                {sellers.map((seller) => (
                    <li key={seller.id}>
                        {seller.name}
                    </li>
                ))}
            </ul>
        </>
    )
};

export default Sellers