import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="d-flex">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="content" style={{ width: "100%" }}>
          <Navbar />
          <>{children}</>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
