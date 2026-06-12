import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import TopBar from './components/TopOffersBar';
import Navbar from './components/Navbar';;
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProtectedRoute from './components/admin/ProtectedRoute';

import AdminLayout from './pages/admin/AdminLayout';          // <-- new
import AdminDashboard from './pages/admin/AdminDashboard';    // <-- new
import AdminProducts from './pages/admin/Products';  
import AdminCategories from './pages/admin/Categories'         // <-- new
import AdminOrders from './pages/admin/Orders'
import AdminCustomDesigns from './pages/admin/CustomProducts'
import AdminUsers from './pages/admin/Users'
import AdminAnalytics from './pages/admin/Analytics'



// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CustomizePage = lazy(() => import('./pages/CustomizePage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/signup'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetails'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));

// Layout components
const PublicLayout = () => (
  <>
    <TopBar />
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const AuthLayout = () => (
  <div className="min-h-screen">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const LazyComponent = ({ Component }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Suspense fallback={<LoadingSpinner />}><Home /></Suspense> },
      { path: '/customize', element: <Suspense fallback={<LoadingSpinner />}><CustomizePage /></Suspense> },
      { path: '/allproducts', element: <Suspense fallback={<LoadingSpinner />}><ProductsPage /></Suspense> },
      { path: '/product/:id', element: <Suspense fallback={<LoadingSpinner />}><ProductDetailPage /></Suspense> },
      { path: '/cart', element: <Suspense fallback={<LoadingSpinner />}><CartPage /></Suspense> },
      { path: '/wishlist', element: <Suspense fallback={<LoadingSpinner />}><WishlistPage /></Suspense> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense> },
      { path: '/signup', element: <Suspense fallback={<LoadingSpinner />}><Signup /></Suspense> },
      
    ],
  },

    // Admin routes – protected by role check
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <Navigate to="/admin/dashboard" replace /> },
          { path: '/admin/dashboard', element: <LazyComponent Component={AdminDashboard} /> },
          { path: '/admin/products', element: <LazyComponent Component={AdminProducts} /> },
          { path: '/admin/categories', element: <LazyComponent Component={AdminCategories} /> },
          { path: '/admin/orders', element: <LazyComponent Component={AdminOrders} /> },
          { path: '/admin/custom-designs', element: <LazyComponent Component={AdminCustomDesigns} /> },
          { path: '/admin/users', element: <LazyComponent Component={AdminUsers} /> },
          { path: '/admin/analytics', element: <LazyComponent Component={AdminAnalytics} /> },
        ],
      },
    ],
  },
  // 404 fallback (optional)
  // { path: '*', element: <NotFound /> },
]);


function App() {
  return (
    <ErrorBoundary>
      {/* <Provider store={store}> */}
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      {/* </Provider> */}
    </ErrorBoundary>
  );
}

export default App;