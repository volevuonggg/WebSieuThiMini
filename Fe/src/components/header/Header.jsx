import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCaretDown } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import axios from 'axios'; // Thêm import axios
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Thêm state mới

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData).user);
    }
  }, []);

  // Thêm useEffect để lấy số lượng sản phẩm
  useEffect(() => {
    const fetchCartCount = async () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const userId = JSON.parse(userData).user.id;
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`);
          setCartCount(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCartCount();
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
          <li><Link to="/goccuahang">Góc cửa hàng</Link></li>
          <li className="dropdown">
            <Link to="/">Hot Deal <AiFillCaretDown /></Link>
            <ul className="dropdown-content">
              <li><Link to="/category/bosuutapmoi">Sản phẩm mới</Link></li>
              <li><Link to="/category/sandouudai">Săn đồ ưu đãi</Link></li>
              <li><Link to="/category/xahang">Xả hàng</Link></li>
            </ul>
          </li>
          <li><Link to="/">Liên hệ</Link></li>

          <li><Link to="/kiemtradon">Kiểm tra đơn hàng</Link></li>

          <li className="cart-icon">
            <Link to="/Cart">
              Giỏ hàng <BsFillCartFill />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>
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