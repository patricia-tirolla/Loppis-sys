import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sellersApi from '../../API/sellers';
import SellerActionPopup from './SellerActionPopup/SellerActionPopup';
import './Sellers.css';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const [seller, setSeller] = useState({ sellerName: '', sellerPhone: '' });
    const [sellerId, setSellerId] = useState('');

    useEffect(() => {
        sellersApi.getAllSellers(setSellers);
    }, []);

    return (
        <div className="page">
            <h2 className="page-title">Sellers</h2>

            <div className="action-buttons">
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
            </div>
            <table className="seller-table">
                <thead>
                    <tr>
                        <th>Seller ID</th>
                        <th>Seller Name</th>
                        <th>Seller Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller.id} className="seller-row">
                            <td>
                                <Link to={`/sellers/${seller.id}`} className="seller-link">
                                    {seller.id}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/sellers/${seller.id}`} className="seller-link">
                                    {seller.name}
                                </Link>
                            </td>
                            <td>
                                <Link to={`/sellers/${seller.id}`} className="seller-link">
                                    {seller.phone}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Sellers