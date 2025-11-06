// src/HeaderMinimal.jsx (hoặc .tsx)

import React from "react";
import { Link } from "react-router-dom";

// Tùy thuộc vào cấu trúc dự án của bạn, hãy điều chỉnh đường dẫn này
import logoImage from "./assets/images/logo.png";

// Định kiểu cơ bản cho props nếu bạn đang dùng TypeScript
// interface HeaderProps { logoText: string; cartItemCount: number; }
// const HeaderMinimal: React.FC<HeaderProps> = ({ logoText, cartItemCount }) => {

const HeaderMinimal = ({ logoText, cartItemCount }) => {
  return (
    <header className="header-minimal">
      {/* Phần Logo (Bên trái) */}
      <div className="logo-section">
        <Link to="/" className="logo-text">
          <img
            src={logoImage}
            alt="K.H Clothing Store Logo"
            className="header-logo-image"
          />
        </Link>
      </div>

      {/* Phần Menu Điều hướng (Giữa) */}
      <nav className="nav-menu">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/about" className="nav-item">
          About Us
        </Link>
        <Link to="/Chitietsanpham" className="nav-item">
          Shop
        </Link>
        <Link to="/contact" className="nav-item">
          Contact Us
        </Link>

        {/* ĐIỂM SỬA LỖI: Chuyển đường dẫn từ "/LoginPage" thành "/login" */}
        <Link to="/login" className="nav-item">
          Login
        </Link>
      </nav>

      {/* Phần Giỏ hàng (Bên phải) */}
      <div className="cart-section">
        <Link to="/cart" className="cart-icon-link">
          🛒
          <span className="cart-count">{cartItemCount || 0}</span>
        </Link>
      </div>
    </header>
  );
};

export default HeaderMinimal;
