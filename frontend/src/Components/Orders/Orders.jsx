import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
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
        <caption className="table-caption">List of orders</caption>
        <thead>
          <tr>
            <th scope="col">Order ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="order-row"
              tabIndex={0}
              onClick={() => navigate(`/orders/${order.id}/orderItems`)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/orders/${order.id}/orderItems`)
                }
            }}
              style={{ cursor: 'pointer' }}
            >
              <td>{order.id}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>

  )
};

export default Orders