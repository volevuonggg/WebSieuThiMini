import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homeadmin from './pages/admin/Homeadmin';
import Home from './pages/users/homepage/Home';
import Detail from './pages/users/detail/Detail';

import Dangnhapadmin from './pages/admin/dangnhapadmin/Dangnhapadmin';

import Dk from './pages/users/dangki/Dangki';
import Dn from './pages/users/dangnhap/Dangnhap';

import Product from './pages/admin/Product';
import Detail_product from './pages/admin/Detail_product';
import Cart from './pages/users/cart/Cart';
import Thanhtoan from './pages/users/thanhtoan/Thanhtoan';
import Raucuqua from './pages/users/categories/Raucuqua';
import Douonggiaikhat from './pages/users/categories/Douonggiaikhat';
import Thucphamtuoisong from './pages/users/categories/Thucphamtuoisong';
import Bosuutapmoi from './pages/users/categories/bosuutapmoi/Bosuutapmoi';
import Thucphamanlien from './pages/users/categories/Thucphamanlien';
import Sandouudai from './pages/users/categories/sandouudai/Sandouudai';
import Xahang from './pages/users/categories/xahang/Xahang';
import Dondathang from './pages/admin/Dondathang';
import Thongtinkh from './pages/admin/Thongtinkh';
import Goccuahang from './pages/users/goccuahang/Goccuahang';

import Hrctddhmn from './pages/users/thegioicuaphaidep/Hrctmddhmn';
import Cctpsm from './pages/users/thegioicuaphaidep/Cctpsm';
import Cdcvbc from './pages/users/thegioicuaphaidep/Cdcvbc';
import Dlmj from './pages/users/thegioicuaphaidep/Dlmj';
import Nbvanvddx from './pages/users/thegioicuaphaidep/Nbvanvddx';
import Sdttt from './pages/users/thegioicuaphaidep/Sdttt';
import Vdcscc from './pages/users/thegioicuaphaidep/Vdcscc';
import Checkout from './pages/users/checkout/Checkout';
import Kiemtradon from './pages/users/kiemtradon/Kiemtradon';

import ChatWidget from './components/chat';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homeadmin" element={<Homeadmin />} />
          <Route path="/dondathang" element={<Dondathang />} />
          <Route path="/Detail_product" element={<Detail_product />} />
          <Route path="/admin/Product" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/thanh-toan" element={<Thanhtoan />} />
          <Route path="/kiemtradon" element={<Kiemtradon />} />

          <Route path="/category/raucuqua" element={<Raucuqua />} />
          <Route path="/category/douonggiaikhat" element={<Douonggiaikhat />} />
          <Route path="/category/thucphamtuoisong" element={<Thucphamtuoisong />} />
          <Route path="/category/bosuutapmoi" element={<Bosuutapmoi />} />
          <Route path="/category/thucphamanlien" element={<Thucphamanlien />} />
          <Route path="/category/sandouudai" element={<Sandouudai />} />
          <Route path="/category/xahang" element={<Xahang />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/goccuahang" element={<Goccuahang />} />

          <Route path="/cctpsm" element={<Cctpsm />} />
          <Route path="/cdcvbc" element={<Cdcvbc />} />
          <Route path="/dlmj" element={<Dlmj />} />
          <Route path="/nbvanvddx" element={<Nbvanvddx />} />
          <Route path="/sdttt" element={<Sdttt />} />
          <Route path="/vdcscc" element={<Vdcscc />} />
          <Route path="/hrctddhmn" element={<Hrctddhmn />} />
          <Route path="/thongtinkhachhang" element={<Thongtinkh />} />

          <Route path="/account/login" element={<Dn />} />
          <Route path="/account/register" element={<Dk />} />

          <Route path="/admin/dangnhap" element={<Dangnhapadmin />} />
          <Route path="/Detail/:title/:id" element={<Detail />} />
        </Routes>
      </Router>

      <ChatWidget />

    </div>
  );
}

export default App;