import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type Props = {
  children: JSX.Element;
};

const MemoizedNavbar = React.memo(() => <Navbar />)

const Layout = ({ children }: Props) => {
  return (
    <div className="admin">
      <div className="d-flex">
        <div style={{ position: "relative", width: "275px" }}>
          {/* <div className="container-scroller"> */}
            <Sidebar />
          {/* </div> */}
        </div>
        <div className="content" style={{ width: "100%" }}>
          <MemoizedNavbar />
          <div className="main-panel" style={{background: 'black'}}>
            <div className="content-wrapper"  style={{ width: "100%" }}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
