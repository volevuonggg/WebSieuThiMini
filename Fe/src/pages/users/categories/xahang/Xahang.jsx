"use client"

import { useState, useEffect } from "react"
import "../../../../style/categories/CategoryPage.css"
import { Link } from "react-router-dom"
import axios from "axios"
import Header from "../../../../components/header/Header"
import Footer from "../../../../components/footer/Footer"
import bannerImage from "../../../../assets/users/banner/banner-xahang.jpg"

export default function Xahang() {
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
        setcategory(response.data.xahang)
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
          <h1>GIẢM GIÁ SỐC</h1>
          <p>Khuyến mãi đặc biệt - Giá sốc mỗi ngày</p>
        </div>

        <div className="category-container">
          <div className="category-sidebar">
            <div className="category-menu">
              <h3 className="sidebar-title">Danh mục sản phẩm</h3>
              <div className="category-list-container">
                <ul className="category-list">
                  <li className="category-list-item">
                    <Link to="/category/thucphamtuoi">Thực phẩm tươi</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/thucphamkho">Thực phẩm khô</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/doanvat">Đồ ăn vặt</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/combomoi">Combo mới</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/combogia">Combo giá sốc</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/combodacbiet">Combo đặc biệt</Link>
                  </li>
                  <li className="category-list-item">
                    <Link to="/category/giamgia">Giảm giá</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-promo">
                <div className="promo-badge">HOT</div>
                <h4>Flash Sale</h4>
                <p>Giảm đến 50%</p>
                <Link to="/category/flashsale" className="promo-link">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="category-content">
            <div className="category-banner">
              <img
                src={bannerImage || "https://example.com/banner-giam-gia.jpg"}
                alt="Banner giảm giá sốc"
                className="banner-image"
              />
              <div className="banner-overlay">
                <h2>Xả Hàng Giá Sốc</h2>
                <p>Cơ hội cuối cùng - Số lượng có hạn</p>
                <Link to="/category/flashsale" className="banner-button">
                  Mua ngay
                </Link>
              </div>
            </div>

            <div className="category-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">🔥</div>
                <div className="benefit-text">
                  <h4>Giảm sốc</h4>
                  <p>Đến 50%</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⏱️</div>
                <div className="benefit-text">
                  <h4>Có hạn</h4>
                  <p>Chỉ trong hôm nay</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🎁</div>
                <div className="benefit-text">
                  <h4>Quà tặng</h4>
                  <p>Khi mua combo</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🚚</div>
                <div className="benefit-text">
                  <h4>Miễn phí</h4>
                  <p>Giao hàng nhanh</p>
                </div>
              </div>
            </div>

            <div className="category-filters">
              {["Tất cả", "Giảm nhiều", "Bán chạy", "Còn ít", "Mới thêm"].map((cat) => (
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
                  <div className="product-badge">-50%</div>
                  <div className="product-badge-hot">HOT</div>
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
                    <div className="home-product-price">
                      {cate.gia}đ<span className="product-price-original">100.000đ</span>
                    </div>
                    <div className="product-sale-info">
                      <div className="sale-progress">
                        <div className="progress-bar" style={{ width: "75%" }}></div>
                      </div>
                      <p className="sale-text">Đã bán 75%</p>
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
                      Mua ngay
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
