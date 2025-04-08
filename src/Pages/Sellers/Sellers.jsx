import { useEffect, useState } from 'react';
import Popup from "reactjs-popup";
import SellerForm from './SellerForm';
import sellersApi from '../../API/sellers';

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
            <Popup trigger={
                <button >Register Seller</button>
            } modal nested>
                {close => (
                    <SellerForm 
                    seller={seller} 
                    setSeller={setSeller} 

                    addNewSeller={(e) => {
                        e.preventDefault();
                        sellersApi.addSeller(seller, setSellers)
                        setSeller({ sellerName: '', sellerPhone: '' });
                        close();
                    }} />
                )}
            </Popup>
            <Popup trigger={
                <button >Update Seller</button>
            } modal nested>
                {close => (
                    <SellerForm
                        seller={seller} 
                        setSeller={setSeller}
                        sellerId={sellerId} 
                        setSellerId={setSellerId}

                        updateSeller={(e) => {
                            e.preventDefault();
                            sellersApi.updateSeller(seller, sellerId, setSellers);
                            setSeller({ sellerName: '', sellerPhone: '' });
                            setSellerId({id: ''});
                            close();
                        }} />
                )}
            </Popup>
            <Popup trigger={
                <button >Delete Seller</button>
            } modal nested>
                {close => (
                    <SellerForm
                        sellerId={sellerId} 
                        
                        deleteSeller={(e) => {
                            e.preventDefault();
                            sellersApi.deleteSeller(sellerId, setSellers);
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