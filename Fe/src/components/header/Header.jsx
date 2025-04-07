import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCaretDown } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData).user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/account/login');
  };

  return (
    <div className="header-container">
      <div className="header">
        <ul className="header-nav">
          <li><Link to="/">Giới thiệu</Link></li>
          <li className="dropdown">
            <Link to="/">Sản phẩm <AiFillCaretDown /></Link>
            <ul className="dropdown-content">
              <li><Link to="/category/raucuqua">Rau - Củ - Quả</Link></li>
              <li><Link to="/category/douonggiaikhat">Đồ Uống Giải Khát</Link></li>
              <li><Link to="/category/thucphamtuoisong">Thực Phẩm Tươi Sống</Link></li>
              <li><Link to="/category/thucphamanlien">Thực phẩm ăn liền</Link></li>

            </ul>
          </li>
          <li><Link to="/">Góc cửa hàng</Link></li>
          <li className="dropdown">
            <Link to="/">Hot Deal <AiFillCaretDown /></Link>
            <ul className="dropdown-content">
              <li><Link to="/category/bosuutapmoi">Sản phẩm mới</Link></li>
              <li><Link to="/category/sandouudai">Săn đồ ưu đãi</Link></li>
              <li><Link to="/category/xahang">Xả hàng</Link></li>
            </ul>
          </li>
          <li><Link to="/">Tuyển dụng</Link></li>
          <li><Link to="/">Feedback</Link></li>
          <li><Link to="/">Liên hệ</Link></li>
          <li><Link to="/Cart">Giỏ hàng <BsFillCartFill /></Link></li>
        </ul>

        <div className="login-register">
          <ul>
            {user ? (
              <>
                <li>Xin chào: {user.name}</li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/account/login">Đăng nhập</Link></li>
                <li><Link to="/account/register">Đăng ký</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 