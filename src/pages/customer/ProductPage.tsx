import React, { useCallback, useEffect, useRef, useState } from "react";
import Helmet from "../../ui-component/shared/Helmet";
import { ProductModel } from "../../model/product";
import { ResponseType } from "../../model/utils";
import QuantityInput from "../../ui-component/customer/QuantityInput";
import products from "../../fake-data";
import { useNavigate, useParams } from "react-router";
import Layout from "../../ui-component/customer/Layout";
import { BiArrowBack } from "react-icons/bi";
import { useCart } from "../../context/CartProvider";
// import { useToastContext } from '../../ui-component/toast/ToastContext'
// import axios from 'axios'
// import { axiosInstance } from '../../client-api'
// import { REMOVE_ALL_AND_ADD } from '../../ui-component/toast'

function ProductPage() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const navigate = useNavigate();
  const params = useParams();
  const { addToCartHandler } = useCart();

  const initialState = products.find(
    (item) => item?.id === params?.productId
  ) as ProductModel;
  const [productInfo, setProductInfo] = useState<
    ResponseType<ProductModel> | undefined
  >(
    {
      data: initialState,
      success: true,
    } || {}
  );
  function handleBack() {
    navigate(-1);
  }

  const addToCart = () => {
    if (addToCartHandler && productInfo?.data)
      addToCartHandler(productInfo?.data, quantity);
  };

  const increase = useCallback(() => {
    if (productInfo?.data) {
      setQuantity((prev) =>
        prev + 1 > productInfo?.data?.amount
          ? productInfo?.data?.amount
          : prev + 1
      );
    }
  }, [productInfo?.data]);

  const decrease = useCallback(() => {
    if (productInfo?.data) {
      setQuantity((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    }
  }, [productInfo?.data]);

  const handleExpand = () => {
    expandRef?.current?.classList.toggle("expand");
    if (btnRef.current && expandRef?.current?.classList.contains("expand")) {
      btnRef.current.innerHTML = "Collapse";
    } else {
      if (btnRef?.current) {
        btnRef.current.innerHTML = "Expand";
      }
    }
  };

  // const [loading, setLoading] = useState<boolean>(false)
  // const { toastDispatch } = useToastContext();
  //   useEffect(() => {
  //     const cancelToken = axios.CancelToken.source();
  //     setLoading(true);
  //     (async () => {
  //       try {
  //         setLoading(true);
  //         await axiosInstance
  //           .get("/products/get-all?page=1&skip=0&take=30", {
  //             cancelToken: cancelToken.token,
  //           })
  //           .then((res) => {
  //             toastDispatch({
  //               type: "REMOVE_ALL_AND_ADD",
  //               payload: {
  //                 type: "is-success",
  //                 content: res.data.msg,
  //               },
  //             });
  //             setLoading(false);
  //             setProductInfo(res.data);
  //           });
  //       } catch (error: any) {
  //         toastDispatch({
  //           type: REMOVE_ALL_AND_ADD,
  //           payload: {
  //             type: "is-warning",
  //             content: error.msg,
  //           },
  //         });
  //       }
  //     })();

  //     return () => {
  //       cancelToken.cancel();
  //     };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const MemoizedQtyInput = React.memo(() => {
    return productInfo?.data?.amount ? (
      <QuantityInput
        label=""
        className="mb-0"
        isHorizontal
        value={quantity}
        product={productInfo?.data}
        increase={increase}
        decrease={decrease}
      />
    ) : (
      <span className="product-info-wrapper_info_quantity_form_title">
        Out of stock
      </span>
    );
  });
  return (
    <Layout>
      <>
        <Helmet title={productInfo?.data?.name || ""} />
        <div className="product-info-wrapper" style={{ minHeight: "80vh" }}>
          <div className="product-info-wrapper_img_container col-7">
            <div className="product-info-wrapper_img_container_main">
              <div className="navigate-back" onClick={handleBack}>
                <BiArrowBack /> Back
              </div>
              <img
                src={productInfo?.data?.image[0]}
                className="pic1"
                alt={productInfo?.data?.name}
              />
              <img
                src={productInfo?.data?.image[1]}
                className="pic2"
                alt={productInfo?.data?.name}
              />
            </div>
            <div className={`product-description`} ref={expandRef}>
              <div className="product-description_title">Product details</div>
              <div
                className="product-description_content"
                dangerouslySetInnerHTML={{
                  __html:
                    productInfo?.data?.name +
                    " " +
                    productInfo?.data?.description +
                    productInfo?.data?.description,
                }}
              ></div>
              <div
                className="product-description_toggle"
                onClick={handleExpand}
              >
                <button ref={btnRef}>Expand</button>
              </div>
            </div>
          </div>
          <div className="product-info-wrapper_info col-5">
            <div className="product-info-wrapper_info_name">
              <h1 className="name">{productInfo?.data?.name}</h1>
            </div>
            <div className="product-info-wrapper_info_branch">
              <span className="branch">{productInfo?.data?.brand}</span>
            </div>
            <div className="product-info-wrapper_info_price">
              <span className="price">Price: ${productInfo?.data?.price}</span>
            </div>
            <div className="product-info-wrapper_info_quantity">
              <div className="product-info-wrapper_info_quantity_form">
                <span className="product-info-wrapper_info_quantity_form_title">
                  Quantity:{" "}
                </span>
                <MemoizedQtyInput />
              </div>
            </div>
            <div className="product-info-wrapper_info_btn">
              <button
                className="btn"
                disabled={quantity === 0}
                onClick={addToCart}
                style={{ marginRight: "10px" }}
              >
                Add to cart
              </button>
              <button className="btn">Add to wishlist</button>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default ProductPage;
