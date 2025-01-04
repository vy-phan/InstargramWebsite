import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import BackGround from '../assets/img/signup.jpg'

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/user/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        bio: formData.bio
      });

      setSuccess(response.data.message);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: ''
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-transparent backdrop-blur-sm rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-white">Register</h1>
        {error && <div className="p-3 text-red-500 bg-red-100 bg-opacity-80 rounded">{error}</div>}
        {success && <div className="p-3 text-green-500 bg-green-100 bg-opacity-80 rounded">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-white">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-white placeholder-white::placeholder"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-white placeholder-white::placeholder"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-white">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-white placeholder-white::placeholder"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-white">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-white placeholder-white::placeholder"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-white">Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              maxLength={150}
              className="w-full px-3 py-2 mt-1 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-white placeholder-white::placeholder"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-md hover:from-purple-600/70 hover:to-indigo-500/70"
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <span className="text-white">Đã có tài khoản? </span>
          <Link to="/login" className="font-medium text-white hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;