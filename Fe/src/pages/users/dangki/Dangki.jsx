import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import './Dangki.css';

export default function Dangki() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");  
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  async function save(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('hoten', name);
      formData.append('sodt', sdt);
      formData.append('email', email);
      formData.append('matkhau', password);

      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/dkdn`, formData);
      if (response.data.error) {
        console.log(response.data.error);
        setErrorMessage(response.data.error);
      } else {
        alert("Đăng kí tài khoản thành công");
        setname("");
        setsdt("");
        setemail("");
        setpassword("");
        navigate('/account/login');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h2>ĐĂNG KÍ</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={save}>
              <div className="form-group">
                <label htmlFor="usr">Họ và tên *</label>
                <input 
                  value={name} 
                  onChange={(e)=>setname(e.target.value)} 
                  required 
                  type="text" 
                  className="form-control" 
                  id="usr"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Số điện thoại *</label>
                <input 
                  value={sdt} 
                  onChange={(e)=>setsdt(e.target.value)} 
                  type="text" 
                  className="form-control" 
                  id="address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  value={email} 
                  onChange={(e)=>setemail(e.target.value)} 
                  required 
                  type="email" 
                  className="form-control" 
                  id="email"
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
              </div>
             
              <div className="form-group">
                <label htmlFor="pwd">Mật khẩu *</label>
                <input 
                  value={password} 
                  onChange={(e)=>setpassword(e.target.value)} 
                  required 
                  type="password" 
                  className="form-control" 
                  id="pwd"
                />
              </div>
             
              <button type="submit" className="btn-success">Đăng ký</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
