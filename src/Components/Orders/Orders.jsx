import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import ordersAPI from '../../API/orders';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const fetchedOrders = await ordersAPI.getAllOrders();
            setOrders(fetchedOrders);
        }
        fetchOrders();
    }, [])

    const addOrder = async () => {
        const createdOrderId = await ordersAPI.addOrder();
        if (createdOrderId) {
            navigate(`/orders/${createdOrderId}/orderItems`);
        }
    };

    return (
        <div className="orders-page">
  <h2 className="page-title">Orders</h2>

  <div className="action-buttons">
    <button className="add-order-btn" onClick={addOrder}>
      Create New Order
    </button>
  </div>

  <table className="order-table">
    <thead>
      <tr>
        <th>Order ID</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.id} className="order-row">
          <td>
            <Link to={`/orders/${order.id}/orderItems`} className="order-link">
              {order.id}
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    )
};

export default Orders