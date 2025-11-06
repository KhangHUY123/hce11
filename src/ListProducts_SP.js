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
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {listProduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "15px",
              textAlign: "center",
              cursor: "pointer",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "220px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
                marginBottom: "10px",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
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
              ${typeof p.price === "number" ? p.price.toFixed(2) : p.price}
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
