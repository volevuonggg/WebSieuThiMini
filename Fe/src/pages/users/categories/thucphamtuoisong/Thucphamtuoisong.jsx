import React, { useState, useEffect } from "react";
import "../../../../style/categories/CategoryPage.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import bannerImage from "../../../../assets/users/banner/banner-thucphamtuoisong.jpg";

export default function Thucphamtuoisong() {
  const [category, setcategory] = useState([]);
  const [slsptgh, setslsptgh] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
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
        setcategory(response.data.thucphamtuoisong);
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
          <h1>THỰC PHẨM TƯƠI SỐNG</h1>
          <p>Thực phẩm tươi ngon, đảm bảo chất lượng</p>
        </div>

        <div className="category-container">
          <div className="category-sidebar">
            <div className="category-menu">
              <h3 className="sidebar-title">Danh mục sản phẩm</h3>
              <div className="category-list-container">
                <ul className="category-list">
                  <li className="category-list-item">
                    <Link to="/category/monansang">Món ăn sáng</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/montrua">Món trưa văn phòng</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/montoi">Món tối gia đình</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/monchay">Món chay</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/salad">Salad - Món nhẹ</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/canh">Canh - Súp</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/douong">Đồ uống</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-promo">
                <div className="promo-badge">Mới</div>
                <h4>Combo Thực Phẩm Tươi</h4>
                <p>Tiết kiệm đến 25%</p>
                <Link to="/category/combomoi" className="promo-link">
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="category-content">
            <div className="category-banner">
              <img src={bannerImage} alt="Banner thực phẩm tươi" className="banner-image" />
              <div className="banner-overlay">
                <h2>Thực Phẩm Tươi Sống</h2>
                <p>Từ nhà cung cấp đến bàn ăn - Đảm bảo chất lượng</p>
                <Link to="/category/thucphamtuoi" className="banner-button">
                  Khám phá ngay
                </Link>
              </div>
            </div>

            <div className="category-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">🌱</div>
                <div className="benefit-text">
                  <h4>Tươi ngon</h4>
                  <p>Nhập mới mỗi ngày</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🚚</div>
                <div className="benefit-text">
                  <h4>Giao hàng</h4>
                  <p>Nhanh trong ngày</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💯</div>
                <div className="benefit-text">
                  <h4>Đảm bảo</h4>
                  <p>Tươi ngon hoặc hoàn tiền</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🔄</div>
                <div className="benefit-text">
                  <h4>Đổi trả</h4>
                  <p>Dễ dàng trong 24h</p>
                </div>
              </div>
            </div>

            <div className="category-filters">
              {["Tất cả", "Món mới", "Bán chạy", "Đánh giá cao", "Giảm giá"].map((cat) => (
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
                      <span className="product-category">Thực phẩm tươi sống</span>
                      <div className="product-rating">
                        <span className="stars">★★★★☆</span>
                        <span className="rating-count">(45)</span>
                      </div>
                    </div>
                    <h3 className="product-title">
                      <Link to={`/Detail/${cate.title}/${cate.id}`}>{cate.title}</Link>
                    </h3>
                    <div className="product-meta">
                      <span className="product-weight">300g</span>
                      <span className="product-origin">Việt Nam</span>
                    </div>
                    <div className="product-price-wrapper">
                      <span className="product-price">{cate.gia}</span>
                      {cate.discount && <span className="product-price-original">399.000₫</span>}
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
