import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import Sellers from './Components/Sellers/Sellers';
import AddNewProduct from './Components/Sellers/Seller/AddNewProduct/AddNewProduct';
import Products from './Components/Products/Products';
import Seller from './Components/Sellers/Seller/Seller';
import Product from './Components/Products/Product/Product';
import Orders from './Components/Orders/Orders';
import Order from './Components/Orders/Order/Order';
import Reports from './Components/Reports/Reports';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<App />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/sellers/:sellerId" element={<Seller />} />
          <Route path="/sellers/:sellerId/products/add" element={<AddNewProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<Order />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
