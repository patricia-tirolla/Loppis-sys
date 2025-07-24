const getSpecificSeller = async (sellerId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/sellers/${sellerId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch seller", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
    }
};

const addSeller = async ({ sellerName, sellerPhone }, setSellers) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3001/sellers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ sellerName, sellerPhone })
        });
        if (response.ok) {
            const json = await response.json();
            setSellers((sellers) => [...sellers, { id: json.id, name: sellerName, phone: sellerPhone }]);
        } else {
            const err = await response.json();
            console.error("failed to fetch: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't add seller: ", err);
    }
};

const updateSeller = async ({ sellerName, sellerPhone }, sellerId, setSellers) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/sellers/${sellerId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: sellerName, phone: sellerPhone })
        });
        if (response.ok) {
            setSellers((sellers) =>
                sellers.map((seller) =>
                    seller.id === sellerId
                        ? { ...seller, name: sellerName, phone: sellerPhone }
                        : seller
                )
            );
        } else {
            const err = await response.json();
            console.error("failed to fetch: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't update seller: ", err);
    }
};

const deleteSeller = async (sellerId, setSellers) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/sellers/${sellerId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            setSellers((sellers) =>
                sellers.filter((seller) => seller.id !== sellerId)
            );
        } else {
            const err = await response.json();
            console.error("failed to fetch: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't delete seller: ", err);
    }
};

const addNewProduct = async ({ category, price }, sellerId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/sellers/${sellerId}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ category, price })
        });
        if (!response.ok) {
            const err = await response.json();
            console.error("failed to fetch: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't add product: ", err);
    }
};

const getAllProductsFromSpecificSeller = async (sellerId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/sellers/${sellerId}/products`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch seller", response.status);
        }
    } catch (err) {
        console.error("Couldn't add seller: ", err);
    }
};

const sellersApi = { addSeller, updateSeller, deleteSeller, getSpecificSeller, addNewProduct, getAllProductsFromSpecificSeller }

export default sellersApi 