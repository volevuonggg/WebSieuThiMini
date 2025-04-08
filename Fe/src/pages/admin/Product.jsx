import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaBox, FaPlus } from 'react-icons/fa';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../style/admin.css';

export default function Product() {
  const [hinhanh, sethinhanh] = useState("");
  const [title, settitle] = useState("");
  const [gia, setgia] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [product, setproduct] = useState([]);
  const [danhmuc, setdanhmuc] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Thêm state mới

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/product`)
      .then((response) => {
        setproduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/thuocdanhmuc`)
      .then((response) => {
        setdanhmuc(response.data);
      });
  }, []);

  const xoasp = (id) => {
    axios.delete(`${process.env.REACT_APP_BASEURL}/api/deleteproduct/${id}`)
      .then((response) => {
        window.location.reload();
        alert('xóa sản phẩm thành công');
      });
  };

  async function save(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('hinhanh', event.target.hinhanh.files[0]);
      formData.append('title', title);
      formData.append('gia', gia);
      formData.append('category_id', category_id);
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/add_product`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      alert("Product added successfully");
      sethinhanh("");
      settitle("");
      setgia("");
      setcategory_id("");
      window.location.reload();
    } catch (err) {
      alert("Failed to add product");
    }
  }

  // Thêm hàm lọc sản phẩm
  const filteredProducts = selectedCategory === 'all'
    ? product
    : product.filter(pro => pro.category_id === parseInt(selectedCategory));

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
              Quản lý sản phẩm
            </h2>
          </div>

          <div className="card">
            <div className="card-header">
              <h3><FaPlus className="card-icon" /> Thêm sản phẩm mới</h3>
            </div>
            <div className="card-body">
              <form onSubmit={save}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="hinhanh">Hình Ảnh</label>
                    <input
                      type="file"
                      name="hinhanh"
                      className="form-control-file"
                      id="hinhanh"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="title">Tên Sản Phẩm</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      placeholder="Nhập tên sản phẩm"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="gia">Giá</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gia"
                      value={gia}
                      onChange={(e) => setgia(e.target.value)}
                      placeholder="Nhập giá tiền"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="category_id">Danh mục</label>
                    <select
                      className="form-control"
                      id="category_id"
                      value={category_id}
                      onChange={(e) => setcategory_id(e.target.value)}
                      required
                    >
                      <option value="">Chọn danh mục...</option>
                      {danhmuc.map((dm) => (
                        <option key={dm.id} value={dm.id}>{dm.namecategory}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  <FaPlus /> Thêm Sản Phẩm
                </button>
              </form>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <div className="products-header">
                <h3>Danh sách sản phẩm</h3>
                <div className="category-filter">
                  <select
                    className="form-control"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">Tất cả danh mục</option>
                    {danhmuc.map((dm) => (
                      <option key={dm.id} value={dm.id}>
                        {dm.namecategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá thành</th>
                      <th>Danh mục</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((pro) => (
                      <tr key={pro.id}>
                        <td>{pro.id}</td>
                        <td>
                          <img
                            src={`${process.env.REACT_APP_BASEURL}/upload/${pro.hinhanh}`}
                            alt={pro.title}
                            className="product-thumbnail"
                          />
                        </td>
                        <td>{pro.title}</td>
                        <td>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(pro.gia)}
                        </td>
                        <td>
                          {danhmuc.find(dm => dm.id === pro.category_id)?.namecategory || 'N/A'}
                        </td>
                        <td>
                          <button
                            onClick={() => xoasp(pro.id)}
                            className="btn btn-danger btn-sm"
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
      </div>
    </div>
  );
}
