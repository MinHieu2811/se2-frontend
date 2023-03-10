import React, { useEffect, useState } from "react";
import Navbar from "../../ui-component/customer/Navbar";
import Helmet from "../../ui-component/shared/Helmet";
import { ProductModel } from "../../model/product";
import { useToastContext } from "../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../ui-component/toast";
import { axiosInstance } from "../../client-api";
import axios from "axios";
import Loading from "../../ui-component/shared/Loading";
import products from "../../fake-data";
import HeroSlider from "../../ui-component/customer/HeroSlider";
import Collection from "../../ui-component/customer/Collection";
import Grid from "../../ui-component/customer/Grid";
import { AiOutlineShopping, AiFillCreditCard } from "react-icons/ai";
import { BiDiamond } from "react-icons/bi";
import SectionProduct from "../../ui-component/customer/SectionProduct";
import Banner from "../../ui-component/customer/Banner";
import Footer from "../../ui-component/customer/Footer";

type PolicyCard = {
  name: string;
  description: string;
  icon: React.ReactElement;
}[];

const policy: PolicyCard = [
  {
    name: "Miễn phí giao hàng",
    description: "Miễn phí giao hàng với đơn hàng > 239K",
    icon: <AiOutlineShopping style={{ fontSize: "3rem" }} />,
  },
  {
    name: "Thanh toán COD",
    description: "Thanh toán khi nhận hàng (COD)",
    icon: <AiFillCreditCard style={{ fontSize: "3rem" }} />,
  },
  {
    name: "Khách hàng VIP",
    description: "Ưu đãi dành cho khách hàng VIP",
    icon: <BiDiamond style={{ fontSize: "3rem" }} />,
  },
];

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

  return (
    <>
      <Helmet title="SolStore" />
      {loading && <Loading />}
      <Navbar />

      <>
        <HeroSlider productList={products} />
      </>

      <div style={{ margin: "50px 50px" }}>
        <Grid col={3} mdCol={2} smCol={1} gap={20}>
          <>
            {policy?.map((item, index) => (
              <div className="policy-card" key={`card-${index}`}>
                <div className="policy-card_item">{item.icon}</div>
                <div className="policy-card_info">
                  <div className="policy-card_info_title">{item.name}</div>
                  <div className="policy-card_info_description">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </>
        </Grid>
      </div>

      <>
        <Collection />
      </>

      <>
        <SectionProduct title="New Arrivals" products={products} />
      </>

      <>
        <Banner />
      </>

      <>
        <SectionProduct title="Best Sellers" products={products} />
      </>
      
      <>
        <Footer />
      </>
    </>
  );
}

export default Homepage;
