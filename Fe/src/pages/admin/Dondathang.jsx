import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaBox } from 'react-icons/fa';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../style/admin.css';

export default function Dondathang() {
  const [dh, setDh] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/dondathang`);
      setDh(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const details = {};
      for (const order of dh) {
        if (order.sanpham) {
          console.log(`Fetching details for order ${order.id}:`, order.sanpham);
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_BASEURL}/api/chitietdonhang/${order.id}`
            );
            console.log(`Response for order ${order.id}:`, response.data);
            details[order.id] = response.data;
          } catch (error) {
            console.error(`Error fetching details for order ${order.id}:`, error);
            if (order.sanpham) {
              console.log(`Using fallback for order ${order.id}`);
              details[order.id] = order.sanpham.split(',').map(item => ({
                title: item.trim(),
                soluong: 1
              }));
            }
          }
        }
      }
      console.log('Final details object:', details);
      setOrderDetails(details);
    };

    if (dh.length > 0) {
      fetchOrderDetails();
    }
  }, [dh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/admindeletedondathang/${id}`);
      fetchData();
      alert('Xóa sản phẩm thành công');
    } catch (error) {
      console.log(error);
    }
  };

  const handleTinhTrangDonChange = async (id, selectedOption) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASEURL}/api/update-tinhtrangdon/${id}`, {
        tinhtrangdon: selectedOption,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = async (e, id) => {
    const selectedOption = e.target.value;
    await handleTinhTrangDonChange(id, selectedOption);
    fetchData();
  };

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-container">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className={`content-wrapper ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="page-header">
            <h2>
              <FaBox className="header-icon" />
              Quản lý đơn hàng
            </h2>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Danh sách đơn hàng</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Họ tên</th>
                      <th>Địa chỉ</th>
                      <th>Khu vực</th>
                      <th>Liên hệ</th>
                      <th>Thông tin thêm</th>
                      <th>Thời gian</th>
                      <th>Thanh toán</th>
                      <th>Sản phẩm đặt</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dh.map((donhang) => (
                      <tr key={donhang.id}>
                        <td>{donhang.id}</td>
                        <td>{donhang.hovaten}</td>
                        <td>{donhang.diachi}</td>
                        <td>
                          <div className="address-info">
                            <span>{donhang.tinh}</span>
                            <span>{donhang.quanhuyen}</span>
                            <span>{donhang.phuongxa}</span>
                          </div>
                        </td>
                        <td>{donhang.sdt}</td>
                        <td>{donhang.thongtinbosung || '-'}</td>
                        <td>{new Date(donhang.created_at).toLocaleDateString('vi-VN')}</td>
                        <td>{donhang.pttt}</td>
                        <td>
                          <div className="order-items">
                            {donhang.sanpham ? (
                              orderDetails[donhang.id] ? (
                                orderDetails[donhang.id].map((item, index) => (
                                  <div key={index} className="order-item">
                                    <span className="item-name">{item.title}</span>
                                    <span className="item-quantity">x{item.soluong}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="order-item">
                                  <span className="item-name">{donhang.sanpham}</span>
                                </div>
                              )
                            ) : (
                              <span className="no-items">Không có sản phẩm</span>
                            )}
                          </div>
                        </td>
                        <td className="order-total">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(donhang.thanhtien || 0)}
                        </td>
                        <td>
                          <select
                            className={`status-select ${donhang.tinhtrangdon}`}
                            value={donhang.tinhtrangdon}
                            onChange={(e) => handleSelectChange(e, donhang.id)}
                          >
                            <option value="cho-duyet">Chờ duyệt</option>
                            <option value="dang-giao-hang">Đang giao hàng</option>
                            <option value="da-giao">Đã giao</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(donhang.id)}
                            className="btn btn-danger btn-sm"
                            title="Xóa đơn hàng"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="9" className="text-right"><strong>Tổng doanh thu:</strong></td>
                      <td className="order-total">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(dh.reduce((total, order) => total + (order.thanhtien || 0), 0))}
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

