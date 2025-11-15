import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <Link to="/Trang2" className="nav-item">
          Home
        </Link>
        <Link to="/about" className="nav-item">
          About Us
        </Link>
        <Link to="/" className="nav-item">
          Shop
        </Link>
        <Link to="/Trang1" className="nav-item">
          Contact Us
        </Link>

        {/* LOGIC ĐIỀU KIỆN */}
        {isAdmin && (
          // Nếu là Admin: Hiển thị Admin Dashboard
          <Link to="/admin/products" className="nav-item nav-admin">
            Admin Dashboard
          </Link>
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
          <Link to="/login" className="nav-item">
            Login
          </Link>
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
