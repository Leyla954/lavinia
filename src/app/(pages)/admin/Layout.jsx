"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("isAdminAuthenticated"));
    
    if (!adminToken) {
      router.push("/");
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
