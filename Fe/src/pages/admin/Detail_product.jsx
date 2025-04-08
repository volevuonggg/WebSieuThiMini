import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FaBox, FaPlus, FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import '../../style/admin.css';

export default function Detail_product() {
  const [danhmucsp, setdanhmucsp] = useState([]);
  const [tinhtrangsp, settinhtrangsp] = useState("");
  const [chatlieusp, setchatlieusp] = useState("");
  const [themanhsp, setthemanhsp] = useState("");
  const [product_id, setproduct_id] = useState("");
  const [error, setError] = useState('');
  const [detailproduct, setdetailproduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    tinhtrang: '',
    chatlieu: '',
    themanhsp: ''
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handledelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BASEURL}/api/detail_product/${id}`)
      .then((response) => {
        window.location.reload();
        alert('xóa sản phẩm thành công');
      });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      tinhtrang: product.tinhtrang,
      chatlieu: product.chatlieu,
      themanhsp: product.themanhsp
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      tinhtrang: '',
      chatlieu: '',
      themanhsp: ''
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASEURL}/api/detail_product/${id}`, editForm);

      if (response.data) {
        // Cập nhật state local
        setdetailproduct(detailproduct.map(item =>
          item.id === id ? { ...item, ...editForm } : item
        ));

        setEditingId(null);
        setEditForm({
          tinhtrang: '',
          chatlieu: '',
          themanhsp: ''
        });

        alert('Cập nhật thành công!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Có lỗi xảy ra khi cập nhật! ' + error.message);
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/detaildanhmuc`)
      .then((response) => {
        setdanhmucsp(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/detailthongtin`)
      .then((response) => {
        setdetailproduct(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/thuocdanhmuc`)
      .then((response) => {
        setCategories(response.data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = danhmucsp.filter(
        product => product.category_id === parseInt(selectedCategory)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
    setproduct_id(''); // Reset product selection when category changes
  }, [selectedCategory, danhmucsp]);

  const filteredDetailProducts = selectedCategory
    ? detailproduct.filter(detail => {
      const product = danhmucsp.find(p => p.id === detail.product_id);
      return product && product.category_id === parseInt(selectedCategory);
    })
    : detailproduct;

  async function save(event) {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append('product_id', product_id);
      formData.append('tinhtrang', tinhtrangsp);
      formData.append('chatlieu', chatlieusp);
      formData.append('themanhsp', themanhsp);
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/add_detail`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
      alert("Product added successfully");
      setproduct_id("");
      setthemanhsp("");
      setchatlieusp("");
      settinhtrangsp("");
      setError('');
      window.location.reload();

    } catch (err) {
      setError('Product details already exist, please edit or delete below');
    }
  }

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
              Chi tiết sản phẩm
            </h2>
          </div>

          <div className="card">
            <div className="card-header">
              <h3><FaPlus className="card-icon" /> Thêm chi tiết sản phẩm</h3>
            </div>
            <div className="card-body">
              <form onSubmit={save}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Chọn danh mục</label>
                    <select
                      className="form-control"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      required
                    >
                      <option value="">Chọn danh mục...</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.namecategory}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label>Chọn sản phẩm</label>
                    <select
                      className="form-control"
                      value={product_id}
                      onChange={(e) => setproduct_id(e.target.value)}
                      required
                      disabled={!selectedCategory}
                    >
                      <option value="">Chọn sản phẩm...</option>
                      {filteredProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Tình trạng</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tình trạng sản phẩm"
                      value={tinhtrangsp}
                      onChange={(e) => settinhtrangsp(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Mô tả</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập mô tả sản phẩm"
                      value={chatlieusp}
                      onChange={(e) => setchatlieusp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Thế mạnh sản phẩm</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập thế mạnh sản phẩm"
                    value={themanhsp}
                    onChange={(e) => setthemanhsp(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <FaPlus /> Thêm chi tiết
                </button>
              </form>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <div className="list-header">
                <h3>Danh sách chi tiết sản phẩm</h3>
                <div className="filter-section">
                  <select
                    className="form-control"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Tất cả danh mục</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.namecategory}
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
                      <th>Sản phẩm</th>
                      <th>Tình trạng</th>
                      <th>Chất liệu</th>
                      <th>Thế mạnh</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDetailProducts.map((pro) => (
                      <tr key={pro.id}>
                        <td>
                          {danhmucsp.find(p => p.id === pro.product_id)?.title || 'N/A'}
                        </td>
                        <td>
                          {editingId === pro.id ? (
                            <input
                              type="text"
                              className="form-control"
                              value={editForm.tinhtrang}
                              onChange={(e) => setEditForm({ ...editForm, tinhtrang: e.target.value })}
                            />
                          ) : (
                            pro.tinhtrang
                          )}
                        </td>
                        <td>
                          {editingId === pro.id ? (
                            <input
                              type="text"
                              className="form-control"
                              value={editForm.chatlieu}
                              onChange={(e) => setEditForm({ ...editForm, chatlieu: e.target.value })}
                            />
                          ) : (
                            pro.chatlieu
                          )}
                        </td>
                        <td>
                          {editingId === pro.id ? (
                            <input
                              type="text"
                              className="form-control"
                              value={editForm.themanhsp}
                              onChange={(e) => setEditForm({ ...editForm, themanhsp: e.target.value })}
                            />
                          ) : (
                            pro.themanhsp
                          )}
                        </td>
                        <td>
                          {editingId === pro.id ? (
                            <div className="btn-group">
                              <button
                                onClick={() => handleUpdate(pro.id)}
                                className="btn btn-success btn-sm"
                                title="Lưu"
                              >
                                <FaSave />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="btn btn-secondary btn-sm ml-1"
                                title="Hủy"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          ) : (
                            <div className="btn-group">
                              <button
                                onClick={() => handleEdit(pro)}
                                className="btn btn-primary btn-sm"
                                title="Sửa"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handledelete(pro.id)}
                                className="btn btn-danger btn-sm ml-1"
                                title="Xóa"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          )}
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
