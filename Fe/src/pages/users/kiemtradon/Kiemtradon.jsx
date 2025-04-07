import React, { useState, useEffect } from "react";
import './Kiemtradon.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { RiSearchLine } from 'react-icons/ri';
import { BsBoxSeam } from 'react-icons/bs';

export default function Kiemtradon() {
    const [slsptgh, setslsptgh] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleTrackOrder = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setOrders([
                {
                    id: 1,
                    date: '2024-04-04',
                    status: 'Đang giao hàng',
                    total: '1,250,000đ',
                    items: ['Thịt bò Úc', 'Rau củ tươi', 'Trái cây nhập khẩu']
                },
                {
                    id: 2,
                    date: '2024-04-03',
                    status: 'Đã giao hàng',
                    total: '850,000đ',
                    items: ['Hải sản tươi', 'Gia vị', 'Đồ uống']
                }
            ]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="wrapper">
            <Header />
            
            <div className="tracking-container">
                <div className="tracking-header">
                    <h1>Theo dõi đơn hàng</h1>
                    <p>Kiểm tra trạng thái đơn hàng của bạn một cách dễ dàng</p>
                </div>

                <div className="tracking-content">
                    <div className="tracking-form">
                        <div className="search-icon">
                            <RiSearchLine />
                        </div>
                        <form onSubmit={handleTrackOrder}>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Số điện thoại đặt hàng</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Nhập số điện thoại của bạn"
                                    required
                                />
                            </div>
                            <button type="submit" className="track-button">
                                {loading ? 'Đang tìm kiếm...' : 'Theo dõi đơn hàng'}
                            </button>
                        </form>
                    </div>

                    {orders.length > 0 && (
                        <div className="orders-list">
                            <h2>Lịch sử đơn hàng</h2>
                            <div className="orders-grid">
                                {orders.map((order) => (
                                    <div key={order.id} className="order-card">
                                        <div className="order-header">
                                            <BsBoxSeam className="order-icon" />
                                            <div className="order-info">
                                                <span className="order-date">{order.date}</span>
                                                <span className={`order-status ${order.status === 'Đã giao hàng' ? 'delivered' : 'processing'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="order-items">
                                            <h4>Sản phẩm đã đặt:</h4>
                                            <ul>
                                                {order.items.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="order-total">
                                            <span>Tổng tiền:</span>
                                            <span className="total-amount">{order.total}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
