const getSpecificOrderItem = async (orderItemId) => {
    try {
        const response = await fetch(`http://localhost:3001/orderItems/${orderItemId}`);
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch order item", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
    }
};

const orderItemsAPI = { getSpecificOrderItem}

export default orderItemsAPI