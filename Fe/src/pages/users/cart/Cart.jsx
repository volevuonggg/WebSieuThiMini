import React, { useState, useEffect } from "react";
import { AiFillCaretDown } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from "axios";
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import './Cart.css';

export default function Cart() {
  const [slsptgh, setSlsptgh] = useState(0);
  const [cart, setCart] = useState([]);
  const [tongcart, setTongcart] = useState(0);
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    // Chuyển đổi giá trị sang số và làm tròn
    const roundedPrice = Math.round(Number(price));
    // Định dạng số với dấu phẩy, không hiển thị phần thập phân
    return new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0 }).format(roundedPrice) + 'đ';
  };

  useEffect(() => {
    if (userId) {
      // Fetch số lượng sản phẩm trong giỏ hàng
      axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
        .then((response) => setSlsptgh(response.data))
        .catch((error) => console.log(error));

      // Fetch giỏ hàng
      axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/homecart`)
        .then((response) => {
          // Kiểm tra và chuẩn hóa dữ liệu từ API
          const normalizedCart = response.data.map(item => {
            // Nếu giá hoặc tổng bị nhân nhầm với 1000, chia lại
            const gia = Number(item.gia) >= 1000000 ? Number(item.gia) / 1000 : Number(item.gia);
            const tong = Number(item.tong) >= 1000000 ? Number(item.tong) / 1000 : Number(item.tong);
            return { ...item, gia, tong };
          });

          setCart(normalizedCart);
          // Tính tổng giỏ hàng
          const total = normalizedCart.reduce((acc, product) => {
            return acc + Number(product.tong);
          }, 0);
          setTongcart(total);
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_BASEURL}/api/deletecart/${id}`)
      .then((response) => {
        window.location.reload();
        alert('Đã xóa sản phẩm khỏi giỏ hàng');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="cart-container">
          <h1>Giỏ hàng của bạn</h1>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Giỏ hàng của bạn đang trống</p>
              <Link to="/" className="continue-shopping">Tiếp tục mua sắm</Link>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>SẢN PHẨM</th>
                      <th>THÔNG TIN SẢN PHẨM</th>
                      <th>GIÁ</th>
                      <th>SỐ LƯỢNG</th>
                      <th>TỔNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((giohang) => (
                      <tr key={giohang.id}>
                        <td>
                          <button
                            onClick={() => handleDelete(giohang.id)}
                            className="delete-btn"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_BASEURL}/upload/${giohang.product?.hinhanh}`}
                            alt={giohang.title}
                            className="product-image"
                          />
                        </td>
                        <td>
                          <span className="product-title">{giohang.title}</span>
                        </td>
                        <td className="product-price">{formatPrice(giohang.gia)}</td>
                        <td className="product-quantity">{giohang.soluong}</td>
                        <td className="product-total">{formatPrice(giohang.tong)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cart-summary">
                <h2>CỘNG GIỎ HÀNG</h2>
                <div className="summary-content">
                  <div className="summary-row">
                    <span>Giảm giá đơn hàng</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng</span>
                    <span className="total-amount">{formatPrice(tongcart)}</span>
                  </div>
                  <Link to="/Thanhtoan" className="checkout-btn">
                    TIẾN HÀNH THANH TOÁN
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}