const getSpecificOrder = async (orderId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch order", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
    }
}

const addOrder = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
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
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/orders/${orderId}/orderItems/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/orders/${orderId}/orderItems`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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

const sumOrder = async (orderId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/orders/${orderId}/summary`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch sum", response.status);
        }
    } catch (err) {
        console.error("Couldn't sum order: ", err);
    }
};

const ordersAPI = { addOrder, addOrderItem, getAllOrderItemsFromSpecificOrder, getSpecificOrder, sumOrder }

export default ordersAPI