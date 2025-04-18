import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(undefined);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const authenticate = async () => {
            try {
                const response = await fetch('http://localhost:3001/auth/protected-data', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 401) {
                    setAuthenticated(false);
                } else {
                    setAuthenticated(true);
                }                
            } catch (err) {
                console.error("Error authenticating: ", err);
            }
        }
        authenticate();
    }, [token])

    if (authenticated === false) {
        return <Navigate to="/auth" replace />;
    }

    if (authenticated === undefined) {
        return <></>
    }

    return children;
};

export default ProtectedRoute