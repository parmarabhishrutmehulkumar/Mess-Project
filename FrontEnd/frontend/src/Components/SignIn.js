import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection
import './SignIn.css';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to navigate after successful signup

    // Handle form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Example validation
        if (!formData.email || !formData.password) {
            setError('All fields are required!');
            return;
        }

        // Here, you would typically authenticate the user with an API call
        // Simulating success for now:
        // Redirect to home page after successful login
        console.log('SignIn successful');
        navigate('/home'); // Redirect to home or dashboard
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Sign In</button>
            </form>
            <p>
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
};

export default SignIn;
