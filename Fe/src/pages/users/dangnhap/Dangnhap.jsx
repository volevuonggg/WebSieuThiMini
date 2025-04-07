import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import './Dangnhap.css';

export default function Dangnhap() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/login`, { email, password });
      if (response.status === 200) {
        const { token, user } = response.data;
        const userData = { token, user };
        const userDataJSON = JSON.stringify(userData);
        localStorage.setItem('userData', userDataJSON);
        alert("Đăng nhập thành công");
        navigate('/');
      } else {
        setErrorMessage("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác');
      } else {
        setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h2>ĐĂNG NHẬP</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu *</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
              </div>

              <button type="submit" className="btn-success">Đăng nhập</button>
            </form>

            <div className="register-link">
              Chưa có tài khoản? <Link to="/account/register">Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
