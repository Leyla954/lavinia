import React from 'react';
import { Modal, Button } from 'antd';
import { useRouter } from 'next/navigation';

const AuthModal = ({ visible, onClose }) => {
  const router = useRouter();

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="shadow-2xl shadow-green-500/80"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Please login</h2>
      <div className="flex justify-center gap-4">
        <Button type="primary" className="text-black bg-green-200 shadow-lg shadow-green-500/80 border-none" onClick={() => router.push('/log-in/login')}>Login</Button>
        <Button type="default" className="border-green-100 shadow-lg shadow-green-500/80" onClick={() => router.push('/log-in/signup')}>Sign Up</Button>
      </div>
    </Modal>
  );
};

export default AuthModal;
