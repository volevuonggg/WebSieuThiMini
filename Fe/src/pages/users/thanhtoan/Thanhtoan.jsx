"use client"

import { useState, useEffect } from "react"
import "./Thanhtoan.css"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import Header from "../../../components/header/Header"
import Footer from "../../../components/footer/Footer"

export default function Thanhtoan() {
  const navigate = useNavigate()
  const location = useLocation()
  const [emailSent, setEmailSent] = useState(false)
  const [madonhang, setmadonhang] = useState(0)
  const [nganhangclient, setnganhangclient] = useState("")
  const [slsptgh, setslsptgh] = useState(0)
  const [check, setcheck] = useState([])
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false)
  const [isBankTransfer, setIsBankTransfer] = useState(false)
  const [hovaten, sethovaten] = useState("")
  const [diachi, setdiachi] = useState("")
  const [tinhtp, setTinhtp] = useState("")
  const [quanhuyen, setQuanhuyen] = useState("")
  const [phuongxa, setPhuongxa] = useState("")
  const [sdt, setsdt] = useState("")
  const [thongtinbosung, setthongtinbosung] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedWard, setSelectedWard] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const userData = localStorage.getItem("userData")
  const user = userData ? JSON.parse(userData).user : null
  const userId = user ? user.id : null

  const savedTongcart = localStorage.getItem("tongcart")
  const initialTongcart = savedTongcart ? JSON.parse(savedTongcart) : 0
  const [tongcart, settongcart] = useState(initialTongcart)

  const formatPrice = (price) => {
    const roundedPrice = Math.round(Number(price));
    return new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0 }).format(roundedPrice) + 'đ';
  };

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!userId) {
      alert("Vui lòng đăng nhập để tiếp tục thanh toán");
      navigate("/login");
      return;
    }
    generateRandomNumber();
  }, [userId, navigate]);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    setmadonhang(randomNumber)
  }

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/check/${userId}`);
        setcheck(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching cart data:", error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`);
          setslsptgh(response.data);
        }
      } catch (error) {
        console.log("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, [userId]);

  useEffect(() => {
    if (check.length > 0) {
      try {
        const normalizedCheck = check.map(item => {
          const gia = Number(item.gia) >= 1000000 ? Number(item.gia) / 1000 : Number(item.gia);
          return { ...item, gia };
        });

        const total = normalizedCheck.reduce((sum, item) => {
          const price = Number(item.gia);
          const quantity = Number(item.soluong) || 0;
          return sum + price * quantity;
        }, 0);

        const totalWithShipping = total + 30000;
        settongcart(totalWithShipping);
        localStorage.setItem("tongcart", JSON.stringify(totalWithShipping));
      } catch (error) {
        console.log("Error calculating total:", error);
      }
    }
  }, [check]);

  const checkString = JSON.stringify(check)
  const objectArray = JSON.parse(checkString)
  const titles = objectArray.map((obj) => obj.title)

  const danhsachnganhang = [
    "Chọn ngân hàng",
    "Vietcombank",
    "BIDV",
    "NCB",
    "VietinBank",
    "Techcombank",
    "MBBank",
    "ACB",
    "TPBank",
    "Sacombank",
    "OCB",
    "VIB",
  ]

  const handleCashOnDeliveryChange = () => {
    setIsCashOnDelivery(true)
    setIsBankTransfer(false)
  }

  const handleBankTransferChange = () => {
    setIsCashOnDelivery(false)
    setIsBankTransfer(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!hovaten.trim()) errors.hovaten = "Vui lòng nhập họ tên"
    if (!diachi.trim()) errors.diachi = "Vui lòng nhập địa chỉ"
    if (!sdt.trim()) errors.sdt = "Vui lòng nhập số điện thoại"
    if (!tinhtp) errors.tinhtp = "Vui lòng chọn tỉnh/thành phố"
    if (!quanhuyen) errors.quanhuyen = "Vui lòng chọn quận/huyện"
    if (!phuongxa) errors.phuongxa = "Vui lòng chọn phường/xã"
    if (!isCashOnDelivery && !isBankTransfer) {
      errors.payment = "Vui lòng chọn phương thức thanh toán"
    }

    // Validate số điện thoại
    if (sdt.trim() && !/^(0[0-9]{9})$/.test(sdt.trim())) {
      errors.sdt = "Số điện thoại không hợp lệ (phải có 10 chữ số và bắt đầu bằng 0)";
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Kiểm tra lỗi
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Kiểm tra giỏ hàng
    if (check.length === 0) {
      alert("Giỏ hàng của bạn đang trống");
      navigate("/cart");
      return;
    }

    if (isCashOnDelivery) {
      try {
        setIsSubmitting(true);

        // Chuẩn bị dữ liệu gửi đi
        const formData = new FormData()
        formData.append("hovaten", hovaten.trim())
        formData.append("diachi", diachi.trim())
        formData.append("tinh", tinhtp)
        formData.append("quanhuyen", quanhuyen)
        formData.append("phuongxa", phuongxa)
        formData.append("sdt", sdt.trim())
        formData.append("thongtinbosung", thongtinbosung.trim())
        formData.append("pttt", "Trả tiền mặt khi nhận hàng")
        formData.append("sanpham", titles.join(", "))
        formData.append("dkdn_id", userId)
        formData.append("thanhtien", String(tongcart)) // Đảm bảo số được chuyển thành chuỗi
        formData.append("tinhtrangdon", "Chờ xác nhận")
        formData.append("madonhang", String(madonhang))

        const response = await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/dondathang`,
          formData,
          {
            headers: { "content-type": "multipart/form-data" },
          }
        )

        if (response.status === 200) {
          // Xóa giỏ hàng sau khi đặt hàng thành công
          await axios.delete(`${process.env.REACT_APP_BASEURL}/api/giohang/${userId}/delete-all`)

          try {
            await axios.post(`${process.env.REACT_APP_BASEURL}/api/send-mail/${userId}`)
            setEmailSent(true)
          } catch (error) {
            console.log("Error sending email:", error)
          }

          alert("Đặt hàng thành công!")
          navigate("/")
        }
      } catch (err) {
        console.log("Error submitting order:", err)

        // Hiển thị thông báo lỗi chi tiết hơn
        if (err.response && err.response.data && err.response.data.message) {
          alert(`Lỗi: ${err.response.data.message}`);
        } else {
          alert("Có lỗi xảy ra khi đặt hàng. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.")
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    // Kiểm tra lỗi
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!isBankTransfer) {
      alert("Vui lòng chọn phương thức thanh toán chuyển khoản")
      return
    }

    try {
      setIsSubmitting(true);

      const formDataValues = {
        hovaten: hovaten.trim(),
        diachi: diachi.trim(),
        tinh: tinhtp,
        quanhuyen,
        phuongxa,
        sdt: sdt.trim(),
        thongtinbosung: thongtinbosung.trim(),
        pttt: "Thanh toán VNPAY",
        sanpham: titles.join(", "),
        dkdn_id: userId,
        thanhtien: tongcart,
        madonhang: String(madonhang)
      }

      localStorage.setItem("formData", JSON.stringify(formDataValues))

      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/vnpay-payment`,
        {
          amount: tongcart,
          orderId: madonhang
        }
      )

      if (response.data.code === '00') {
        window.location.href = response.data.data
      } else {
        alert(`Lỗi thanh toán: ${response.data.message || "Không thể tạo yêu cầu thanh toán"}`)
      }
    } catch (err) {
      console.log("Error with payment:", err)

      if (err.response && err.response.data && err.response.data.message) {
        alert(`Lỗi thanh toán: ${err.response.data.message}`);
      } else {
        alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.")
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const handlePaymentCompletion = async () => {
      const queryParams = new URLSearchParams(location.search)
      const vnpResponseCode = queryParams.get("vnp_ResponseCode")
      const vnpTransactionStatus = queryParams.get("vnp_TransactionStatus")

      if (vnpResponseCode && !emailSent) {
        try {
          if (vnpResponseCode === "00" && vnpTransactionStatus === "00") {
            const data = JSON.parse(localStorage.getItem("formData"))
            if (!data) {
              alert("Không tìm thấy dữ liệu đơn hàng");
              navigate("/cart");
              return;
            }

            const formData = new FormData()
            formData.append("hovaten", data.hovaten)
            formData.append("diachi", data.diachi)
            formData.append("tinh", data.tinh)
            formData.append("quanhuyen", data.quanhuyen)
            formData.append("phuongxa", data.phuongxa)
            formData.append("sdt", data.sdt)
            formData.append("thongtinbosung", data.thongtinbosung)
            formData.append("pttt", data.pttt)
            formData.append("sanpham", data.sanpham)
            formData.append("dkdn_id", data.dkdn_id)
            formData.append("thanhtien", String(data.thanhtien))
            formData.append("tinhtrangdon", "Đã thanh toán")
            formData.append("madonhang", String(data.madonhang))

            await axios.post(
              `${process.env.REACT_APP_BASEURL}/api/dondathang`,
              formData,
              {
                headers: { "content-type": "multipart/form-data" },
              }
            )

            await axios.post(`${process.env.REACT_APP_BASEURL}/api/send-mail/${userId}`)
            await axios.delete(`${process.env.REACT_APP_BASEURL}/api/giohang/${userId}/delete-all`)

            setEmailSent(true)
            // Xóa dữ liệu tạm thời từ localStorage sau khi xử lý thành công
            localStorage.removeItem("formData");
            alert("Đặt hàng thành công!")
            navigate("/")
          } else {
            alert("Thanh toán thất bại! Mã lỗi: " + vnpResponseCode)
            navigate("/cart")
          }
        } catch (err) {
          console.log("Error processing payment completion:", err)
          alert("Có lỗi xảy ra khi xử lý đơn hàng!")
          navigate("/cart")
        }
      }
    }

    handlePaymentCompletion()
  }, [location.search, emailSent, userId, navigate])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/')
        setCities(response.data)
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }
    fetchCities()
  }, [])

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCity) {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`)
          setDistricts(response.data.districts || [])
          setWards([])
          setSelectedDistrict("")
          setSelectedWard("")
        } catch (error) {
          console.error('Error fetching districts:', error)
        }
      }
    }
    fetchDistricts()
  }, [selectedCity])

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
          setWards(response.data.wards || [])
          setSelectedWard("")
        } catch (error) {
          console.error('Error fetching wards:', error)
        }
      }
    }
    fetchWards()
  }, [selectedDistrict])

  if (isLoading) {
    return (
      <div className="wrapper">
        <Header />
        <div className="payment-container">
          <div className="payment-header">
            <h1>Đang tải thông tin...</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Kiểm tra giỏ hàng trống
  if (check.length === 0) {
    return (
      <div className="wrapper">
        <Header />
        <div className="payment-container">
          <div className="payment-header">
            <h1>Giỏ hàng trống</h1>
            <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "20px"
              }}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="payment-container">
        <div className="payment-header">
          <h1>Thanh toán đơn hàng</h1>
          <p>Vui lòng kiểm tra thông tin và chọn phương thức thanh toán</p>
        </div>

        <div className="payment-content">
          <div className="payment-layout">
            <div className="payment-form-container">
              <h2>Thông tin giao hàng</h2>
              <form id="paymentForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={{ float: "left" }} htmlFor="hovaten">
                    Họ và tên <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="hovaten"
                    className="form-control"
                    id="hovaten"
                    placeholder="Nhập Họ và tên của bạn"
                    required
                    value={hovaten}
                    onChange={(e) => sethovaten(e.target.value)}
                  />
                  {formErrors.hovaten && <div className="error-message">{formErrors.hovaten}</div>}
                </div>

                <div className="form-group">
                  <label style={{ float: "left" }} htmlFor="diachi">
                    Địa chỉ <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="diachi"
                    className="form-control"
                    id="diachi"
                    placeholder="Nhập số nhà, tên đường"
                    required
                    value={diachi}
                    onChange={(e) => setdiachi(e.target.value)}
                  />
                  {formErrors.diachi && <div className="error-message">{formErrors.diachi}</div>}
                </div>

                <div className="tinhtpdc" style={{ display: "flex", gap: "15px" }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="city">Tỉnh/Thành phố <span style={{ color: "red" }}>*</span></label>
                    <select
                      id="city"
                      className="form-control"
                      value={selectedCity}
                      onChange={(e) => {
                        const selectedValue = e.target.value
                        const selectedCity = cities.find((city) => city.code === Number(selectedValue))
                        setSelectedCity(selectedValue)
                        setTinhtp(selectedCity ? selectedCity.name : "")
                      }}
                      required
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {cities.map((city) => (
                        <option key={city.code} value={city.code}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.tinhtp && <div className="error-message">{formErrors.tinhtp}</div>}
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="district">Quận/Huyện <span style={{ color: "red" }}>*</span></label>
                    <select
                      id="district"
                      className="form-control"
                      value={selectedDistrict}
                      onChange={(e) => {
                        const selectedValue = e.target.value
                        const selectedDistrict = districts.find((district) => district.code === Number(selectedValue))
                        setSelectedDistrict(selectedValue)
                        setQuanhuyen(selectedDistrict ? selectedDistrict.name : "")
                      }}
                      required
                      disabled={!selectedCity}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.quanhuyen && <div className="error-message">{formErrors.quanhuyen}</div>}
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="ward">Phường/Xã <span style={{ color: "red" }}>*</span></label>
                    <select
                      id="ward"
                      className="form-control"
                      value={selectedWard}
                      onChange={(e) => {
                        const selectedValue = e.target.value
                        const selectedWard = wards.find((ward) => ward.code === Number(selectedValue))
                        setSelectedWard(selectedValue)
                        setPhuongxa(selectedWard ? selectedWard.name : "")
                      }}
                      required
                      disabled={!selectedDistrict}
                    >
                      <option value="">Chọn phường/xã</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.phuongxa && <div className="error-message">{formErrors.phuongxa}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ float: "left" }} htmlFor="sdt">
                    Số điện thoại <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="sdt"
                    className="form-control"
                    id="sdt"
                    placeholder="Nhập số điện thoại của bạn (VD: 0912345678)"
                    required
                    value={sdt}
                    onChange={(e) => setsdt(e.target.value)}
                  />
                  {formErrors.sdt && <div className="error-message">{formErrors.sdt}</div>}
                </div>

                <div className="thongtinbosung">
                  <span style={{ float: "left", color: "blue" }}>THÔNG TIN BỔ SUNG</span>
                  <br />
                  <span style={{ float: "left" }}>Ghi chú đơn hàng (thời gian nhận hàng, nơi nhận)</span>
                  <br />
                  <textarea
                    value={thongtinbosung}
                    onChange={(e) => setthongtinbosung(e.target.value)}
                    style={{ float: "left" }}
                    name="thongtinbosung"
                    id="thongtinbosung"
                    cols="78"
                    rows="8"
                  ></textarea>
                </div>

                <div className="payment-methods">
                  <h3>Phương thức thanh toán <span style={{ color: "red" }}>*</span></h3>
                  <div className="payment-options">
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="cash-on-delivery"
                        name="payment"
                        checked={isCashOnDelivery}
                        onChange={handleCashOnDeliveryChange}
                      />
                      <label htmlFor="cash-on-delivery">Trả tiền mặt khi nhận hàng</label>
                    </div>

                    <div className="payment-option">
                      <input
                        type="radio"
                        id="bank-transfer"
                        name="payment"
                        checked={isBankTransfer}
                        onChange={handleBankTransferChange}
                      />
                      <label htmlFor="bank-transfer">Chuyển khoản ngân hàng</label>
                    </div>
                  </div>
                  {formErrors.payment && <div className="error-message">{formErrors.payment}</div>}
                </div>

                {isBankTransfer ? (
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="payment-button"
                  >
                    {isSubmitting ? 'Đang xử lý...' : 'Thanh toán qua VNPAY'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="payment-button"
                  >
                    {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
                  </button>
                )}
              </form>
            </div>

            <div className="order-details-container">
              <div className="order-details">
                <h2>Chi tiết đơn hàng</h2>
                <div className="order-items">
                  {check.map((item) => (
                    <div className="order-item" key={item.id}>
                      <div className="item-image">
                        {item.hinhanh ? (
                          <img
                            src={`${process.env.REACT_APP_BASEURL}/upload/${item.hinhanh}`}
                            alt={item.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/100x100/e9ecef/495057?text=No+Image";
                            }}
                          />
                        ) : (
                          <img
                            src="https://placehold.co/100x100/e9ecef/495057?text=No+Image"
                            alt="Placeholder"
                          />
                        )}
                      </div>
                      <div className="item-details">
                        <h3>{item.title}</h3>
                        <div className="item-meta">
                          <span className="item-quantity">Số lượng: {item.soluong}</span>
                          <span className="item-price">{formatPrice(item.gia)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-item">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(tongcart - 30000)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Phí vận chuyển:</span>
                    <span>{formatPrice(30000)}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(tongcart)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}