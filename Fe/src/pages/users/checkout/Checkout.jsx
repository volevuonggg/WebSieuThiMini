import React, { useState, useEffect } from "react";
import './Checkout.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData).user : null;
  const userId = user ? user.id : null;

  useEffect(() => {
    if (!userId) {
      navigate('/account/login');
      return;
    }

    axios.get(`${process.env.REACT_APP_BASEURL}/api/cart/${userId}`)
      .then((response) => {
        setCart(response.data);
        calculateTotal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, navigate]);

  const calculateTotal = (cartItems) => {
    const sum = cartItems.reduce((acc, item) => {
      return acc + (parseFloat(item.gia.replace(/[.,đ]/g, '')) * item.soluong);
    }, 0);
    setTotal(sum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    const orderData = {
      userId,
      name,
      phone,
      address,
      note,
      paymentMethod,
      items: cart,
      total
    };

    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/api/orders`, orderData);
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/cart/${userId}`);
      navigate('/order-success');
    } catch (error) {
      console.log(error);
      alert('Có lỗi xảy ra khi đặt hàng');
    }
  };

  return (
    <div className="wrapper">
      <Header />
      
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Thanh toán</h1>
          <p>Hoàn tất đơn hàng của bạn</p>
        </div>

        <div className="checkout-content">
          <div className="order-summary">
            <h2>Đơn hàng của bạn</h2>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image">
                    <img src={`${process.env.REACT_APP_BASEURL}/upload/${item.hinhanh}`} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <div className="item-meta">
                      <span className="item-weight">300g</span>
                      <span className="item-quantity">x {item.soluong}</span>
                    </div>
                    <p className="item-price">{item.gia}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="subtotal">
                <span>Tạm tính</span>
                <span>{total.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="shipping">
                <span>Phí vận chuyển</span>
                <span>30.000đ</span>
              </div>
              <div className="total">
                <span>Tổng cộng</span>
                <span>{(total + 30000).toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>

          <div className="checkout-form">
            <h2>Thông tin giao hàng</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ tên người nhận</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ tên người nhận"
                  required
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ giao hàng</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nhập địa chỉ giao hàng chi tiết"
                  required
                />
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                />
              </div>

              <div className="form-group">
                <label>Phương thức thanh toán</label>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="radio-label">Thanh toán khi nhận hàng</span>
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      value="banking"
                      checked={paymentMethod === "banking"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="radio-label">Chuyển khoản ngân hàng</span>
                  </label>
                </div>
              </div>

              <div className="checkout-actions">
                <Link to="/cart" className="back-to-cart">
                  Quay lại giỏ hàng
                </Link>
                <button type="submit" className="place-order">
                  Đặt hàng ({(total + 30000).toLocaleString('vi-VN')}đ)
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
