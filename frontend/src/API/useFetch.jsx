import { useState, useEffect } from "react";

const useFetch = (url, method, body = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            const headers = {
                'Authorization': `Bearer ${token}`
            }

            if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
                headers['Content-Type'] = 'application/json';
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: body ? JSON.stringify(body) : null
                });

                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (err) {
                setError(err.message || 'Unknown error')
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, method, body]);

    return { data, setData, error, loading };
};

export default useFetch
