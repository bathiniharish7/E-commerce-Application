import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/Loader/Loader';


// Lazy loaded pages
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const CartPage = lazy(() => import('../pages/CartPage/CartPage'));

function AppRoutes() {
  return (
    <Suspense fallback={<p></p>}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
