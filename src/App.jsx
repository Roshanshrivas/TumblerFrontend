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

import AdminLayout from './pages/admin/AdminLayout';        
import AdminDashboard from './pages/admin/AdminDashboard'; 
import AdminProducts from './pages/admin/Products'; 
import ProductDetail from './components/admin/products/ProductDetail';
import ProductForm from './components/admin/products/ProductForm'; 
import AdminCategories from './pages/admin/Categories'
import CategoryDetail from './components/admin/categories/CategoryDetail';
import CategoryForm from './components/admin/categories/CategoryForm';
import AdminOrders from './pages/admin/Orders'
import OrderDetail from './components/admin/orders/OrderDetail';
import OrderForm from './components/admin/orders/OrderForm';
import AdminCustomDesigns from './pages/admin/CustomProducts'

import AdminUsers from './pages/admin/Users'
import AdminAnalytics from './pages/admin/Analytics'
import AdminBroadcast from './pages/admin/AdminBroadcast';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/admin/AdminProfile';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminBanners from './pages/admin/AdminBanners';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSettings from './pages/admin/AdminSettings';

import OrderPrint from './components/admin/orders/OrderPrint';
import TrackOrder from './components/admin/orders/TrackOrder';
import CustomProductForm from './components/admin/customization/CustomProductForm';
import CustomProductDetail from './components/admin/customization/CustomProductDetail';
import BroadcastForm from './components/admin/broadcast/BroadcastForm';



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
      { path: '/about', element: <Suspense fallback={<LoadingSpinner />}><AboutUs /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<LoadingSpinner />}><Contact /></Suspense> },
      { path: '/track/order/:id', element: <TrackOrder /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense> },
      { path: '/signup', element: <Suspense fallback={<LoadingSpinner />}><Signup /></Suspense> },
      { path: '/user/profile', element: <Suspense><UserProfile /></Suspense> },
      
    ],
  },

    // Admin routes – protected by role check
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
        { path: '/admin/orders/:id/print/:type', element: <OrderPrint /> },
        { path: '/admin/orders/:id/print', element: <OrderPrint /> },
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <Navigate to="/admin/dashboard" replace /> },
          { path: '/admin/profile', element: <Suspense><AdminProfile /></Suspense> },
          { path: '/admin/dashboard', element: <LazyComponent Component={AdminDashboard} /> },
          { path: '/admin/products', element: <LazyComponent Component={AdminProducts} /> },
          { path: '/admin/products/add', element: <ProductForm /> },
          { path: '/admin/products/:id', element: <ProductDetail /> },
          { path: '/admin/products/:id/edit', element: <ProductForm /> },
          { path: '/admin/categories', element: <LazyComponent Component={AdminCategories} /> },
          { path: '/admin/categories/add', element: <CategoryForm /> },
          { path: '/admin/categories/:id', element: <CategoryDetail /> },
          { path: '/admin/categories/:id/edit', element: <CategoryForm /> },
          { path: '/admin/orders', element: <LazyComponent Component={AdminOrders} /> },
          { path: '/admin/orders/add', element: <LazyComponent Component={OrderForm} /> },
          { path: '/admin/orders/:id', element: <OrderDetail /> },
          { path: '/admin/orders/:id/edit', element: <OrderForm /> },
          { path: '/admin/custom-products', element: <LazyComponent Component={AdminCustomDesigns} /> },
          { path: '/admin/custom-products/add', element: <CustomProductForm /> },
          { path: '/admin/custom-products/:id', element: <CustomProductDetail /> },
          { path: '/admin/custom-products/:id/edit', element: <CustomProductForm /> },
          { path: '/admin/users', element: <LazyComponent Component={AdminUsers} /> },
          { path: '/admin/analytics', element: <LazyComponent Component={AdminAnalytics} /> },
          { path: '/admin/broadcast', element: <LazyComponent Component={AdminBroadcast} /> },
          { path: '/admin/broadcast/create', element: <BroadcastForm /> },
          { path: '/admin/broadcast/:id/edit', element: <BroadcastForm /> },
          { path: '/admin/coupons', element: <LazyComponent Component={AdminCoupons} /> },
          { path: '/admin/banners', element: <LazyComponent Component={AdminBanners} /> },
          { path: '/admin/reviews', element: <LazyComponent Component={AdminReviews} /> },
          { path: '/admin/settings', element: <LazyComponent Component={AdminSettings} /> },
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