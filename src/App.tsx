import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import Home from "./pages/admin/Home";
import ProtectedRoute from "./ui-component/shared/ProtectedRoute";
import CreateProduct from "./pages/admin/product/CreateProduct";
import ProductList from "./pages/admin/product/ProductList";
import CreateVoucher from "./pages/admin/voucher/CreateVoucher";
import VoucherList from "./pages/admin/voucher/VoucherList";
import EditProduct from "./pages/admin/product/EditProduct";
import Homepage from "./pages/customer/Homepage";
import CustomRoute from "./utils/CustomRoute";
import CreateDiscount from "./pages/admin/discount/CreateDiscount";
import DiscountList from "./pages/admin/discount/DiscountList";
import CreateCategory from "./pages/admin/category/CreateCategory";
import CategoryList from "./pages/admin/category/CategoryList";
import Category from "./pages/customer/Category";
import ProductPage from "./pages/customer/ProductPage";
import Checkout from "./pages/customer/Checkout";
import MyOrders from "./pages/customer/MyOrders";
import OrderDetail from "./pages/customer/OrderDetail";
import OrderList from "./pages/admin/order/AllOrder";
function App() {
  useEffect(() => {
    if (!localStorage.getItem("cart" || "")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }

    if (!localStorage.getItem("order" || "")) {
      localStorage.setItem("order", JSON.stringify({}));
    }
  }, []);
  return (
    <BrowserRouter>
      <CustomRoute>
        {/* <Routes> */}
        <>
          {/* Admin dashboard */}
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/create-product"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/all-order"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/all-product"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category/create-category"
            element={
              <ProtectedRoute>
                <CreateCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category/all-category"
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/create-product"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/voucher-discount/create-voucher"
            element={
              <ProtectedRoute>
                <CreateVoucher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/voucher-discount/create-discount"
            element={
              <ProtectedRoute>
                <CreateDiscount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/voucher-discount/all-voucher"
            element={
              <ProtectedRoute>
                <VoucherList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/voucher-discount/all-discount"
            element={
              <ProtectedRoute>
                <DiscountList />
              </ProtectedRoute>
            }
          />

          {/* Customer */}
          <Route path="/" element={<Homepage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:productId" element={<ProductPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
        </>
      </CustomRoute>
    </BrowserRouter>
  );
}

export default App;
