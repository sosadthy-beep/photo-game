import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmVerify from './component/login/ConfirmVerify';

// ...

<Routes>
  {/* 其他路由 */}
  <Route path="/verify/:token" element={<ConfirmVerify />} />
  <Route path="/confirmed" element={<ConfirmVerify />} />  {/* 如果你想兩個都用同一頁 */}
</Routes>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
