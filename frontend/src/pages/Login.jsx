import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackGround from '../assets/img/background.jpg'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('/api/user/login', {
        email,
        password,
      });

      if (response.data) {
        // Lưu toàn bộ dữ liệu response vào localStorage
        localStorage.setItem('userIns', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Đã có lỗi xảy ra khi đăng nhập');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${BackGround})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-sm p-8 space-y-6 bg-transparent backdrop-blur-sm rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-white">Welcome Back!</h1>
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 bg-opacity-80 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-white">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-white placeholder-white::placeholder"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-white">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-white bg-transparent text-white rounded-md focus:outline-none focus:ring focus:ring-white placeholder-white::placeholder"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-md hover:from-purple-600/70 hover:to-indigo-500/70"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-white">
          Bạn chưa có tài khoản? <Link to="/register" className="font-medium text-white hover:underline">Đăng ký tại đây</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;