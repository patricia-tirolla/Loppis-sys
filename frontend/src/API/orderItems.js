const getSpecificOrderItem = async (orderItemId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/orderItems/${orderItemId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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