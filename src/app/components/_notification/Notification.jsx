'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { clearNotification } from '@/app/redux/features/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const { alertMessage, alertType } = useSelector((state) => state.notification);

  if (!alertMessage) return null;

  return (
    <div className="fixed top-5 right-5 z-50 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] px-4">
      <Alert
        message={alertMessage}
        type={alertType}
        showIcon
        className="shadow-lg rounded-lg text-sm"
        style={{
          width: '100%',
          padding: '10px 15px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #e0f7ff, #f0faff)',
          color: '#004080',
          border: '1px solid #b3d9ff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      />
      <button onClick={() => dispatch(clearNotification())} className="absolute top-2 right-2 text-white bg-transparent border-none cursor-pointer text-xl">X</button>
    </div>
  );
};

export default Notification;
