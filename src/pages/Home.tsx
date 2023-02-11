import React from "react";
import Navbar from "../ui-component/shared/Navbar";
import Footer from "../ui-component/shared/Footer";
import Sidebar from "../ui-component/shared/Sidebar";
import Layout from "../ui-component/shared/Layout";
import Helmet from "../ui-component/shared/Helmet";

const Home = () => {
  return (
    <Layout>
      <>
        <Helmet title="Home" />
        <Navbar />
        <Sidebar />
        <footer>
          <Footer />
        </footer>
      </>
    </Layout>
  );
};

export default Home;
