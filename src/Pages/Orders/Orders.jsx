import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ordersAPI from "../../API/orders";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const fetchedOrders = await ordersAPI.getAllOrders();
            setOrders(fetchedOrders);
        }
        fetchOrders()
    }, [])

    const addOrder = async () => {
        const createdOrderId = await ordersAPI.addOrder();
        console.log("is it returning the id?", createdOrderId)
        setOrderId(createdOrderId);
        if (createdOrderId) {
            navigate(`/orders/${createdOrderId}`);
        }
        
    }

    return (
        <>
            <h2>This is the Orders page</h2>
            <button onClick={addOrder}>Create new order</button>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.id}
                    </li>
                ))}
            </ul>
        </>
    )
};

export default Orders