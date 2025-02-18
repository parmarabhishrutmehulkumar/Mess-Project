import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirection
import './Signup.css';  // Optional for styling

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        uid: '',
        password: '',
        role: 'student', // Default role
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
        setSuccessMessage('');

        // Example validation
        if (!formData.name || !formData.email || !formData.uid || !formData.password) {
            setError('All fields are required!');
            return;
        }

        // Here you would typically handle the API call
        // For now, we simulate success:
        setSuccessMessage('Signup successful!');

        // Redirect to the SignIn page after successful signup
        setTimeout(() => {
            navigate('/signin'); // Redirect to the SignIn page
        }, 2000); // Optional delay before redirect (2 seconds)
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

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
                    <label>UID</label>
                    <input
                        type="text"
                        name="uid"
                        value={formData.uid}
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

                <div>
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
