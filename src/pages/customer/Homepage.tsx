import React, { useEffect, useState } from "react";
import Navbar from "../../ui-component/customer/Navbar";
import Helmet from "../../ui-component/shared/Helmet";
import { ProductModel } from "../../model/product";
import { useToastContext } from "../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../ui-component/toast";
import { axiosInstance } from "../../client-api";
import axios from "axios";
import Loading from "../../ui-component/shared/Loading";
import products from '../../fake-data'
import HeroSlider from "../../ui-component/customer/HeroSlider";

function Homepage() {
  const [allProducts, setAllProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();
  // useEffect(() => {
  //   const cancelToken = axios.CancelToken.source();
  //   setLoading(true);
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       await axiosInstance
  //         .get("/products/get-all?page=1&skip=0&take=30", {
  //           cancelToken: cancelToken.token,
  //         })
  //         .then((res) => {
  //           toastDispatch({
  //             type: "REMOVE_ALL_AND_ADD",
  //             payload: {
  //               type: "is-success",
  //               content: res.data.msg,
  //             },
  //           });
  //           setLoading(false);
  //           setAllProducts(res.data);
  //         });
  //     } catch (error: any) {
  //       toastDispatch({
  //         type: REMOVE_ALL_AND_ADD,
  //         payload: {
  //           type: "is-warning",
  //           content: error.msg,
  //         },
  //       });
  //     }
  //   })();

  //   return () => {
  //     cancelToken.cancel();
  //   };
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  console.log(loading)
  return (
    <>
      <Helmet title="SolStore" />
      {loading && <Loading />}
      <Navbar />

      <>
        <HeroSlider productList={products}/>
      </>
    </>
  );
}

export default Homepage;
