import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Component bảo vệ route
const ProtectedRoute = ({ children, roleRequired }) => {
  // Lấy dữ liệu user từ localStorage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  // Mặc định quyền yêu cầu là 'user' nếu không được truyền vào
  const required = roleRequired || "user";

  // --- 1. KIỂM TRA ĐĂNG NHẬP ---
  // Nếu chưa đăng nhập → chuyển về trang đăng nhập
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "⚠️ Vui lòng đăng nhập để tiếp tục!" }}
      />
    );
  }

  // --- 2. KIỂM TRA QUYỀN TRUY CẬP (ROLE) ---
  // Nếu quyền yêu cầu là 'admin' VÀ role của user không phải là 'admin'
  if (required === "admin" && user.role !== "admin") {
    alert("❌ Bạn không có quyền truy cập trang quản trị!");
    return <Navigate to="/" replace />; // Chuyển về trang chủ
  }

  // --- 3. TRUY CẬP HỢP LỆ ---
  return children;
};

export default ProtectedRoute;
