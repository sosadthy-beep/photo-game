import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import Footer from "../Footer";
import Header from "../navbar/Header";
import { Input, message } from "antd";

const Login_Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      message.warning("請填寫所有欄位");
      return;
    }

    try {
      let result = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.ok) {
        result = await result.json();
        message.success("註冊成功！已自動登入");

        // 儲存用戶資訊到 localStorage，模擬登入
        localStorage.setItem("user", JSON.stringify({
          name: result.user?.name || name,
          email: result.user?.email || email,
          _id: result.user?._id,
          isVerified: true
        }));

        // 直接跳轉到 dashboard 或主頁
        navigate('/dashboard');  // 你可改成 '/' 如果主頁是 '/'

      } else {
        result = await result.json();
        message.warning(result.message || "註冊失敗，請檢查資料");
      }
    } catch (err) {
      message.error("註冊出錯，請檢查網絡");
      console.error(err);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      message.warning("請填寫電郵及密碼");
      return;
    }

    try {
      let result = await fetch('http://localhost:5000/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (result.ok) {
        result = await result.json();
        message.success("登入成功！");

        // 儲存用戶資訊
        localStorage.setItem("user", JSON.stringify({
          name: result.name,
          email: email,
          _id: result._id,
          isVerified: true
        }));

        // 直接跳轉
        navigate('/dashboard');

      } else {
        result = await result.json();
        message.warning(result.message || "登入失敗，請檢查帳號密碼");
      }
    } catch (err) {
      message.error("登入出錯，請檢查網絡");
      console.error(err);
    }
  };

  function en1() {
    const container = document.getElementById('container');
    container.classList.add("active");
  }

  function en2() {
    const container = document.getElementById('container');
    container.classList.remove("active");
  }

  return (
    <>
      <Header />
      <div className="row justify-content-center">
        <div className="container-1" id="container">
          <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <Input.Password 
                type="password" 
                placeholder="Password" 
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form onSubmit={handleSubmit2}>
              <h1>Sign In</h1>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <Input.Password 
                type="password" 
                placeholder="Password" 
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <Link to={"/forgetpassword"}>Forget Your Password?</Link>
              <button type="submit">Sign In</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className="hidden" id="login" onClick={en2}>Sign In</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use all of site features</p>
                <button className="hidden" id="register" onClick={en1}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login_Register;