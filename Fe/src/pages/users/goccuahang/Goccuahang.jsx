import { useEffect, useRef, useState } from "react"
import "./Goccuahang.css"
import { Link } from "react-router-dom"
import Header from "../../../components/header/Header"
import Footer from "../../../components/footer/Footer"
import heroImage from "../../../assets/users/goccuahang/hero-image.jpg"
import storyImage from "../../../assets/users/goccuahang/store-story.jpg"
import vegetables from "../../../assets/users/goccuahang/vegetables.jpg"
import drinks from "../../../assets/users/goccuahang/drinks.jpg"
import thucphamanlien from "../../../assets/users/goccuahang/thucphamanlien.jpg"
import thucphamtuoisong from "../../../assets/users/goccuahang/thucphamtuoisong.jpg"
import camketImage from "../../../assets/users/goccuahang/camket.png"
import storeImage1 from "../../../assets/users/goccuahang/ch1.jpg"
import storeImage2 from "../../../assets/users/goccuahang/ch2.jpg"
import storeImage3 from "../../../assets/users/goccuahang/ch3.jpg"
import storeImage4 from "../../../assets/users/goccuahang/ch4.jpg"


export default function Goccuahang() {
    const [isVisible, setIsVisible] = useState({
        about: false,
        products: false,
        features: false,
        testimonials: false,
        location: false,
    })

    const aboutRef = useRef(null)
    const productsRef = useRef(null)
    const featuresRef = useRef(null)
    const testimonialsRef = useRef(null)
    const locationRef = useRef(null)


    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        }


        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id
                    setIsVisible((prev) => ({ ...prev, [sectionId]: true }))
                }
            })
        }


        const observer = new IntersectionObserver(observerCallback, observerOptions)


        if (aboutRef.current) observer.observe(aboutRef.current)
        if (productsRef.current) observer.observe(productsRef.current)
        if (featuresRef.current) observer.observe(featuresRef.current)
        if (testimonialsRef.current) observer.observe(testimonialsRef.current)
        if (locationRef.current) observer.observe(locationRef.current)


        return () => {
            if (aboutRef.current) observer.unobserve(aboutRef.current)
            if (productsRef.current) observer.unobserve(productsRef.current)
            if (featuresRef.current) observer.unobserve(featuresRef.current)
            if (testimonialsRef.current) observer.unobserve(testimonialsRef.current)
            if (locationRef.current) observer.unobserve(locationRef.current)
        }
    }, [])


    const productCategories = [
        {
            name: "Rau củ tươi ngon",
            image: vegetables,
            description: "Rau củ tươi ngon, được trồng theo phương pháp hữu cơ, đảm bảo an toàn cho sức khỏe.",
        },
        {
            name: "Đồ uống giải khát",
            image: drinks,
            description: "Đồ uống tươi mát, bổ sung năng lượng cho ngày dài",
        },
        {
            name: "Thực phẩm ăn liền",
            image: thucphamanlien,
            description: "Thực phẩm ăn liền tiện lợi, dễ chế biến, phù hợp cho những ngày bận rộn.",
        },
        {
            name: "Thực phẩm tươi sống",
            image: thucphamtuoisong,
            description: "Thực phẩm tươi sống, được chọn lọc kỹ càng từ các nhà cung cấp uy tín.",
        },
    ]


    const features = [
        {
            icon: "🌱",
            title: "Sản phẩm hữu cơ",
            description: "Chúng tôi cam kết cung cấp các sản phẩm hữu cơ, không thuốc trừ sâu, an toàn cho sức khỏe.",
        },
        {
            icon: "🚚",
            title: "Giao hàng nhanh chóng",
            description:
                "Dịch vụ giao hàng nhanh chóng, đảm bảo thực phẩm đến tay khách hàng trong tình trạng tươi ngon nhất.",
        },
        {
            icon: "💯",
            title: "Cam kết chất lượng",
            description: "Chúng tôi cam kết về chất lượng sản phẩm, nếu không hài lòng, bạn có thể đổi trả trong vòng 24h.",
        },
        {
            icon: "🌍",
            title: "Thân thiện môi trường",
            description: "Sử dụng bao bì thân thiện với môi trường, góp phần bảo vệ hành tinh xanh.",
        },
    ]


    const testimonials = [
        {
            name: "Nguyễn Văn A",
            avatar: `${process.env.REACT_APP_BASEURL}/upload/avatar1.jpg`,
            comment: "Tôi rất hài lòng với chất lượng thực phẩm tại cửa hàng. Rau củ luôn tươi ngon và đảm bảo vệ sinh.",
            rating: 5,
        },
        {
            name: "Trần Thị B",
            avatar: `${process.env.REACT_APP_BASEURL}/upload/avatar2.jpg`,
            comment: "Dịch vụ giao hàng nhanh chóng, nhân viên thân thiện. Sẽ tiếp tục ủng hộ cửa hàng.",
            rating: 4,
        },
        {
            name: "Lê Văn C",
            avatar: `${process.env.REACT_APP_BASEURL}/upload/avatar3.jpg`,
            comment: "Giá cả hợp lý, sản phẩm đa dạng. Tôi đặc biệt thích các loại trái cây theo mùa ở đây.",
            rating: 5,
        },
    ]


    return (
        <div className="store-wrapper">
            <Header />


            <div className="store-container">
                {/* About Section */}
                <section id="about" ref={aboutRef} className={`store-section about-section ${isVisible.about ? "visible" : ""}`}>
                    <div className="store-section-header">
                        <h2 className="store-section-title">Câu chuyện của chúng tôi</h2>
                        <div className="store-section-divider"></div>
                    </div>


                    <div className="about-content">
                        <div className="about-image-container">
                            <img
                                src={storyImage}
                                alt="Câu chuyện cửa hàng"
                                className="about-image"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = "https://placehold.co/600x400/e9ecef/495057?text=Câu+Chuyện+Cửa+Hàng"
                                }}
                            />
                            <div className="about-image-decoration"></div>
                        </div>


                        <div className="about-text">
                            <h3>Từ tình yêu với thực phẩm sạch</h3>
                            <p>
                                Thực Phẩm Sạch được thành lập vào năm 2015 với mong muốn mang đến cho mọi gia đình Việt những sản phẩm
                                thực phẩm tươi ngon, an toàn và giàu dinh dưỡng.
                            </p>
                            <p>
                                Chúng tôi bắt đầu từ một cửa hàng nhỏ tại quận 1, TP.HCM và dần phát triển thành chuỗi cửa hàng trên
                                toàn thành phố. Với phương châm "Sức khỏe từ thực phẩm sạch", chúng tôi luôn đặt chất lượng sản phẩm lên
                                hàng đầu.
                            </p>
                            <p>
                                Mỗi sản phẩm tại cửa hàng đều được chọn lọc kỹ lưỡng từ các nhà cung cấp uy tín, đảm bảo tiêu chuẩn an
                                toàn vệ sinh thực phẩm và giữ được hương vị tự nhiên nhất.
                            </p>


                            <div className="about-stats">
                                <div className="stat-item">
                                    <span className="stat-number">8+</span>
                                    <span className="stat-text">Năm kinh nghiệm</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">5+</span>
                                    <span className="stat-text">Chi nhánh</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">10k+</span>
                                    <span className="stat-text">Khách hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Products Section */}
                <section id="products" ref={productsRef} className={`store-section products-section ${isVisible.products ? "visible" : ""}`}>
                    <div className="store-section-header">
                        <h2 className="store-section-title">Sản phẩm của chúng tôi</h2>
                        <div className="store-section-divider"></div>
                        <p className="store-section-subtitle">Đa dạng sản phẩm thực phẩm tươi ngon, chất lượng cao</p>
                    </div>


                    <div className="products-grid">
                        {productCategories.map((category, index) => (
                            <div className="product-card" key={index}>
                                <div className="product-image-container">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = `https://placehold.co/400x300/e9ecef/495057?text=${encodeURIComponent(category.name)}`
                                        }}
                                    />
                                </div>
                                <div className="product-info">
                                    <h3 className="product-title">{category.name}</h3>
                                    <p className="product-description">{category.description}</p>
                                    <Link to="/products" className="product-link">
                                        Xem thêm
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>


                {/* Features Section */}
                <section id="features" ref={featuresRef} className={`store-section features-section ${isVisible.features ? "visible" : ""}`}>
                    <div className="store-section-header">
                        <h2 className="store-section-title">Tại sao chọn chúng tôi?</h2>
                        <div className="store-section-divider"></div>
                    </div>


                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>


                    <div className="store-features-banner">
                        <div className="store-banner-content">
                            <h3>Cam kết 100% hài lòng</h3>
                            <p>
                                Chúng tôi tự hào về chất lượng sản phẩm và dịch vụ. Nếu bạn không hài lòng, chúng tôi sẽ hoàn tiền hoặc
                                đổi sản phẩm khác.
                            </p>
                            <Link to="/contact" className="store-banner-button">
                                Liên hệ ngay
                            </Link>
                        </div>
                        <div className="store-banner-image-container">
                            <img
                                src={camketImage}
                                alt="Cam kết chất lượng"
                                className="store-banner-image"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = "https://placehold.co/600x400/e9ecef/495057?text=Cam+Kết+Chất+Lượng"
                                }}
                            />
                        </div>
                    </div>
                </section>


                {/* Testimonials Section */}
                <section className="home-testimonials-section" id="testimonials" ref={testimonialsRef}>
                    <div className="store-section-header">
                        <h2 className="store-section-title">Khách hàng nói gì về chúng tôi</h2>
                        <div className="store-section-divider"></div>
                    </div>
                    <div className="home-testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div className="home-testimonial-card" key={index}>
                                <div className="home-testimonial-avatar-container">
                                    <span style={{ fontSize: "28px", color: "#4caf50", fontWeight: "bold" }}>
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="home-testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="home-testimonial-text">
                                    "{testimonial.comment}"
                                </p>
                                <strong className="home-testimonial-name">
                                    {testimonial.name}
                                </strong>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Location Section */}
                <section id="location" ref={locationRef} className={`store-section location-section ${isVisible.location ? "visible" : ""}`}>
                    <div className="store-section-header">
                        <h2 className="store-section-title">Vị trí cửa hàng</h2>
                        <div className="store-section-divider"></div>
                    </div>


                    <div className="location-content">
                        <div className="location-info">
                            <h3>Ghé thăm cửa hàng của chúng tôi</h3>
                            <div className="location-details">
                                <div className="location-item">
                                    <div className="location-icon">📍</div>
                                    <div className="location-text">
                                        <strong>Địa chỉ:</strong>
                                        <p>123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                                    </div>
                                </div>
                                <div className="location-item">
                                    <div className="location-icon">🕒</div>
                                    <div className="location-text">
                                        <strong>Giờ mở cửa:</strong>
                                        <p>Thứ 2 - Thứ 7: 7:00 - 21:00</p>
                                        <p>Chủ nhật: 8:00 - 20:00</p>
                                    </div>
                                </div>
                                <div className="location-item">
                                    <div className="location-icon">📞</div>
                                    <div className="location-text">
                                        <strong>Liên hệ:</strong>
                                        <p>Điện thoại: 028 1234 5678</p>
                                        <p>Email: info@thucphamsach.com</p>
                                    </div>
                                </div>
                            </div>
                            <Link to="/contact" className="location-button">
                                Liên hệ ngay
                            </Link>
                        </div>


                        <div className="location-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9551992533183!2d106.69892607469758!3d10.739747089447194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9f60de6cbd%3A0x601b6ebb87601cd!2zMTIzIMSQxrDhu51uZyBOZ3V54buFbiBWxINuIExpbmgsIFTDom4gUGjDuiwgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1687698018296!5m2!1svi!2s"
                                width="100%"
                                height="450"
                                style={{ border: 0, borderRadius: '10px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Bản đồ cửa hàng"
                                className="map-iframe"
                            ></iframe>
                        </div>
                    </div>


                    <div className="store-images">
                        <h3>Hình ảnh cửa hàng</h3>
                        <div className="store-images-grid">
                            <div className="store-image-item" key={1}>
                                <img
                                    src={storeImage1}
                                    alt="Hình ảnh cửa hàng 1"
                                    className="store-image"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "https://placehold.co/400x300/e9ecef/495057?text=Hình+Ảnh+Cửa+Hàng+1"
                                    }}
                                />
                            </div>
                            <div className="store-image-item" key={2}>
                                <img
                                    src={storeImage2}
                                    alt="Hình ảnh cửa hàng 2"
                                    className="store-image"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "https://placehold.co/400x300/e9ecef/495057?text=Hình+Ảnh+Cửa+Hàng+2"
                                    }}
                                />
                            </div>
                            <div className="store-image-item" key={3}>
                                <img
                                    src={storeImage3}
                                    alt="Hình ảnh cửa hàng 3"
                                    className="store-image"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "https://placehold.co/400x300/e9ecef/495057?text=Hình+Ảnh+Cửa+Hàng+3"
                                    }}
                                />
                            </div>
                            <div className="store-image-item" key={4}>
                                <img
                                    src={storeImage4}
                                    alt="Hình ảnh cửa hàng 4"
                                    className="store-image"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "https://placehold.co/400x300/e9ecef/495057?text=Hình+Ảnh+Cửa+Hàng+4"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* Call to Action */}
                <section className="home-subscribe-section">
                    <div className="home-subscribe-container">
                        <div className="home-subscribe-content">
                            <h2>Đăng ký nhận thông tin</h2>
                            <p>Nhận thông tin về sản phẩm mới và khuyến mãi hấp dẫn</p>
                        </div>
                        <div className="home-subscribe-form">
                            <input type="email" placeholder="Nhập email của bạn" className="home-subscribe-input" />
                            <button className="home-subscribe-button">Đăng ký</button>
                        </div>
                    </div>
                </section>
            </div>


            <Footer />
        </div>
    )
}





