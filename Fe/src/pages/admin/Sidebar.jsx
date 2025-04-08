import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/admin.css'

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className="sidebar-container">
      {/* Đặt nút toggle ở đây, ngoài sidebar */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        type="button"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar" role="navigation">
        <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3">
          <li className="nav-item mb-2 mt-3">
            <Link to="/homeadmin" className="nav-link">
              <h5>Admin Dashboard</h5>
            </Link>
          </li>

          <li className="nav-item mb-2">
            <a className="nav-link" href="#submenu1" data-toggle="collapse" data-target="#submenu1">
              <i className="fas fa-boxes"></i>
              <span className="ml-3">Danh mục sản phẩm</span>
            </a>
            <ul className="list-unstyled flex-column pl-3 collapse" id="submenu1">
              <li className="nav-item mb-2">
                <Link to="/admin/Product" className="nav-link">
                  <i className="fas fa-plus-circle"></i> Thêm sản phẩm mới
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Detail_product" className="nav-link">
                  <i className="fas fa-info-circle"></i> Chi tiết sản phẩm
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item mb-2">
            <Link to="/Dondathang" className="nav-link">
              <i className="fas fa-shopping-cart"></i>
              <span className="ml-3">Danh sách đơn hàng</span>
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/thongtinkhachhang" className="nav-link">
              <i className="fas fa-users"></i>
              <span className="ml-3">Thông tin người dùng</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
