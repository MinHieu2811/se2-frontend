import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Layout from "../../../ui-component/shared/Layout";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import axios from "axios";
import { axiosInstance } from "../../../client-api";
import Helmet from "../../../ui-component/shared/Helmet";
import ProductForm from "../../../ui-component/form/ProductForm";

const EditProduct = () => {
  const [, setLoading] = useState<boolean>(false);
  const router = useLocation();
  const [productData, setProductData] = useState();
  const { toastDispatch } = useToastContext();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const productId = router.pathname.split("/");

    (async () => {
      setLoading(true);
      await axiosInstance
        .get(`/product/${productId[productId.length - 1]}`, {
          cancelToken: cancelToken.token,
        })
        .then((res) => {
          setProductData(res?.data?.data);
        })
        .catch(() => {
          console.log("Something went wrong");
        })
        .finally(() => {
          setLoading(false);
        });
    })();

    return () => {
      cancelToken.cancel();
    };
  }, [toastDispatch, router.pathname]);


  return (
    <Layout>
      <>
        {/* {loading && <Loading isFullWidth />} */}
        <Helmet title="Edit" />
        <div className="form-wrapper">
          {productData && (
            <ProductForm
              initialData={productData}
            />
          )}
        </div>
      </>
    </Layout>
  );
};

export default EditProduct;
