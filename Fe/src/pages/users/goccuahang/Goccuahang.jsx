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
                {/* Hero Section */}
                <section className="store-section hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Chào mừng đến với
                            <br />
                            <span className="highlight">Thực Phẩm Sạch</span>
                        </h1>
                        <p className="hero-subtitle">Nơi cung cấp thực phẩm tươi ngon, an toàn và chất lượng</p>
                        <Link to="/products" className="hero-button">
                            Khám phá sản phẩm
                        </Link>
                    </div>
                    <div className="hero-overlay"></div>
                    <div className="hero-image-container">
                        <img
                            src={heroImage}
                            alt="Thực phẩm sạch"
                            className="hero-image"
                            onError={(e) => {
                                e.target.onerror = null
                                e.target.src = "https://placehold.co/1200x600/e9ecef/495057?text=Thực+Phẩm+Sạch"
                            }}
                        />
                    </div>
                    <div className="hero-wave">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path
                                fill="#ffffff"
                                fillOpacity="1"
                                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            ></path>
                        </svg>
                    </div>
                </section>

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

                    <div className="products-gallery">
                        <h3 className="gallery-title">Bộ sưu tập sản phẩm</h3>
                        <div className="gallery-grid">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div className="gallery-item" key={item}>
                                    <img
                                        src={`${process.env.REACT_APP_BASEURL}/upload/gallery-${item}.jpg`}
                                        alt={`Gallery image ${item}`}
                                        className="gallery-image"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = `https://placehold.co/300x300/e9ecef/495057?text=Hình+Ảnh+${item}`
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
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
                                src={`${process.env.REACT_APP_BASEURL}/upload/quality-guarantee.jpg`}
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
                <section id="testimonials" ref={testimonialsRef} className={`store-section testimonials-section ${isVisible.testimonials ? "visible" : ""}`}>
                    <div className="store-section-header">
                        <h2 className="store-section-title">Khách hàng nói gì về chúng tôi</h2>
                        <div className="store-section-divider"></div>
                    </div>

                    <div className="testimonials-container">
                        {testimonials.map((testimonial, index) => (
                            <div className="testimonial-card" key={index}>
                                <div className="testimonial-content">
                                    <div className="quote-icon">"</div>
                                    <p className="testimonial-text">{testimonial.comment}</p>
                                    <div className="testimonial-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`star ${i < testimonial.rating ? "filled" : ""}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-avatar">
                                        <img
                                            src={testimonial.avatar || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = `https://placehold.co/100x100/e9ecef/495057?text=${testimonial.name.charAt(0)}`
                                            }}
                                        />
                                    </div>
                                    <div className="author-name">{testimonial.name}</div>
                                </div>
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
                            <img
                                src={`${process.env.REACT_APP_BASEURL}/upload/store-map.jpg`}
                                alt="Bản đồ cửa hàng"
                                className="map-image"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = "https://placehold.co/600x400/e9ecef/495057?text=Bản+Đồ+Cửa+Hàng"
                                }}
                            />
                        </div>
                    </div>

                    <div className="store-images">
                        <h3>Hình ảnh cửa hàng</h3>
                        <div className="store-images-grid">
                            {[1, 2, 3, 4].map((item) => (
                                <div className="store-image-item" key={item}>
                                    <img
                                        src={`${process.env.REACT_APP_BASEURL}/upload/store-${item}.jpg`}
                                        alt={`Store image ${item}`}
                                        className="store-image"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = `https://placehold.co/400x300/e9ecef/495057?text=Hình+Ảnh+Cửa+Hàng+${item}`
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="store-section cta-section">
                    <div className="cta-content">
                        <h2>Sẵn sàng trải nghiệm thực phẩm sạch?</h2>
                        <p>Đăng ký nhận thông tin khuyến mãi và sản phẩm mới nhất từ chúng tôi</p>
                        <form className="cta-form">
                            <input type="email" placeholder="Nhập email của bạn" required />
                            <button type="submit">Đăng ký</button>
                        </form>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}

