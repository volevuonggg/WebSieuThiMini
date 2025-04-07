import React, { useState, useEffect } from "react";
import './Xahang.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from '../../../../components/header/Header';
import Footer from '../../../../components/footer/Footer';

export default function Xahang() {
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
        setcategory(response.data.xahang);
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
          <h1>Giảm giá sốc</h1>
          <p>Khuyến mãi đặc biệt - Giá sốc mỗi ngày</p>
        </div>

        <div className="containercategory">
          <div className="leftcategory">
            <div className="damhmuccategory">
              <div className="categorynho">
                <ul className="list-group">
                  <li className="list-group-item"><Link to="/category/thucphamtuoi">Thực phẩm tươi</Link></li>
                  <li className="list-group-item"><Link to="/category/thucphamkho">Thực phẩm khô</Link></li>
                  <li className="list-group-item"><Link to="/category/doanvat">Đồ ăn vặt</Link></li>
                  <li className="list-group-item"><Link to="/category/combomoi">Combo mới</Link></li>
                  <li className="list-group-item"><Link to="/category/combogia">Combo giá sốc</Link></li>
                  <li className="list-group-item"><Link to="/category/combodacbiet">Combo đặc biệt</Link></li>
                  <li className="list-group-item"><Link to="/category/giamgia">Giảm giá</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rightcategory">
            <img 
              src="https://example.com/banner-giam-gia.jpg" 
              alt="Banner giảm giá sốc" 
              className="banner-image"
            />
            
            <div className="products-grid">
              {category.map(cate => (
                <div className="product-card" key={cate.id}>
                  <div className="product-badge">-50%</div>
                  <div className="product-badge-hot">HOT</div>
                  <img 
                    src={`${process.env.REACT_APP_BASEURL}/upload/${cate.hinhanh}`} 
                    alt={cate.title} 
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">
                      <Link to={`/Detail/${cate.title}/${cate.id}`}>{cate.title}</Link>
                    </h3>
                    <div className="product-price-wrapper">
                      <p className="product-price">{cate.gia}</p>
                      <p className="product-price-original">100.000đ</p>
                    </div>
                    <div className="product-sale-info">
                      <div className="sale-progress">
                        <div className="progress-bar" style={{width: '75%'}}></div>
                      </div>
                      <p className="sale-text">Đã bán 75%</p>
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
