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
        <div style={{ position: "relative" }}>
          <div className="container-scroller">
            <Sidebar />
          </div>
        </div>
        <div className="content" style={{ width: "100%" }}>
          <Navbar />
          <div className="main-panel">
            <div className="content-wrapper"  style={{ width: "100%" }}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
