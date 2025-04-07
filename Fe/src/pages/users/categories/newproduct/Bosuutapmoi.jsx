import React, { useState, useEffect } from "react";
import './Bosuutapmoi.css';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function Bosuutapmoi() {
  const [category, setCategory] = useState([]);
  const [slsptgh, setSlsptgh] = useState(0);

  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  useEffect(() => {
    if (userId) {
      axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
        .then((response) => setSlsptgh(response.data))
        .catch((error) => console.log(error));
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/categoryproduct`)
      .then((response) => setCategory(response.data.bosuutapmoi))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="tieudecategory">
          <p>Trang chủ / <span>Sản phẩm mới</span></p>
        </div>
        <div className="containercategory">
          <div className="leftcategory">
            <div className="danhmuc">
              <h3>Danh mục sản phẩm</h3>
              <ul className="list-group">
                <li><a href="#">Đồ ăn</a></li>
                <li><a href="#">Đồ uống</a></li>
                <li><a href="#">Đồ tráng miệng</a></li>
              </ul>
            </div>
          </div>
          <div className="rightcategory">
            <img src="path/to/your/banner.jpg" alt="Banner" />
            <div className="categoryproduct">
              {category.map(cate => (
                <div className="food-item" key={cate.id}>
                  <img src={`${process.env.REACT_APP_BASEURL}/upload/${cate.hinhanh}`} alt={cate.title} />
                  <p className="food-title"><Link to={`/Detail/${cate.title}/${cate.id}`}>{cate.title}</Link></p>
                  <p className="food-price">{cate.gia} VNĐ</p>
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