import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dangnhapadmin.css';

export default function Dangnhapadmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/accountlogin`, { email, password });
      if (response.status === 200) {
        alert("Login successful");
        navigate('/homeadmin');
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert('tài khoản,mật khẩu không chính xác');
      }
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h2>Admin Dashboard</h2>
          <p>Đăng nhập để quản lý hệ thống</p>
        </div>
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email đăng nhập"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
            />
          </div>
          <button type="submit" className="admin-login-button">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}