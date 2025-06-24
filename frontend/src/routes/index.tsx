import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsList from '../pages/ProductsList';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
