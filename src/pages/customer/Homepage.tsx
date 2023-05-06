import React, { useEffect, useState } from "react";
import Helmet from "../../ui-component/shared/Helmet";
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
import Layout from "../../ui-component/customer/Layout";

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
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setLoading(true);
    (async () => {
      try {
        setLoading(true);
        await axiosInstance
          .get("/product?brand=&page=1&sorting=&keyword=", {
            cancelToken: cancelToken.token,
          })
          .then((res) => {
            setLoading(false);
            setAllProducts(res.data?.data);
          });
      } catch (error: any) {
        console.log(error);
      }
    })();

    return () => {
      cancelToken.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <>
        <Helmet title="SolStore" />
        {loading && <Loading />}

        <>
          <HeroSlider productList={allProducts} />
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
          <SectionProduct
            title="New Arrivals"
            products={allProducts?.slice(4, 10)}
          />
        </>

        <>
          <Banner />
        </>

        <>
          <SectionProduct
            title="Best Sellers"
            products={allProducts?.slice(0, 6)}
          />
        </>
      </>
    </Layout>
  );
}

export default Homepage;
