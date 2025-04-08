import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../../style/admin.css';

export default function Navbar() {
    const handleLogout = () => {
        // Thêm logic đăng xuất ở đây
        localStorage.removeItem('adminData');
        window.location.href = '/admin/dangnhap';
    };

    return (
        <nav className="admin-navbar">
            <div className="navbar-brand">
                <Link to="/admin">
                    Trang Quản Trị
                </Link>
            </div>

            <div className="navbar-right">
                <div className="admin-info">
                    <FaUser className="admin-icon" />
                    <span>Admin</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    <FaSignOutAlt />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </nav>
    );
}
