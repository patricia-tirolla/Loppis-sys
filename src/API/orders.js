const getAllOrders = async() => {
    try {
        const response = await fetch('http://localhost:3001/orders');
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch orders", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
    }
};

const addOrder = async () => {
    try {
        const response = await fetch('http://localhost:3001/orders', {
            method: 'POST'
        });
        if (response.ok) {
            const json = await response.json();
            return json.id;
        } else {
            const err = await response.json();
            console.error("failed to fetch: ", err.message);
        }
    
    } catch (err) {
        console.error("Couldn't add order: ", err);
    }
};

const addOrderItem = async (orderId, productId) => {
    try {
        const response = await fetch(`http://localhost:3001/orders/${orderId}/orderItems/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            const err = await response.json();
            console.error("failed to fetch: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't add order item: ", err);
    }
};

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

const ordersAPI = { getAllOrders, addOrder, addOrderItem, getAllOrderItemsFromSpecificOrder }

export default ordersAPI