const getAllOrderItemsFromSpecificOrder = async (orderId) => {
    try {
        const response = await fetch(`http://localhost:3001/orders/${orderId}/orderItems`);
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch order items", response.status);
        }
    } catch (err) {
        console.error("Couldn't get order items: ", err);
    }
};

const orderItemsAPI = { getAllOrderItemsFromSpecificOrder };

export default orderItemsAPI