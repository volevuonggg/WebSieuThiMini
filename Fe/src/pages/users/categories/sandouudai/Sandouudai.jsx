import React, { useState, useEffect } from "react";
import "./Sandouudai.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import bannerImage from '../../../../assets/users/banner/banner-uudai.jpg';

export default function Sandouudai() {
  const [category, setcategory] = useState([]);
  const [slsptgh, setslsptgh] = useState(0);
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
      .then((response) => {
        setslsptgh(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/categoryproduct`)
      .then((response) => {
        setcategory(response.data.sandouudai);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="main-content">
        <div className="page-header">
          <h1>SĂN ƯU ĐÃI</h1>
          <p>Giảm giá sốc - Khuyến mãi hot mỗi ngày</p>
        </div>

        <div className="category-container">
          <div className="category-sidebar">
            <div className="category-menu">
              <h3 className="sidebar-title">Danh mục khuyến mãi</h3>
              <div className="category-list-container">
                <ul className="category-list">
                  <li className="category-list-item">
                    <Link to="/category/flashsale">Flash Sale</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/combodeal">Combo tiết kiệm</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/giasoc">Giá sốc</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/moingay">Deal mỗi ngày</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-promo">
                <div className="promo-badge">Hot</div>
                <h4>Flash Sale 12H</h4>
                <p>Giảm đến 50%</p>
                <Link to="/category/flashsale" className="promo-link">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="category-content">
            <div className="category-banner">
              <img src={bannerImage} alt="Banner ưu đãi" className="banner-image" />
              <div className="banner-overlay">
                <h2>Siêu Ưu Đãi</h2>
                <p>Tiết kiệm đến 50% - Số lượng có hạn</p>
                <Link to="/category/flashsale" className="banner-button">
                  Săn deal ngay
                </Link>
              </div>
            </div>

            <div className="category-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <div className="benefit-text">
                  <h4>Flash Sale</h4>
                  <p>Giảm sốc mỗi giờ</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🎁</div>
                <div className="benefit-text">
                  <h4>Quà tặng</h4>
                  <p>Đơn từ 500K</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💎</div>
                <div className="benefit-text">
                  <h4>VIP Deal</h4>
                  <p>Ưu đãi độc quyền</p>
                </div>
              </div>
            </div>

            <div className="category-filters">
              {["Tất cả", "Flash Sale", "Combo Deal", "Giá sốc", "Mới"].map((cat) => (
                <div
                  key={cat}
                  className={`filter-item ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>

            <div className="products-grid">
              {category.map(cate => (
                <div className="product-card" key={cate.id}>
                  <div className="product-image-container">
                    <img
                      src={`${process.env.REACT_APP_BASEURL}/upload/${cate.hinhanh}`}
                      alt={cate.title}
                      className="product-image"
                    />
                    <div className="product-actions">
                      <Link to={`/Detail/${cate.title}/${cate.id}`} className="view-product">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-meta-top">
                      <span className="product-category">Flash Sale</span>
                      <div className="product-rating">
                        <span className="stars">★★★★☆</span>
                        <span className="rating-count">(45)</span>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <Link to={`/Detail/${cate.title}/${cate.id}`}>{cate.title}</Link>
                    </h3>
                    <div className="product-meta">
                      <div className="deal-progress">
                        <div className="progress-bar" style={{ width: '60%' }}></div>
                      </div>
                      <div className="deal-stats">
                        <span>Đã bán: 30</span>
                        <span>Còn lại: 20</span>
                      </div>
                    </div>
                    <div className="product-price-wrapper">
                      <span className="product-price">{cate.gia}đ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
