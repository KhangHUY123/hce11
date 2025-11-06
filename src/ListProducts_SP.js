import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;

        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {" "}
      {/* Thêm maxWidth và margin: auto để căn giữa */}
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "1.8rem",
          color: "#333",
          textAlign: "center",
        }}
      >
        Danh sách sản phẩm
      </h2>
      <div
        style={{
          display: "grid",
          // ĐIỂM CẬP NHẬT: Tối ưu grid template columns
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "25px", // Tăng khoảng cách giữa các sản phẩm
          justifyContent: "center", // Căn giữa các cột nếu số lượng không đầy đủ một hàng
        }}
      >
        {listProduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{
              border: "1px solid #e0e0e0", // Màu viền nhẹ nhàng hơn
              borderRadius: "12px", // Bo tròn góc nhiều hơn
              padding: "15px", // Tăng padding bên trong
              textAlign: "center",
              cursor: "pointer",
              background: "#ffffff", // Nền trắng rõ ràng
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // Đổ bóng rõ hơn một chút
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex", // Thêm flex để căn chỉnh nội dung bên trong
              flexDirection: "column", // Sắp xếp nội dung theo chiều dọc
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)"; // Nhấc lên cao hơn khi hover
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)"; // Đổ bóng mạnh hơn khi hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "220px", // Tăng chiều cao vùng ảnh
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5", // Màu nền cho vùng ảnh
                marginBottom: "10px", // Khoảng cách dưới ảnh
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Đảm bảo ảnh bao phủ toàn bộ vùng
                }}
              />
            </div>

            <h4
              style={{
                margin: "10px 0 8px",
                fontSize: "1.1rem",
                color: "#333",
                flexGrow: "1",
              }}
            >
              {" "}
              {/* flexGrow để tiêu đề chiếm không gian còn lại */}
              {p.title}
            </h4>
            <p
              style={{
                color: "#e63946",
                fontWeight: "bold",
                margin: "0 0 5px",
                fontSize: "1.15rem",
              }}
            >
              ${parseFloat(p.price).toFixed(2)}{" "}
              {/* Định dạng giá 2 chữ số thập phân */}
            </p>
            <small style={{ color: "#777", fontSize: "0.9rem" }}>
              ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;
