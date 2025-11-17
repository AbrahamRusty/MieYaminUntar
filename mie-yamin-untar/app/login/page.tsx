// app/login/page.tsx
import LoginSection from '@/components/sections/Login'; 
import React from 'react';

const LoginPage = () => {
  return (
    // Menggunakan class CSS Global: login-container
    <div className="login-container">
      <LoginSection />
    </div>
  );
};

export default LoginPage;