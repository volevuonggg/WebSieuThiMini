"use client"

import { useState, useEffect } from "react"
import "../../../../style/categories/CategoryPage.css"
import { Link } from "react-router-dom"
import axios from "axios"
import Header from "../../../../components/header/Header"
import Footer from "../../../../components/footer/Footer"
import bannerImage from "../../../../assets/users/banner/banner-bosuutapmoi.jpg"

export default function Bosuutapmoi() {
  const [category, setcategory] = useState([])
  const [slsptgh, setslsptgh] = useState(0)
  const [activeCategory, setActiveCategory] = useState("Tất cả")
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
        setcategory(response.data.bosuutapmoi)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }

  return (
    <div className="wrapper">
      <Header />

      <div className="main-content">
        <div className="page-header">
          <h1>SẢN PHẨM MỚI</h1>
          <p>Khám phá những sản phẩm mới nhất</p>
        </div>

        <div className="category-container">
          <div className="category-sidebar">
            <div className="category-menu">
              <h3 className="sidebar-title">Danh mục sản phẩm</h3>
              <div className="category-list-container">
                <ul className="category-list">
                  <li className="category-list-item">
                    <Link to="/category/sominu">Sơ mi nữ</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/chanvay">Chân váy</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/vaydamcongso">Váy đầm công sở</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/thucphamanlien">Thực phẩm ăn liền</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/sandouudai">Săn đồ ưu đãi</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/xahang">Xả hàng</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-promo">
                <div className="promo-badge">Mới</div>
                <h4>Bộ Sưu Tập Mới</h4>
                <p>Khám phá ngay hôm nay</p>
                <Link to="/category/bosuutapmoi" className="promo-link">
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="category-content">
            <div className="category-banner">
              <img
                src={bannerImage}
                alt="Sản phẩm mới"
                className="banner-image"
              />
              <div className="banner-overlay">
                <h2>Sản Phẩm Mới</h2>
                <p>Khám phá những sản phẩm mới nhất</p>
                <Link to="/category/bosuutapmoi" className="banner-button">
                  Khám phá ngay
                </Link>
              </div>
            </div>

            <div className="category-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">🆕</div>
                <div className="benefit-text">
                  <h4>Mới nhất</h4>
                  <p>Cập nhật hàng ngày</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🔝</div>
                <div className="benefit-text">
                  <h4>Xu hướng</h4>
                  <p>Sản phẩm hot nhất</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🎁</div>
                <div className="benefit-text">
                  <h4>Quà tặng</h4>
                  <p>Cho đơn hàng mới</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🚚</div>
                <div className="benefit-text">
                  <h4>Giao hàng</h4>
                  <p>Miễn phí toàn quốc</p>
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

            <div className="home-products-grid">
              {category.map((cate) => (
                <div className="home-product-card" key={cate.id}>
                  {cate.discount && <div className="product-badge">-{cate.discount}%</div>}
                  <div className="new-product-badge">Mới</div>
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
                      <span className="product-category">Sản phẩm mới</span>
                      <div className="product-rating">
                        <span className="stars">★★★★☆</span>
                        <span className="rating-count">(45)</span>
                      </div>
                    </div>
                    <div className="home-product-price">
                      {cate.gia}đ{cate.discount && <span className="product-price-original">399.000₫</span>}
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
