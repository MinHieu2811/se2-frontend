import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Layout from "../../../ui-component/shared/Layout";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import axios from "axios";
import { axiosInstance } from "../../../client-api";
import { ResponseType } from "../../../model/utils";
import { ProductModel } from "../../../model/product";
import Helmet from "../../../ui-component/shared/Helmet";
import Loading from "../../../ui-component/shared/Loading";
import ProductForm from "../../../ui-component/form/ProductForm";

const EditProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useLocation();
  const [productData, setProductData] = useState<ResponseType<ProductModel>>();
  const { toastDispatch } = useToastContext();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const productId = router.pathname.split("/");

    const fetchProductList = async () => {
      setLoading(true);
      await axiosInstance
        .get(`/products/${productId[productId.length - 1]}`, {
          cancelToken: cancelToken.token,
        })
        .then((res) => {
          toastDispatch({
            type: "REMOVE_ALL_AND_ADD",
            payload: {
              type: "is-success",
              content: res.data.msg,
            },
          });
          setLoading(false);
          setProductData(res.data);
        });
    };
    fetchProductList();

    return () => {
      cancelToken.cancel();
    };
  }, [toastDispatch, router.pathname]);

  async function handleSubmit() {}

  return (
    <Layout>
      <>
        {/* {loading && <Loading isFullWidth />} */}
        <Helmet title="Edit" />
        <div className="form-wrapper">
          <ProductForm
            initialData={productData?.data}
            handleSubmit={handleSubmit}
          />
        </div>
      </>
    </Layout>
  );
};

export default EditProduct;
