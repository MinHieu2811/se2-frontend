import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Home from './pages/admin/Home';
import Register from './pages/admin/auth/Register';
import Login from './pages/admin/auth/Login';
import ProtectedRoute from './ui-component/shared/ProtectedRoute';
import CreateProduct from './pages/admin/product/CreateProduct';
import ProductList from './pages/admin/product/ProductList';
import CreateVoucher from './pages/admin/voucher/CreateVoucher';
import VoucherList from "./pages/admin/voucher/VoucherList";
import EditProduct from './pages/admin/product/EditProduct';
import CreateDiscount from './pages/admin/discount/CreateDiscount';
import DiscountList from "./pages/admin/discount/DiscountList";
import CreateCategory from "./pages/admin/category/CreateCategory";
import CategoryList from "./pages/admin/category/CategoryList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin dashboard */}
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/admin/products/create-product' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path='/admin/products/edit/:id' element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        <Route path='/admin/products/all-product' element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path='/admin/category/create-category' element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
        <Route path='/admin/category/all-category' element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
        <Route path='/products/create-product' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path='/admin/voucher-discount/create-voucher' element={<ProtectedRoute><CreateVoucher /></ProtectedRoute>} />
        <Route path='/admin/voucher-discount/create-discount' element={<ProtectedRoute><CreateDiscount/></ProtectedRoute>} />
        <Route path='/admin/voucher-discount/all-voucher' element={<ProtectedRoute><VoucherList /></ProtectedRoute>} />
        <Route path='/admin/voucher-discount/all-discount' element={<ProtectedRoute><DiscountList /></ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* Customer */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
