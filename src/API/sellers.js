const getAllSellers = async (setSellers) => {
    try {
        const response = await fetch('http://localhost:3001/sellers');
        if (response.ok) {
            const json = await response.json();
            setSellers(json);
        } else {
            console.error("failed to fetch sellers", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
    }
};

const addSeller = async ({ sellerName, sellerPhone }, setSellers) => {
        try {
            const response = await fetch('http://localhost:3001/sellers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sellerName, sellerPhone })
            });
            if (response.ok) {
                const json = await response.json();
                setSellers((sellers) => [...sellers, { id: json.id, name: sellerName, phone: sellerPhone }]);
            } else {
                const err = await response.json();
                console.error("failed to add seller: ", err.message);
            }
        } catch (err) {
            console.error("Couldn't add seller: ", err);
        }
};

const updateSeller = async ({ sellerName, sellerPhone}, sellerId, setSellers) => {
    try {
        const response = await fetch(`http://localhost:3001/sellers/${sellerId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
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
            console.error("failed to update seller: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't update seller: ", err);
    }
};

const deleteSeller = async (sellerId, setSellers) => {
    try {
        const response = await fetch(`http://localhost:3001/sellers/${sellerId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setSellers((sellers) =>
                sellers.filter((seller) => seller.id !== sellerId)
            );
        } else {
            const err = await response.json();
            console.error("failed to delete seller: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't delete seller: ", err);
    }
};


const sellersApi = { getAllSellers, addSeller, updateSeller, deleteSeller }

export default sellersApi 