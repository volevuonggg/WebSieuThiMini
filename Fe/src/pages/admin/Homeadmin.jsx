import React, { useState } from 'react'
import '../../style/admin.css'

import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { useEffect } from 'react';
import axios from 'axios';

export default function Homeadmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log('Toggling sidebar'); // Thêm log để debug
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-wrapper">
      <Navbar />
      <div className="container-fluid" id="main">
        <div className="row">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <div className={`admin-main ${!isSidebarOpen ? 'expanded' : ''}`}>
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
