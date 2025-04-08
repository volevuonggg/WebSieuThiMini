import { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import '../../style/admin.css'

export default function Dashboard() {
    const [data, setData] = useState({
        songuoidung: 0,
        sosanpham: 0,
        tongdonhang: 0,
        doanhthu: 0
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASEURL}/api/homedashboard`)
            .then((response) => {
                setData(response.data)
            })
            .catch(error => console.error('Error fetching dashboard data:', error));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Tổng quan hệ thống</h1>
                <p className="dashboard-date">{new Date().toLocaleDateString('vi-VN')}</p>
            </div>

            <div className="stats-container">
                <div className="stat-card users">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Người dùng</h3>
                        <p className="stat-number">{data.songuoidung}</p>
                    </div>
                </div>

                <div className="stat-card products">
                    <div className="stat-icon">
                        <i className="fas fa-box"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Sản phẩm</h3>
                        <p className="stat-number">{data.sosanpham}</p>
                    </div>
                </div>

                <div className="stat-card orders">
                    <div className="stat-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Đơn hàng</h3>
                        <p className="stat-number">{data.tongdonhang}</p>
                    </div>
                </div>

                <div className="stat-card revenue">
                    <div className="stat-icon">
                        <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <div className="stat-details">
                        <h3>Doanh thu</h3>
                        <p className="stat-number">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(data.doanhthu)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <h2>Biểu đồ thống kê</h2>
                <ChartComponent />
            </div>
        </div>
    );
}
