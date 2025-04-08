import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUserCircle } from 'react-icons/fa';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../style/admin.css';

export default function Thongtinkh() {
  const [data, setdata] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/thongtinkhachhang`)
      .then((response) => {
        setdata(response.data);
      })
  }, []);

  const handledelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      axios.delete(`${process.env.REACT_APP_BASEURL}/api/thongtinkhachhang/${id}`)
        .then(() => {
          alert('Xóa thành công');
          setdata(data.filter(item => item.id !== id));
        });
    }
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
              <FaUserCircle className="header-icon" />
              Danh Sách Người Dùng
            </h2>
            <p>Tổng số người dùng: {data.length}</p>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Họ Tên</th>
                  <th>Số Điện Thoại</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.sdt}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handledelete(user.id)}
                        title="Xóa người dùng"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
