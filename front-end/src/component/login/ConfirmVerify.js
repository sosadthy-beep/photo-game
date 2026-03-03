import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState('正在驗證中...');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const verifyStatus = queryParams.get('status');
    const auth = localStorage.getItem("user");

    // 如果已登入，直接跳 dashboard
    if (auth) {
      navigate("/dashboard");
      return;
    }

    setStatus(verifyStatus);

    if (verifyStatus === 'success') {
      message.success("你的電郵已成功驗證！", 5);
      setConfirm("驗證成功！你的帳號已啟用。");
      // 5 秒後跳主頁，讓用戶有時間看到訊息
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } else {
      message.error("驗證連結已過期或無效！", 5);
      setConfirm("驗證失敗：連結已過期或無效。");
      // 5 秒後跳回註冊頁或主頁
      setTimeout(() => {
        navigate('/register');  // 或 '/' 視你需求
      }, 5000);
    }
  }, [location.search, navigate]);

  return (
    <div 
      style={{
        textAlign: 'center',
        padding: '100px 20px',
        minHeight: '100vh',
        background: '#f0f2f5',
      }}
    >
      <div 
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ 
          color: status === 'success' ? '#52c41a' : '#f5222d',
          marginBottom: '24px'
        }}>
          {confirm}
        </h1>

        {status === 'success' ? (
          <p style={{ fontSize: '16px', color: '#595959' }}>
            恭喜！你現在可以返回主頁開始使用系統。
          </p>
        ) : (
          <p style={{ fontSize: '16px', color: '#595959' }}>
            請重新註冊或點擊「重新發送驗證郵件」。
          </p>
        )}

        <div style={{ marginTop: '32px' }}>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate(status === 'success' ? '/' : '/register')}
          >
            {status === 'success' ? '返回主頁' : '返回註冊'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmVerify;