import { useEffect, useState } from "react";
import { useParams } from "react-router";
import orderItemsAPI from "../../../API/orderItems";

const OrderItems = () => {
    const [orderItems, setOrderItems] = useState([]);
    const { orderId } = useParams();

    useEffect(() => {
        const fetchOrderItems = async () => {
            const fetchedOrderItems = await orderItemsAPI.getAllOrderItemsFromSpecificOrder(orderId);
            setOrderItems(fetchedOrderItems);
        };
        fetchOrderItems()
    }, [orderId])

    return (
        <>
            <h2>Thes are the order items</h2>
            <ul>
                {orderItems &&
                    orderItems.map((item) => (
                        <li key={item.order_item_id}>
                            <h3>{item.order_item_id}</h3>
                            <p>{item.product_id}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                        </li>
                    ))}
            </ul>
        </>
    )
};

export default OrderItems