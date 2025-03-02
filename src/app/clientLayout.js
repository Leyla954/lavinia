"use client";
import { useState, useEffect } from "react";
import Header from "./components/_header/Header";
import Footer from "./components/_footer/Footer";
import Loading from "./loading";
import { Providers } from "./redux/provider";
import Notification from "./components/_notification/Notification";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-white">
        <Loading />
      </div>
    );
  }

  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
     <Providers>
     {!isAdminPage && <Header />}
      <div className="flex-1 flex flex-col">
        <Notification />
        <main className="flex-1">{children}</main>
      </div>
      {!isAdminPage && <Footer />}
    </Providers>
    </>
  );
}