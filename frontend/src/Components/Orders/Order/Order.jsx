import { useState } from "react";
import { useParams } from "react-router";
import Popup from "reactjs-popup";
import useFetch from "../../../API/useFetch";
import ordersAPI from "../../../API/orders";
import orderItemAPI from "../../../API/orderItem";
import './Order.css';

const Order = () => {
    const { orderId } = useParams();
    const [productId, setProductId] = useState('');
    const { data: order, setData: setOrder, error, loading } = useFetch(`http://localhost:3001/orders/${orderId}/orderItems`, 'GET')

    const totalPrice = (order || []).reduce((sum, item) => {
        const price = Number(item.price);
        return sum + (isNaN(price) ? 0 : price);
    }, 0);

    const addOrderItem = async (orderId, productId) => {
        const createdItemId = await ordersAPI.addOrderItem(orderId, productId);

        const createdOrderItem = await orderItemAPI.getSpecificOrderItem(createdItemId.id);

        if (createdOrderItem) {
            setOrder((prevOrder) => [
                ...prevOrder,
                createdOrderItem
            ]);
        }
    }

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="order-items-page">
            <h2 className="page-title">Order id: {orderId}</h2>

            <div className="action-buttons">
                <Popup trigger={<button className="add-item-btn">Add New Item</button>} modal nested>
                    {close => (
                        <form
                            className="add-item-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                addOrderItem(orderId, productId);
                                setProductId('');
                                close();
                            }}
                        >
                            <label htmlFor="productId" className="form-label">
                                Product ID:
                                <input
                                    id="productId"
                                    type="number"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    className="form-input"
                                />
                            </label>
                            <button type="submit" className="form-submit-btn">Add</button>
                        </form>
                    )}
                </Popup>
            </div>

            <table className="order-item-table">
                <caption>List of order items</caption>
                <thead>
                    <tr>
                        <th className="order-id">Order Item ID</th>
                        <th className="product-id">Product ID</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order &&
                        order.map((item) => (
                            <tr key={item.order_item_id} className="order-item-row">
                                <td className="order-id">{item.order_item_id}</td>
                                <td className="product-id">{item.product_id}</td>
                                <td>{item.category}</td>
                                <td>{item.price}:-</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <h3 className="total-price">Total Price: {totalPrice.toFixed(2)}:-</h3>
        </div>

    )
};

export default Order