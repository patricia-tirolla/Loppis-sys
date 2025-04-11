import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import Sellers from './Pages/Sellers/Sellers';
import AddNewProduct from './Pages/Sellers/AddNewProduct';
import Products from './Pages/Products/Products';
import Seller from './Pages/Sellers/Seller';
import Product from './Pages/Products/Product';
import Orders from './Pages/Orders/Orders';
import OrderItems from './Pages/Orders/OrderItems/OrderItems';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sellers/:sellerId" element={<Seller />} />
        <Route path="/sellers/:sellerId/products/add" element={<AddNewProduct />}/>
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<Product />}/>
        <Route path='/orders' element={<Orders />}/>
        <Route path='/orders/:orderId/orderItems' element={<OrderItems />}/>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
