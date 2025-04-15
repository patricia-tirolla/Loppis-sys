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
import OrderItems from './Components/Orders/OrderItems/OrderItems';
import Reports from './Components/Reports/Reports';
import Layout from './Components/Layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/sellers/:sellerId" element={<Seller />} />
          <Route path="/sellers/:sellerId/products/add" element={<AddNewProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId/orderItems" element={<OrderItems />} />
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
