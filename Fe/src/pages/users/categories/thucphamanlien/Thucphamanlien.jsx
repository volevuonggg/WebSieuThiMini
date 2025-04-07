import React, { useState, useEffect } from "react";
import "../../../../style/categories/CategoryPage.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';
import bannerImage from '../../../../assets/users/banner/banner-thucphamanlien.jpg';

export default function Thucphamanlien() {
  const [category, setcategory] = useState([]);
  const [slsptgh, setslsptgh] = useState(0);
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

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
        setcategory(response.data.thucphamanlien);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="wrapper">
      <Header />

      <div className="main-content">
        <div className="page-header">
          <h1>THỰC PHẨM ĂN LIỀN</h1>
          <p>Tiện lợi mỗi ngày - Đa dạng lựa chọn</p>
        </div>

        <div className="category-container">
          <div className="category-sidebar">
            <div className="category-menu">
              <h3 className="sidebar-title">Danh mục sản phẩm</h3>
              <div className="category-list-container">
                <ul className="category-list">
                  <li className="category-list-item">
                    <Link to="/category/minhachnhanh">Mì ăn liền</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/dongoi">Đồ nấu nhanh</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/doanvat">Đồ ăn vặt</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/douonganlien">Đồ uống</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/anvat">Ăn vặt các loại</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-promo">
                <div className="promo-badge">Mới</div>
                <h4>Combo Tiện Lợi</h4>
                <p>Tiết kiệm đến 30%</p>
                <Link to="/category/combo" className="promo-link">
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="category-content">
            <div className="category-banner">
              <img src={bannerImage} alt="Banner thực phẩm ăn liền" className="banner-image" />
              <div className="banner-overlay">
                <h2>Thực Phẩm Ăn Liền</h2>
                <p>Tiện lợi - Nhanh chóng - Đa dạng</p>
                <Link to="/category/combo" className="banner-button">
                  Khám phá ngay
                </Link>
              </div>
            </div>

            <div className="category-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <div className="benefit-text">
                  <h4>Tiện lợi</h4>
                  <p>Nấu nhanh 3 phút</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🌟</div>
                <div className="benefit-text">
                  <h4>Đa dạng</h4>
                  <p>Nhiều lựa chọn</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💰</div>
                <div className="benefit-text">
                  <h4>Tiết kiệm</h4>
                  <p>Giá tốt mỗi ngày</p>
                </div>
              </div>
            </div>

            <div className="category-filters">
              {["Tất cả", "Mới nhất", "Bán chạy", "Đánh giá cao", "Giảm giá"].map((cat) => (
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
                  {cate.discount && (
                    <div className="product-badge">-{cate.discount}%</div>
                  )}
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
                      <span className="product-category">Thực phẩm ăn liền</span>
                      <div className="product-rating">
                        <span className="stars">★★★★☆</span>
                        <span className="rating-count">(45)</span>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <Link to={`/Detail/${cate.title}/${cate.id}`}>{cate.title}</Link>
                    </h3>
                    <div className="product-meta">
                      <span className="product-weight">90g</span>
                      <span className="product-origin">Việt Nam</span>
                    </div>
                    <div className="product-price-wrapper">
                      <span className="product-price">{cate.gia}</span>
                      {cate.discount && <span className="product-price-original">39.000₫</span>}
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
