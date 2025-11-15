import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// ✅ ĐÃ CHỈNH SỬA ĐƯỜNG DẪN DỰA TRÊN THÔNG TIN BẠN CUNG CẤP
import logoImage from "./assets/images/logo.png";

const HeaderMinimal = ({ logoText, cartItemCount }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Đọc trạng thái người dùng từ localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Listener để cập nhật trạng thái khi đăng nhập/đăng xuất xảy ra
    const handleStorageChange = () => {
      const newUserData = localStorage.getItem("user");
      setUser(newUserData ? JSON.parse(newUserData) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Chuyển hướng đến route "/logout" để xóa session
    navigate("/logout");
  };

  const isAdmin = user && user.role === "admin";

  return (
    <header className="header-minimal">
      {/* Phần Logo (Bên trái) */}
      <div className="logo-section">
        <Link to="/" className="logo-text">
          <img
            src={logoImage} // Sử dụng logo đã import
            alt="K.H Clothing Store Logo"
            className="header-logo-image"
          />
        </Link>
      </div>

      {/* Phần Menu Điều hướng (Giữa) */}
      <nav className="nav-menu">
        <NavLink
          to="/Trang2"
          className="nav-item"
          activeClassName="active-nav-item"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="nav-item"
          activeClassName="active-nav-item"
        >
          About Us
        </NavLink>
        <NavLink to="/" className="nav-item" activeClassName="active-nav-item">
          Shop
        </NavLink>
        <NavLink
          to="/Trang1"
          className="nav-item"
          activeClassName="active-nav-item"
        >
          Contact Us
        </NavLink>

        {/* LOGIC ĐIỀU KIỆN */}
        {isAdmin && (
          // Nếu là Admin: Hiển thị Admin Dashboard
          <NavLink
            to="/admin/products"
            className="nav-item nav-admin"
            activeClassName="active-nav-item"
          >
            Admin Dashboard
          </NavLink>
        )}

        {user ? (
          // Nếu Đã đăng nhập: Hiển thị nút Đăng xuất
          <button
            onClick={handleLogout}
            className="nav-item nav-logout"
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Logout ({user.username})
          </button>
        ) : (
          // Nếu CHƯA đăng nhập: Hiển thị nút Login
          <NavLink
            to="/login"
            className="nav-item"
            activeClassName="active-nav-item"
          >
            Login
          </NavLink>
        )}
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
