import './App.css';
import './component/Style-css/Footer-Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import PrivateRoute from './component/PrivateRoute';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './component/navbar/Header';
import Footer from './component/Footer';

import CollectEvent from './component/collect_images/CollectEvent';
import Home from './component/home/Home';
import About from './component/About';
import LoginRegister from './component/login/LoginRegister';
import Dashboard from './component/dashboard/Dashboard'
import InEvent from './component/dashboard/InEvent';
import CameraCaptureWithMask from './component/collect_images/CameraCaptureWithMask';
import EmailVerified from './component/login/EmailVerify';
import ConfirmVerify from './component/login/ConfirmVerify';
import ForgetPass from './component/login/ForgetPass';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/forgetpassword' element={<ForgetPass />} />
          
          {/* 驗證相關路由：兩個都指向 ConfirmVerify */}
          <Route path="/verify/:token" element={<ConfirmVerify />} />          {/* ← 新增：處理驗證連結 */}
          <Route path='/confirmed' element={<ConfirmVerify />} />              {/* ← 原有：處理 redirect 後頁面 */}

          <Route path="/emailverified" element={<EmailVerified />} />
          <Route path='/camera' element={<CameraCaptureWithMask />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/in-event' element={<InEvent />} />
          <Route path='/collect/:eventId' element={<CollectEvent />} />
          <Route path='/login' element={<LoginRegister />} />
          <Route path='/about' element={<About />} />

          {/* 如果有其他路由，可繼續加 */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */} {/* 404 跳主頁，可選 */}

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;