// App.jsx – Production Ready
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
// import ProtectedRoute from './components/ProtectedRoute';
import TopBar from './components/TopOffersBar';
import Navbar from './components/Navbar';;
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CustomizePage = lazy(() => import('./pages/CustomizePage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/signup'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetails'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
// const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
// const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

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

// const DashboardLayout = () => (
//   <ProtectedRoute allowedRoles={['user', 'admin']}>
//     <DashboardSidebar />
//     <div className="dashboard-content">
//       <Outlet />
//     </div>
//   </ProtectedRoute>
// );

// const AdminLayout = () => (
//   <ProtectedRoute allowedRoles={['admin']}>
//     <AdminSidebar />
//     <div className="admin-content">
//       <Outlet />
//     </div>
//   </ProtectedRoute>
// );

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
  // {
  //   element: <DashboardLayout />,
  //   children: [
  //     { path: '/dashboard', element: <LazyComponent Component={Dashboard} /> },
  //     { path: '/profile', element: <LazyComponent Component={Profile} /> },
  //   ],
  // },
  // {
  //   element: <AdminLayout />,
  //   children: [
  //     { path: '/admin', element: <Navigate to="/admin/dashboard" /> },
  //     { path: '/admin/dashboard', element: <LazyComponent Component={AdminDashboard} /> },
  //     { path: '/admin/users', element: <LazyComponent Component={Users} /> },
  //   ],
  // },
  // { path: '*', element: <NotFound /> },
]);

const LazyComponent = ({ Component }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

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