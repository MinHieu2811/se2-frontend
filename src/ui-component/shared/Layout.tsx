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
        <div style={{ position: "relative", width: "280px" }}>
          <div className="sidebar-wrapper" style={{ position: "fixed"}}>
            <Sidebar />
          </div>
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
