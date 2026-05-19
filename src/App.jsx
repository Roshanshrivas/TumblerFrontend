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
import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
// const Login = lazy(() => import('./pages/auth/Login'));
// const Signup = lazy(() => import('./pages/auth/Signup'));
// const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
// const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Layout components
const PublicLayout = () => (
  <>
    <TopBar />
    <Navbar />
    <Outlet />
    {/* <Footer /> */}
  </>
);

const AuthLayout = () => (
  <div className="auth-wrapper">
    <Outlet />
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
      // { path: '/about', element: <LazyComponent Component={About} /> },
    ],
  },
  // {
  //   element: <AuthLayout />,
  //   children: [
  //     { path: '/login', element: <LazyComponent Component={Login} /> },
  //     { path: '/signup', element: <LazyComponent Component={Signup} /> },
  //   ],
  // },
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