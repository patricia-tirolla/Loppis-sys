import { useState } from "react";
import { useNavigate } from "react-router";
import authentication from "../../API/auth";

const Login = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await authentication(password);
        if (token) {
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="password">Password:
                <input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                />
            </label>
            <button type="submit" className="auth-button">Log In</button>
        </form>
    )
};

export default Login