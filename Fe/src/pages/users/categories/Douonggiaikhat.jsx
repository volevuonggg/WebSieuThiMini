"use client"

import { useState, useEffect } from "react"
import "../../../style/categories/CategoryPage.css"
import { Link } from "react-router-dom"
import axios from "axios"
import Header from "../../../components/header/Header"
import Footer from "../../../components/footer/Footer"
import bannerImage from "../../../assets/users/banner/banner-douonggiaikhat.jpg"

export default function Douonggiaikhat() {
  const [category, setcategory] = useState([])
  const [slsptgh, setslsptgh] = useState(0)
  const userData = localStorage.getItem("userData")
  const user = userData ? JSON.parse(userData).user : null
  const userId = user ? user.id : null

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
      .then((response) => {
        setslsptgh(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/categoryproduct`)
      .then((response) => {
        setcategory(response.data.douonggiaikhat)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const [activeCategory, setActiveCategory] = useState("Tất cả")

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }

  return (
    <div className="wrapper">
      <Header />

      <div className="main-content">
        <div className="page-header">
          <h1>ĐỒ UỐNG GIẢI KHÁT</h1>
          <p>Thức uống tươi mát cho mọi dịp</p>
        </div>

        <div className="category-container">
          <div className="category-sidebar">
            <div className="category-menu">
              <h3 className="sidebar-title">Danh mục sản phẩm</h3>
              <div className="category-list-container">
                <ul className="category-list">
                  <li className="category-list-item">
                    <Link to="/category/nuocngot">Nước ngọt</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/nuocsuoi">Nước suối</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/nuocmia">Nước mía</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/nuocdua">Nước dừa</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/sinhto">Sinh tố</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-promo">
                <div className="promo-badge">Mới</div>
                <h4>Combo Giải Khát</h4>
                <p>Tiết kiệm đến 20%</p>
                <Link to="/category/combo" className="promo-link">
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="category-content">
            <div className="category-banner">
              <img src={bannerImage || "/placeholder.svg"} alt="Banner đồ uống" className="banner-image" />
              <div className="banner-overlay">
                <h2>Đồ Uống Giải Khát</h2>
                <p>Tươi mát - Bổ dưỡng - Giải nhiệt</p>
                <Link to="/category/douong" className="banner-button">
                  Khám phá ngay
                </Link>
              </div>
            </div>

            <div className="category-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">❄️</div>
                <div className="benefit-text">
                  <h4>Tươi mát</h4>
                  <p>Giải nhiệt ngay</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <div className="benefit-text">
                  <h4>Nhanh chóng</h4>
                  <p>Giao trong 2h</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🌿</div>
                <div className="benefit-text">
                  <h4>Tự nhiên</h4>
                  <p>Nguyên liệu sạch</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💯</div>
                <div className="benefit-text">
                  <h4>Chất lượng</h4>
                  <p>Đảm bảo uy tín</p>
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

            <div className="home-products-grid">
              {category.map((cate) => (
                <div className="home-product-card" key={cate.id}>
                  {cate.discount && <div className="product-badge">-{cate.discount}%</div>}
                  <div className="home-product-image-container">
                    <img
                      src={`${process.env.REACT_APP_BASEURL}/upload/${cate.hinhanh}`}
                      alt={cate.title}
                      className="home-product-image"
                    />
                    <div className="home-product-overlay">
                      <Link to={`/Detail/${cate.title}/${cate.id}`} className="home-view-product-btn">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  <div className="home-product-info">
                    <h3 className="home-product-title">
                      <Link to={`/Detail/${cate.title}/${cate.id}`}>{cate.title}</Link>
                    </h3>
                    <div className="product-meta">
                      <span className="product-category">Đồ uống</span>
                      <div className="product-rating">
                        <span className="stars">★★★★☆</span>
                        <span className="rating-count">(45)</span>
                      </div>
                    </div>
                    <div className="home-product-price">
                      {cate.gia}đ{cate.discount && <span className="product-price-original">35.000đ</span>}
                    </div>
                    <Link to={`/Detail/${cate.title}/${cate.id}`} className="home-add-to-cart-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      Xem sản phẩm
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
