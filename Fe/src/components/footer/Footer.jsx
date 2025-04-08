import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Về chúng tôi</h3>
          <p>Chúng tôi cam kết mang đến những sản phẩm tươi ngon nhất, chất lượng nhất cho người tiêu dùng Việt Nam.</p>
          <div className="social-links">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul className="footer-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/category/sanphammoi">Sản phẩm mới</Link></li>
            <li><Link to="/category/khuyenmai">Khuyến mãi</Link></li>
            <li><Link to="/stores">Góc cửa hàng</Link></li>
            <li><Link to="/feedback">Phản hồi</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Danh mục</h3>
          <ul className="footer-links">
            <li><Link to="/category/traicay">Trái cây</Link></li>
            <li><Link to="/category/raucu">Rau củ</Link></li>
            <li><Link to="/category/thitca">Thịt & Cá</Link></li>
            <li><Link to="/category/combo">Combo tiết kiệm</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Liên hệ</h3>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>18A Cộng Hòa, Quận Tân Bình, TP.HCM</span>
            </li>
            <li>
              <FaPhone className="contact-icon" />
              <span>+84 123 456 789</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>info@freshfood.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Fresh Food. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer; 