"use client"

import { useState, useEffect } from "react"
import "./Home.css"
import Header from "../../../components/header/Header"
import Footer from "../../../components/footer/Footer"
import { HiShoppingCart } from "react-icons/hi"
import { BsFillAlarmFill } from "react-icons/bs"
import { FaLock } from "react-icons/fa"
import { AiOutlineComment } from "react-icons/ai"
import { Link } from "react-router-dom"
import axios from "axios"
import bannerImage from "../../../assets/users/banner/banner-homepage.png"
import feedbackUser1 from '../../../assets/users/feedback-user/feedback-user-1.png';
import feedbackUser2 from '../../../assets/users/feedback-user/feedback-user-2.png';
import feedbackUser3 from '../../../assets/users/feedback-user/feedback-user-3.png';
import news1 from '../../../assets/users/news-homepage/news-1.png';
import news2 from '../../../assets/users/news-homepage/news-2.png';
import news3 from '../../../assets/users/news-homepage/news-3.png';

export default function Home() {
  const [thucphamtuoisong, setthucphamtuoisong] = useState([])
  const [raucuqua, setraucuqua] = useState([])
  const [douonggiaikhat, setDouonggiaikhat] = useState([])
  const [thucphamanlien, setthucphamanlien] = useState([])
  const [loading, setLoading] = useState(true)

  const userData = localStorage.getItem("userData")
  const user = userData ? JSON.parse(userData).user : null
  const userId = user ? user.id : null

  const [slsptgh, setslsptgh] = useState(0)

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const addToCart = async (product) => {
    if (!userId) {
      alert("Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("gia", product.gia);
      formData.append("soluong", 1);
      formData.append("tong", product.gia * 1000);
      formData.append("product_id", product.id);
      formData.append("size", "Không có");
      formData.append("dkdn_id", userId);

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/cart/${userId}`,
        formData,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );

      if (response.data.message) {
        alert("Sản phẩm đã có trong giỏ hàng");
      } else {
        alert("Thêm sản phẩm thành công");
        // Update cart count without page reload
        const cartCountResponse = await axios.get(
          `${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`
        );
        setslsptgh(cartCountResponse.data);
      }
    } catch (err) {
      alert("Đã xảy ra lỗi, vui lòng thử lại");
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
      .then((response) => {
        setslsptgh(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/index`)
      .then((response) => {
        console.log("API Response:", response.data);
        console.log("Thuc pham an lien data:", response.data.thucphamanlien);
        setthucphamtuoisong(response.data.thucphamtuoisong)
        setraucuqua(response.data.raucuqua)
        setDouonggiaikhat(response.data.douonggiaikhat)
        setthucphamanlien(response.data.thucphamanlien)
        setLoading(false)
      })
      .catch((error) => {
        console.log("API Error:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="wrapper">
        <Header />
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Đang tải...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="wrapper">
      <Header />

      <main className="main-content">
        <div className="hero-section">
          <img className="hero-image" src={bannerImage || "/placeholder.svg"} alt="Banner siêu thị thực phẩm" />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Thực phẩm tươi ngon mỗi ngày</h1>
              <p>Giao hàng tận nơi - Đảm bảo chất lượng - Giá cả hợp lý</p>
              <Link to="/" className="hero-button">
                Mua sắm ngay
              </Link>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-item">
            <div className="feature-icon">
              <HiShoppingCart />
            </div>
            <div className="feature-content">
              <h3>Miễn phí vận chuyển</h3>
              <p>Miễn phí vận chuyển cho đơn hàng từ 300K trong khu vực nội thành</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <BsFillAlarmFill />
            </div>
            <div className="feature-content">
              <h3>Giao hàng nhanh 2h</h3>
              <p>Giao hàng nhanh trong vòng 2h cho khu vực nội thành</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <FaLock />
            </div>
            <div className="feature-content">
              <h3>Thanh toán an toàn</h3>
              <p>Đảm bảo an toàn với nhiều hình thức thanh toán</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <AiOutlineComment />
            </div>
            <div className="feature-content">
              <h3>Hỗ trợ 24/7</h3>
              <p>Đội ngũ hỗ trợ khách hàng luôn sẵn sàng phục vụ</p>
            </div>
          </div>
        </div>

        <section className="products-section">
          <div className="section-title">
            <h2>Thực phẩm tươi ngon</h2>
            <div className="section-divider"></div>
            <Link to="/category/thucphamtuoisong" className="view-all-link">
              Xem tất cả
            </Link>
          </div>
          <div className="products-grid">
            {thucphamtuoisong && thucphamtuoisong.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={`${process.env.REACT_APP_BASEURL}/upload/${product.hinhanh}`}
                    alt={product.title}
                  />
                  <div className="product-overlay">
                    <Link to={`/Detail/${product.title}/${product.id}`} className="view-product-btn">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">
                    <Link to={`/Detail/${product.title}/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="product-price">{formatPrice(product.gia)}đ</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    <HiShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="products-section">
          <div className="section-title">
            <h2>Rau - Củ - Quả</h2>
            <div className="section-divider"></div>
            <Link to="/category/raucuqua" className="view-all-link">
              Xem tất cả
            </Link>
          </div>
          <div className="products-grid">
            {raucuqua && raucuqua.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={`${process.env.REACT_APP_BASEURL}/upload/${product.hinhanh}`}
                    alt={product.title}
                  />
                  <div className="product-overlay">
                    <Link to={`/Detail/${product.title}/${product.id}`} className="view-product-btn">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">
                    <Link to={`/Detail/${product.title}/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="product-price">{formatPrice(product.gia)}đ</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    <HiShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="products-section">
          <div className="section-title">
            <h2>Đồ Uống Giải Khát</h2>
            <div className="section-divider"></div>
            <Link to="/category/douonggiaikhat" className="view-all-link">
              Xem tất cả
            </Link>
          </div>
          <div className="products-grid">
            {douonggiaikhat && douonggiaikhat.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={`${process.env.REACT_APP_BASEURL}/upload/${product.hinhanh}`}
                    alt={product.title}
                  />
                  <div className="product-overlay">
                    <Link to={`/Detail/${product.title}/${product.id}`} className="view-product-btn">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">
                    <Link to={`/Detail/${product.title}/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="product-price">{formatPrice(product.gia)}đ</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    <HiShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="products-section">
          <div className="section-title">
            <h2>Thực phẩm ăn liền</h2>
            <div className="section-divider"></div>
            <Link to="/category/thucphamanlien" className="view-all-link">
              Xem tất cả
            </Link>
          </div>
          <div className="products-grid">
            {thucphamanlien && thucphamanlien.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={`${process.env.REACT_APP_BASEURL}/upload/${product.hinhanh}`}
                    alt={product.title}
                  />
                  <div className="product-overlay">
                    <Link to={`/Detail/${product.title}/${product.id}`} className="view-product-btn">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">
                    <Link to={`/Detail/${product.title}/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="product-price">{formatPrice(product.gia)}đ</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    <HiShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section className="testimonials-section">
          <div className="section-title">
            <h2>Khách hàng nói gì về chúng tôi</h2>
            <div className="section-divider"></div>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar-container">
                <img className="testimonial-avatar" src={feedbackUser1} alt="Khách hàng 1" />
              </div>
              <div className="testimonial-rating">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="testimonial-text">
                "Thực phẩm tươi ngon, giao hàng nhanh và đóng gói cẩn thận! Tôi rất hài lòng với dịch vụ."
              </p>
              <strong className="testimonial-name">Nguyễn Thị Lan Chi</strong>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar-container">
                <img className="testimonial-avatar" src={feedbackUser2} alt="Khách hàng 2" />
              </div>
              <div className="testimonial-rating">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="testimonial-text">
                "Đặt hàng rất tiện lợi, nhân viên tư vấn nhiệt tình. Sẽ tiếp tục ủng hộ!"
              </p>
              <strong className="testimonial-name">Phạm Văn Hùng</strong>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar-container">
                <img className="testimonial-avatar" src={feedbackUser3} alt="Khách hàng 3" />
              </div>
              <div className="testimonial-rating">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="testimonial-text">
                "Giá cả hợp lý, chất lượng sản phẩm rất tốt. Đã mua nhiều lần và luôn hài lòng."
              </p>
              <strong className="testimonial-name">Đỗ Quang Huy</strong>
            </div>
          </div>
        </section>

        <section className="news-section">
          <div className="section-title">
            <h2>Tin tức & Khuyến mãi</h2>
            <div className="section-divider"></div>
          </div>
          <div className="news-grid">
            <div className="news-card">
              <div className="news-image-container">
                <img src={news1} alt="Tin tức 1" className="news-image" />
              </div>
              <div className="news-content">
                <span className="news-date">15/04/2023</span>
                <h3 className="news-title">Mẹo bảo quản rau củ tươi lâu trong tủ lạnh</h3>
                <p className="news-excerpt">
                  Khám phá những bí quyết giúp rau củ luôn tươi ngon dù để trong tủ lạnh nhiều ngày...
                </p>
                <Link to="/news/1" className="news-read-more">
                  Đọc tiếp
                </Link>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image-container">
                <img src={news2} alt="Tin tức 2" className="news-image" />
              </div>
              <div className="news-content">
                <span className="news-date">10/04/2023</span>
                <h3 className="news-title">Khuyến mãi tháng 4: Giảm 20% cho đơn hàng trên 500K</h3>
                <p className="news-excerpt">Cơ hội không thể bỏ lỡ để mua sắm thực phẩm chất lượng với giá ưu đãi...</p>
                <Link to="/news/2" className="news-read-more">
                  Đọc tiếp
                </Link>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image-container">
                <img src={news3} alt="Tin tức 3" className="news-image" />
              </div>
              <div className="news-content">
                <span className="news-date">05/04/2023</span>
                <h3 className="news-title">5 công thức nấu ăn đơn giản từ rau củ quả sạch</h3>
                <p className="news-excerpt">Những món ăn ngon miệng, bổ dưỡng có thể chế biến nhanh chóng tại nhà...</p>
                <Link to="/news/3" className="news-read-more">
                  Đọc tiếp
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="subscribe-section">
          <div className="subscribe-container">
            <div className="subscribe-content">
              <h2>Đăng ký nhận thông tin</h2>
              <p>Nhận thông tin về sản phẩm mới và khuyến mãi hấp dẫn</p>
            </div>
            <div className="subscribe-form">
              <input type="email" placeholder="Nhập email của bạn" className="subscribe-input" />
              <button className="subscribe-button">Đăng ký</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

