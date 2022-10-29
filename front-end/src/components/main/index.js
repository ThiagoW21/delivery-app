import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../../pages/login';
import AdminManage from '../../pages/admin';
import Register from '../../pages/register';
import Navbar from '../navbar';
import Products from '../../pages/products';
import Checkout from '../../pages/checkout';
import Orders from '../../pages/orders';
import OrderDetails from '../../pages/orderDetails';

function Main() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = !['/login', '/register'].includes(location.pathname);

  useEffect(() => {
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    const userData = JSON.parse(localStorage.getItem('user'));

    if (isAuthPage && userData) {
      switch (userData.role) {
      case 'administrator':
        navigate('/admin/manage');
        break;
      case 'seller':
        navigate('/seller/orders');
        break;
      default:
        navigate('/customer/products');
        break;
      }
    }
  }, [location, navigate]);

  return (
    <>
      {
        isHome && <Navbar />
      }
      <Routes>
        <Route exact path="/admin/manage" element={ <AdminManage /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders" element={ <Orders /> } />
        <Route exact path="/seller/orders" element={ <Orders /> } />
        <Route exact path="/seller/orders/:id" element={ <OrderDetails /> } />
        <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route exact path="/" element={ <Navigate to="/login" replace /> } />
      </Routes>
    </>
  );
}

export default Main;
