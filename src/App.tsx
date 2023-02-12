import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './ui-component/shared/ProtectedRoute';
import CreateProduct from './pages/CreateProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/products/create-product' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
