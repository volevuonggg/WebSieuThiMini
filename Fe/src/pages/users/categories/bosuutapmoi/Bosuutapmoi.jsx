import React, { useState, useEffect } from "react";
import './Bosuutapmoi.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";

export default function Bosuutapmoi() {
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
        setcategory(response.data.bosuutapmoi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      
      <div className="main-content">
        <div className="page-header">
          <h1>Sản phẩm mới</h1>
          <p>Khám phá những sản phẩm mới nhất</p>
        </div>

        <div className="containercategory">
          <div className="leftcategory">
            <div className="damhmuccategory">
              <div className="categorynho">
                <ul className="list-group">
                  <li className="list-group-item"><Link to="/category/sominu">Sơ mi nữ</Link></li>
                  <li className="list-group-item"><Link to="/category/chanvay">Chân váy</Link></li>
                  <li className="list-group-item"><Link to="/category/vaydamcongso">Váy đầm công sở</Link></li>
                  <li className="list-group-item"><Link to="/category/thucphamanlien">Thực phẩm ăn liền</Link></li>
                  <li className="list-group-item"><Link to="/category/sandouudai">Săn đồ ưu đãi</Link></li>
                  <li className="list-group-item"><Link to="/category/xahang">Xả hàng</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rightcategory">
            <div className="category-banner">
              <img
                src={`${process.env.REACT_APP_BASEURL}/upload/banner-bosuutapmoi.jpg`}
                alt="Sản phẩm mới"
                className="banner-image"
              />
              <div className="banner-overlay">
                <h2>Sản phẩm mới</h2>
                <p>Khám phá những sản phẩm mới nhất</p>
              </div>
            </div>

            <div className="food-categories">
              <div className="food-category active">Tất cả</div>
              <div className="food-category">Món mới</div>
              <div className="food-category">Bán chạy</div>
              <div className="food-category">Đánh giá cao</div>
              <div className="food-category">Giảm giá</div>
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
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">
                      <Link to={`/Detail/${cate.title}/${cate.id}`}>{cate.title}</Link>
                    </h3>
                    <div className="product-rating">
                      <span className="stars">★★★★☆</span>
                      <span>(45)</span>
                    </div>
                    <div className="product-price-wrapper">
                      <span className="product-price">{cate.gia}đ</span>
                      {cate.discount && (
                        <span className="product-price-original">399.000đ</span>
                      )}
                    </div>
                    <div className="product-meta">
                      <span className="product-weight">
                        <i className="fas fa-weight"></i> 300g
                      </span>
                      <span className="product-calories">
                        <i className="fas fa-fire"></i> 320 kcal
                      </span>
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
