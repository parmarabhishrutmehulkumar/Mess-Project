import React, { useState } from 'react';
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import '../Styles/Profile.css';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        uid: '',
        branch: '',
        semester: '',
        course: '',
        photo: '',
        email: '',
        password: '',
        residence: 'day-scholar',
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile Updated:', formData);
        setSuccessMessage('Profile Updated Successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <h2>Edit Profile</h2>
                
                {successMessage && <div className="message success">{successMessage}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="photo-upload">
                        <label htmlFor="photo-upload">Profile Photo</label>
                        <div className="photo-upload-area">
                            {formData.photo ? (
                                <div className="photo-preview">
                                    <img src={formData.photo} alt="Profile" />
                                </div>
                            ) : (
                                <div className="photo-placeholder">
                                    <span>+</span>
                                </div>
                            )}
                            <input 
                                type="file" 
                                id="photo-upload" 
                                accept="image/*" 
                                onChange={handlePhotoUpload}
                                className="file-input" 
                            />
                            <label htmlFor="photo-upload" className="upload-btn">
                                {formData.photo ? 'Change Photo' : 'Upload Photo'}
                            </label>
                        </div>
                    </div>
                    
                    <div className="form-grid">
                        <div className="input-group">
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Enter your full name"
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="uid">UID</label>
                            <input 
                                type="text" 
                                id="uid" 
                                name="uid" 
                                value={formData.uid} 
                                onChange={handleChange} 
                                placeholder="Enter your UID"
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Enter your email"
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
                        
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input 
                                type="date" 
                                id="dob" 
                                name="dob" 
                                value={formData.dob} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="branch">Branch</label>
                            <input 
                                type="text" 
                                id="branch" 
                                name="branch" 
                                value={formData.branch} 
                                onChange={handleChange} 
                                placeholder="e.g. Computer Science"
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="semester">Semester</label>
                            <input 
                                type="text" 
                                id="semester" 
                                name="semester" 
                                value={formData.semester} 
                                onChange={handleChange} 
                                placeholder="e.g. 3rd"
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="course">Course</label>
                            <input 
                                type="text" 
                                id="course" 
                                name="course" 
                                value={formData.course} 
                                onChange={handleChange} 
                                placeholder="e.g. B.Tech"
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="residence">Residence</label>
                            <select 
                                id="residence" 
                                name="residence" 
                                value={formData.residence} 
                                onChange={handleChange}
                            >
                                <option value="day-scholar">Day Scholar</option>
                                <option value="hosteller">Hosteller</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-btn">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;