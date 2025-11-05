// src/Chitietsanpham.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// @ts-ignore <--- SỬ DỤNG DÒNG NÀY ĐỂ BỎ QUA LỖI TS7016
import { supabase } from "./supabaseClient"; // Import client JS

// Khai báo kiểu dữ liệu cho sản phẩm
interface ProductDetailType {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating_rate: number;
  rating_count: number;
}

const Chitietsanpham: React.FC = () => {
  // Lấy 'id' từ URL
  const { id } = useParams<{ id: string }>();

  // State lưu trữ dữ liệu sản phẩm hiện tại
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm tải dữ liệu chi tiết sản phẩm từ Supabase
  const fetchProductDetail = async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("product1") // Tên bảng sản phẩm của bạn
        .select("*")
        .eq("id", productId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (!data) {
        setError("Không tìm thấy sản phẩm này.");
        setProduct(null);
      } else {
        // Ép kiểu dữ liệu để đảm bảo ProductType được áp dụng
        setProduct(data as ProductDetailType);
      }
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Lỗi khi tải chi tiết sản phẩm.";
      console.error("Fetch Error:", errorMessage);
      setError("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      // Đảm bảo ID là số trước khi fetch
      fetchProductDetail(parseInt(id));
    }
  }, [id]);

  // Hiển thị trạng thái Loading và Error
  if (loading) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        Đang tải chi tiết sản phẩm...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center", color: "red" }}>
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        Sản phẩm không tồn tại.
      </div>
    );
  }

  // Logic tạo sao
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#dcdcdc" }}>
          ★
        </span>
      ));
  };

  // ---------------- GIAO DIỆN HIỂN THỊ CHI TIẾT SẢN PHẨM ----------------
  return (
    <div className="product-detail-page">
      <div className="detail-container">
        {/* Cột 1: Hình ảnh */}
        <div className="image-column">
          <img
            src={product.image}
            alt={product.title}
            className="product-main-image"
          />
          <p style={{ marginTop: "15px" }}>
            ⭐ {product.rating_rate} | ({product.rating_count} đánh giá)
          </p>
        </div>

        {/* Cột 2: Thông tin */}
        <div className="info-column">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-rating">
            {renderStars(Math.round(product.rating_rate))}
          </div>

          <p className="product-price">
            Giá: <span>${product.price.toFixed(2)}</span>
          </p>

          <div className="action-buttons">
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="quantity-input"
            />
            <button className="add-to-cart-btn">🛒 Thêm vào Giỏ hàng</button>
          </div>

          <div className="description-section">
            <h3>Mô tả sản phẩm</h3>
            <p>
              {product.description ||
                "Chưa có mô tả chi tiết cho sản phẩm này."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chitietsanpham;
