import { useEffect, useState } from 'react';
import Popup from "reactjs-popup";
import NewSellerForm from './NewSellerForm';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const [seller, setSeller] = useState({ sellerName: '', sellerPhone: '' });
    const [sellerId, setSellerId] = useState('');

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

    const updateSeller = async () => {
        const { sellerName, sellerPhone } = seller;

        try {
            const response = await fetch(`http://localhost:3001/sellers/${sellerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: sellerName, phone: sellerPhone })
            });
            if (response.ok) {
                setSellers((sellers) =>
                    sellers.map((seller) =>
                        seller.id === sellerId
                            ? { ...seller, name: sellerName, phone: sellerPhone }
                            : seller
                    )
                );
            } else {
                const err = await response.json();
                console.error("failed to fetch seller: ", err.message);
            }
        } catch (err) {
            console.error("Couldn't fetch: ", err);
        }
    }

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
                        setSeller({ sellerName: '', sellerPhone: '' });
                        close();

                    }} />
                )}
            </Popup>
            <Popup trigger={
                <button >Update Seller</button>
            } modal nested>
                {close => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateSeller();
                            setSeller({ sellerName: '', sellerPhone: '' });
                            close();
                        }}
                    >
                        <label htmlFor="">Seller Id
                            <input
                                type="number"
                                value={sellerId}
                                onChange={(e) => setSellerId(Number(e.target.value))}
                            />
                        </label>

                        <label>
                            New Name:
                            <input
                                type="text"
                                value={seller.sellerName}
                                onChange={(e) =>
                                    setSeller((prev) => ({ ...prev, sellerName: e.target.value }))
                                }
                            />
                        </label>

                        <label>
                            New Phone:
                            <input
                                type="text"
                                value={seller.sellerPhone}
                                pattern="[0-9]{10}"
                                onChange={(e) =>
                                    setSeller((prev) => ({ ...prev, sellerPhone: e.target.value }))
                                }
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>

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