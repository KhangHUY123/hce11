import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham"; // Component chi tiết của bạn

// @ts-ignore
import ListProducts from "./ListProducts";

// @ts-ignore
import ListProducts_SP from "./ListProducts_SP"; // Component danh sách của bạn

// @ts-ignore
import Trang2 from "./Trang2";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
           {" "}
      <Routes>
               {" "}
        <Route path="/" element={<Layout />}>
                    <Route index element={<ListProducts_SP />} />
          {/* Route này bị trùng, bạn nên xóa nếu luôn dùng ID */}
                    <Route path="Chitietsanpham" element={<Chitietsanpham />} />
          {/* Route Chi tiết sản phẩm đúng đang sử dụng :id */}
                    <Route path="sanpham/:id" element={<Chitietsanpham />} />
                    <Route path="trang2" element={<Trang2 />} />       {" "}
        </Route>
             {" "}
      </Routes>
         {" "}
    </BrowserRouter>
  );
}
