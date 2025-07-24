import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../API/useFetch';
import sellersApi from '../../API/sellers';
import SellerActionPopup from './SellerActionPopup/SellerActionPopup';
import './Sellers.css';

const Sellers = () => {
    const { data: sellers, setData: setSellers, error, loading } = useFetch('http://localhost:3001/sellers', 'GET')
    const [seller, setSeller] = useState({ sellerName: '', sellerPhone: '' });
    const [sellerId, setSellerId] = useState('');

    const navigate = useNavigate();

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

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
                <caption className="table-caption">List of all sellers</caption>
                <thead>
                    <tr>
                        <th scope="col">Seller ID</th>
                        <th scope="col">Seller Name</th>
                        <th scope="col">Seller Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller.id}
                            className="seller-row"
                            tabIndex={0}
                            onClick={() => navigate(`/sellers/${seller.id}`)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    navigate(`/sellers/${seller.id}`)
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>
                                {seller.id}
                            </td>
                            <td>
                                {seller.name}
                            </td>
                            <td>
                                {seller.phone}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Sellers