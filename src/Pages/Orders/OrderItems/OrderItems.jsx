import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Popup from "reactjs-popup";
import ordersAPI from "../../../API/orders";
import orderItemsAPI from "../../../API/orderItems";

const OrderItems = () => {
    const [orderItems, setOrderItems] = useState([]);
    const { orderId } = useParams();
    const [productId, setProductId] = useState('');

    useEffect(() => {
        const fetchOrderItems = async () => {
            const fetchedOrderItems = await ordersAPI.getAllOrderItemsFromSpecificOrder(orderId);
            setOrderItems(fetchedOrderItems);
        };
        fetchOrderItems()
        // Why is React asking to include orderItems in the dependency array?
    }, [orderId])
    
    const addOrderItem = async (orderId, productId) => {
        const createdItemId = await ordersAPI.addOrderItem(orderId, productId);

        const createdOrderItem = await orderItemsAPI.getSpecificOrderItem(createdItemId.id);

        if (createdOrderItem) {
            setOrderItems((prevOrderItems) => [
                ...prevOrderItems,
                createdOrderItem
            ]);
        }
    }

    return (
        <>
            <h2>Thes are the order items</h2>
            <Popup trigger={<button >Add New Item</button>} modal nested>
                {close => (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        addOrderItem(orderId, productId);
                        setProductId('');
                    }}>
                        <label>Product Id
                            <input 
                            type="number"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            />
                        </label>
                    </form>
                )}
            </Popup>
            
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