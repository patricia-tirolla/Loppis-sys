import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import ordersAPI from "../../API/orders";

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
        <>
            <h2>This is the Orders page</h2>
            <button onClick={addOrder}>Create new order</button>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <Link to={`/orders/${order.id}/orderItems`}>
                            {order.id}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default Orders