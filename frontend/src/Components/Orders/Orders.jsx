import { useNavigate } from 'react-router';
import useFetch from '../../API/useFetch';
import ordersAPI from '../../API/orders';
import './Orders.css';

const Orders = () => {
  const { data: orders, error, loading} = useFetch('http://localhost:3001/orders', 'GET')
  const navigate = useNavigate();

  const addOrder = async () => {
    const createdOrderId = await ordersAPI.addOrder();
    if (createdOrderId) {
      navigate(`/orders/${createdOrderId}`);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

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
              onClick={() => navigate(`/orders/${order.id}`)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/orders/${order.id}`)
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