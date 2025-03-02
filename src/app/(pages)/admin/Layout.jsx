"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AdminLayout;
