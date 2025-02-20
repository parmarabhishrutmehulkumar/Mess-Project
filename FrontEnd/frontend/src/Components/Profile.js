import React, { useState } from 'react';
import './Profile.css';
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
        residence: 'day-scholar', // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: URL.createObjectURL(file) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile Updated:', formData);
        alert('Profile Updated Successfully!');
    };

    return (
        <div className="profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Photo</label>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                    {formData.photo && <img src={formData.photo} alt="Profile" width="100" />}
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>UID</label>
                    <input type="text" name="uid" value={formData.uid} onChange={handleChange} required />
                </div>
                <div>
                    <label>Branch</label>
                    <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
                </div>
                <div>
                    <label>Semester</label>
                    <input type="text" name="semester" value={formData.semester} onChange={handleChange} required />
                </div>
                <div>
                    <label>Course</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} required />
                </div>
                <div>
                    <label>DOB</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Residence</label>
                    <select name="residence" value={formData.residence} onChange={handleChange}>
                        <option value="day-scholar">Day Scholar</option>
                        <option value="hosteller">Hosteller</option>
                    </select>
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
