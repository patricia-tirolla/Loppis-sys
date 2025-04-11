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
}

const ordersAPI = { getAllOrders, addOrder }

export default ordersAPI