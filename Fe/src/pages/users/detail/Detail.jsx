"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "./Detail.css"
import { TiMinus } from "react-icons/ti"
import { useParams, Link } from "react-router-dom"
import Header from "../../../components/header/Header"
import Footer from "../../../components/footer/Footer"

export default function Detail() {
	const [detailtitle, setdetailtitle] = useState("")
	const [detailgia, setdetailgia] = useState(0)
	const [slsp, setslsp] = useState(1)
	const [detailtong, setdetailtong] = useState(0)
	const [slsptgh, setslsptgh] = useState(0)
	const [detail, setdetail] = useState()
	const { id } = useParams()

	const formatPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
	}

	const userData = localStorage.getItem("userData")
	const user = userData ? JSON.parse(userData).user : null
	const userId = user ? user.id : null

	useEffect(() => {
		if (userId) {
			axios
				.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
				.then((response) => {
					setslsptgh(response.data)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [userId])

	const up = (event) => {
		event.preventDefault()
		setslsp(slsp + 1)
	}

	const down = (event) => {
		event.preventDefault()
		if (slsp > 1) {
			setslsp(slsp - 1)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/detail/${id}`)
			setdetail(response.data)
		}
		fetchData()
	}, [id])

	useEffect(() => {
		if (detail?.product) {
			setdetailgia(detail.product.gia)
			setdetailtitle(detail.product.title)
		}
	}, [detail])

	useEffect(() => {
		const tongValue = slsp * detailgia * 1000
		setdetailtong(tongValue)
	}, [slsp, detailgia])

	async function save(event) {
		event.preventDefault()

		// Kiểm tra tình trạng hàng
		if (detail.tinhtrang.toLowerCase() === "hết hàng") {
			alert("Sản phẩm này hiện đã hết hàng!")
			return
		}

		try {
			const formData = new FormData()
			formData.append("title", detailtitle)
			formData.append("gia", detailgia)
			formData.append("soluong", slsp)
			formData.append("tong", detailtong)
			formData.append("product_id", id)
			formData.append("size", "Không có")
			formData.append("dkdn_id", user.id)

			const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/cart/${userId}`, formData, {
				headers: { "content-type": "multipart/form-data" },
			})

			if (response.data.message) {
				alert("Sản phẩm đã có trong giỏ hàng")
			} else {
				alert("Thêm sản phẩm thành công")
				window.location.reload()
			}
		} catch (err) {
			if (!userId) {
				alert("Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng")
			} else {
				alert("Đã xảy ra lỗi, vui lòng thử lại")
			}
		}
	}

	if (!detail) return <div>Loading...</div>

	return (
		<div className="detail-wrapper">
			<Header />
			<div className="detail-container">
				<nav className="detail-breadcrumb">
					<Link to="/">Trang chủ</Link>
					<span>/  Chi tiết sản phẩm</span>
					<Link to={`/category/${detail.product.category_slug}`}>{detail.product.category}</Link>
					<span>/</span>
					<span>{detail.product.title}</span>
				</nav>

				<div className="detail-product">
					<div className="detail-product-image">
						<img src={`${process.env.REACT_APP_BASEURL}/upload/${detail.product.hinhanh}`} alt={detail.product.title} />
					</div>

					<div className="detail-product-info">
						<h1>{detail.product.title}</h1>
						<div className="detail-product-status">
							<span className="detail-status">
								Tình trạng: <span className="in-stock">{detail.tinhtrang}</span>
							</span>
						</div>
						<div className="detail-price-section">
							<span className="detail-price">{formatPrice(detail.product.gia)}₫</span>
						</div>

						<div className="detail-nutrition-highlights">
							<span className="nutrition-badge">Giá tốt</span>
							<span className="nutrition-badge">Nhập mới mỗi ngày</span>
							<span className="nutrition-badge">Lựa chọn hoàn hảo</span>
							<span className="nutrition-badge">Bán chạy</span>
						</div>

						<form onSubmit={save} className="detail-add-to-cart-form">
							<div className="detail-quantity-control">
								<button
									type="button"
									onClick={down}
									className="detail-quantity-btn"
									disabled={detail.tinhtrang.toLowerCase() === "hết hàng"}
								>
									-
								</button>
								<input
									type="text"
									value={slsp}
									readOnly
									className="detail-quantity-input"
								/>
								<button
									type="button"
									onClick={up}
									className="detail-quantity-btn"
									disabled={detail.tinhtrang.toLowerCase() === "hết hàng"}
								>
									+
								</button>
								<span className="quantity-label">Số lượng</span>
							</div>
							<button
								type="submit"
								className={`detail-add-to-cart-btn ${detail.tinhtrang.toLowerCase() === "hết hàng" ? 'disabled' : ''}`}
								disabled={detail.tinhtrang.toLowerCase() === "hết hàng"}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="9" cy="21" r="1"></circle>
									<circle cx="20" cy="21" r="1"></circle>
									<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
								</svg>
								{detail.tinhtrang.toLowerCase() === "hết hàng" ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
							</button>
						</form>

						<div className="detail-shipping-info">
							<h3>Thông tin giao hàng</h3>
							<ul>
								<li>
									<TiMinus /> Miễn phí vận chuyển với đơn hàng trên 599K
								</li>
								<li>
									<TiMinus /> Giao hàng nhanh trong ngày (trước 2h chiều)
								</li>
								<li>
									<TiMinus /> Đảm bảo tươi ngon hoặc hoàn tiền
								</li>
								<li>
									<TiMinus /> Hotline hỗ trợ: 0984196426
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="detail-description">
					<h2>Thông tin sản phẩm</h2>
					<div className="detail-description-content">
						<div className="detail-description-section">
							<h3>Nguồn gốc & Chất lượng</h3>
							<p>{detail.chatlieu}</p>
						</div>
						<div className="detail-description-section">
							<h3>Thành phần dinh dưỡng</h3>
							<p>{detail.themanhsp}</p>
						</div>
						<div className="detail-description-section">
							<h3>Hướng dẫn sử dụng & Chế biến</h3>
							<p>{detail.huongdansudung}</p>
						</div>
					</div>
				</div>

				{detail.relatedProducts && detail.relatedProducts.length > 0 && (
					<div className="detail-related">
						<h3>Sản phẩm tương tự bạn có thể thích</h3>
						<div className="detail-related-list">
							{detail.relatedProducts.map((related, index) => (
								<div key={index} className="detail-related-item">
									<Link to={`/detail/${related.id}`}>
										<div className="related-image-container">
											<img src={`${process.env.REACT_APP_BASEURL}/upload/${related.hinhanh}`} alt={related.title} />
											{Math.random() > 0.5 && <span className="organic-badge">Organic</span>}
										</div>
										<div className="detail-related-info">
											<h4>{related.title}</h4>
											<p className="detail-price">{formatPrice(related.gia)}₫</p>
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}

