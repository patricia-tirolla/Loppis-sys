import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Seller from "./Seller"
import sellersApi from '../../API/sellers';
import SellerActionPopup from './SellerActionPopup';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const [seller, setSeller] = useState({ sellerName: '', sellerPhone: '' });
    const [sellerId, setSellerId] = useState('');

    useEffect(() => {
        sellersApi.getAllSellers(setSellers);
    }, []);

    return (
        <>
            <h2>These are the sellers</h2>
            <SellerActionPopup 
                mode="add"
                triggerText="Add Seller"
                seller={seller}
                setSeller={setSeller}
                onSubmit={() => sellersApi.addSeller(seller, setSellers)}
            />

            <SellerActionPopup
                mode="update"
                triggerText="Update Seller"
                seller={seller}
                setSeller={setSeller}
                sellerId={sellerId}
                setSellerId={setSellerId}
                onSubmit={() => sellersApi.updateSeller(seller, sellerId, setSellers)}
            />

            <SellerActionPopup
                mode="delete"
                triggerText="Delete Seller"
                sellerId={sellerId}
                setSellerId={setSellerId}
                onSubmit={() => sellersApi.deleteSeller(sellerId, setSellers)}
            />
            <ul>
                {sellers.map((seller) => (
                    <li key={seller.id}>
                        <Link to={`/sellers/${seller.id}`}>
                            {seller.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default Sellers