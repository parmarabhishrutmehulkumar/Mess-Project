import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconEye, IconEyeOff } from "@tabler/icons-react"; // Import icons for password visibility
import '../Styles/SignIn.css';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('All fields are required!');
            return;
        }

        console.log('SignIn successful');
        navigate('/home');
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-container">
                <h2>Welcome Back</h2>
                
                {error && <div className="message error">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={error && !formData.email ? "error-input" : ""}
                            required
                        />
                    </div>
        
                    <div className="input-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={error && !formData.password ? "error-input" : ""}
                                required
                            />
                            <button 
                                type="button" 
                                className="toggle-password" 
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
        
                    <button type="submit" className="submit-btn">Sign In</button>
                </form>
                
                <div className="signup-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;