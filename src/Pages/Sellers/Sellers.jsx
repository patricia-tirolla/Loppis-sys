import { useEffect, useState } from 'react';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);

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

    return (
        <>
            <h2>These are the sellers</h2>
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