
const getAllProducts = async (setProducts) => {
    try {
        const response = await fetch('http://localhost:3001/products');
        if (response.ok) {
            const json = await response.json();
            setProducts(json);
        } else {
            console.error("failed to fetch sellers", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
    }
};

const getSpecificProduct = async (productId) => {
    try {
        const response = await fetch(`http://localhost:3001/products/${productId}`);
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error("failed to fetch seller", response.status);
            return null;
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
        return null;
    }
}

const updateProduct = async ({ category, price }, productId, setProducts) => {
    try {
        const response = await fetch(`http://localhost:3001/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, price })
        });
        if (!response.ok) {
            const err = await response.json();
            console.error("failed to update seller: ", err.message);
        }
    } catch (err) {
        console.error("Couldn't update seller: ", err);
    }
};

const productsApi = { updateProduct, getAllProducts, getSpecificProduct };

export default productsApi