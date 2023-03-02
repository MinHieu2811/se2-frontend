import React from "react";
import Navbar from "../../ui-component/customer/Navbar";
import Helmet from "../../ui-component/shared/Helmet";

function Homepage() {
  return (
    <>
      <Helmet title="SolStore" />
      <Navbar />
    </>
  );
}

export default Homepage;
