'use client';
import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);
  
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <img
        src="https://assets-v2.lottiefiles.com/a/0e30b444-117c-11ee-9b0d-0fd3804d46cd/BkQxD7wtnZ.gif"
        alt="Not Found"
        className="max-w-full max-h-full"
      />
    </div>
  );
};

export default NotFound;