
const getAllProducts = async (setProducts) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3001/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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

const updateProduct = async ({ category, price }, productId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

const deleteProduct = async (productId, setProducts, products) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const err = await response.json();
            console.error("failed to fetch product: ", err.message);
        } else {
            setProducts(products.filter(product => product.id !== productId));
        }
    } catch (err) {
        console.error("Couldn't delete product: ", err);
    }
};

const productsApi = { updateProduct, getAllProducts, getSpecificProduct, deleteProduct };

export default productsApi