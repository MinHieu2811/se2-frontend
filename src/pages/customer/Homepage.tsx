import React, { useEffect, useState } from "react";
import Helmet from "../../ui-component/shared/Helmet";
import { axiosInstance } from "../../client-api";
import axios, { CancelTokenSource } from "axios";
import Loading from "../../ui-component/shared/Loading";
import HeroSlider from "../../ui-component/customer/HeroSlider";
import Collection from "../../ui-component/customer/Collection";
import Grid from "../../ui-component/customer/Grid";
import { AiOutlineShopping, AiFillCreditCard } from "react-icons/ai";
import { BiDiamond } from "react-icons/bi";
import SectionProduct from "../../ui-component/customer/SectionProduct";
import Banner from "../../ui-component/customer/Banner";
import Layout from "../../ui-component/customer/Layout";
import products from "../../fake-data";
import { ProductModel } from "../../model/product";

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

  const handleFetchProduct = async ({
    cancelToken,
  }: {
    cancelToken: CancelTokenSource;
  }) => {
    try {
      setLoading(true);
      await axiosInstance
        .get("/product?brand=&page=1&sorting=&keyword=", {
          cancelToken: cancelToken.token,
        })
        .then((res) => {
          setLoading(false);
          setAllProducts(products);
        });
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    handleFetchProduct({ cancelToken });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <Layout>
      <>
        <Helmet title="SolStore" />
        {loading && <Loading />}

        <HeroSlider productList={allProducts} />

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
