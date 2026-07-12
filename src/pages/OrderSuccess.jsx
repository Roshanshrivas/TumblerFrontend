// src/pages/OrderSuccess.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const { orderId } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Order Placed!</h2>
        <p className="text-gray-500 mt-2">Thank you for your purchase. We'll send you a confirmation email shortly.</p>
        {orderId && (
          <p className="text-sm text-gray-400 mt-1">Order ID: #{orderId}</p>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard/orders">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl transition">
              View Orders
            </button>
          </Link>
          <Link to="/">
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2 rounded-xl transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;