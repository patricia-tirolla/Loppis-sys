const authentication = async (password) => {
    try {
        const response = await fetch('http://localhost:3001/auth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        if (response.ok) {
            const json = await response.json();
            if (json.token) {
                localStorage.setItem('token', json.token);
                return json.token
            } else {
                console.error("No token received")
            }
        } else {
            console.error("Auth failed", response.status);
            return null;
        }
    } catch (err) {
        console.error("Couldn't fetch: ", err);
        return null;
    }
};

export default authentication