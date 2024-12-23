import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="font-work-sans">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
