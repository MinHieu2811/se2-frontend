import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import axios from "axios";
import { axiosInstance } from "../../../client-api";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import Loading from "../../../ui-component/shared/Loading";
import { AiFillDelete } from "react-icons/ai";
import { ResponseData } from "../../../model/product";
import Layout from "../../../ui-component/shared/Layout";
import AdminPagination from "../AdminPagination";
import * as OrderData from "../../customer/orderData.json";
import { Order, OrderStatus } from "../../../model/order";
import { CartModel } from "../../../context/CartProvider";
import { Link } from "react-router-dom";

const fakeData = [
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21,
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21,
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21,
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21,
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21,
  },
];

const OrderList = () => {
  const orderData = [JSON.parse(JSON.stringify(OrderData))];
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productData, setProductData] = useState<ResponseData>();
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchProductList = async () => {
      setLoading(true);
      await axiosInstance
        .get("/products/get-all?page=1&skip=0&take=30", {
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
  }, [toastDispatch]);

  const generateCateGrid = (
    products: any[],
    currentPage: number,
    productsPerPage: number
  ) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return (
      <Table bordered size="xl">
          <thead>
            <tr>
              <th className="order-table__head">Order ID</th>
              <th className="order-table__head">Items</th>
              <th className="order-table__head">Address</th>
              <th className="order-table__head">Status</th>
              <th className="order-table__head">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((item: Order) => (
              <tr key={item?.id}>
                <td className="order-table__body id"><Link to={`/admin/order/${item?.id}`}>#{item?.id}</Link></td>
                <td className="order-table__body">
                  {item?.cart?.items?.map((item: CartModel) => (
                    <div key={item?.product?.id}>
                      <img
                        src={item?.product?.images[0]}
                        alt={item?.product?.name}
                        className="order-table__img"
                      />
                      <span>{item?.product?.name}</span>
                    </div>
                  ))}
                </td>
                <td className="order-table__body">{item?.orderInfo?.address}, {item?.orderInfo?.city}, {item?.orderInfo?.country}</td>
                <td className="order-table__body">{OrderStatus[item?.orderInfo?.status as number]}</td>
                <td className="order-table__body">
                  <button className="order-table__button">
                    <AiFillDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    );
  };
  return (
    <Layout>
      <div className="w-100">
        {loading && <Loading />}
        <div className="list-header d-flex">
          <h1 style={{ flex: 1 }}>All Products</h1>
          <InputGroup style={{ flex: 3, margin: "0px 20px" }}>
            <Form.Control type="text" placeholder="Keyword" />
          </InputGroup>
          <Button style={{ flex: 1 }}>Create New Product</Button>
        </div>
        {generateCateGrid(fakeData, currentPage, itemsPerPage)}
        <div className="pagination-wrapper" style={{ margin: "20px auto" }}>
          <AdminPagination
            currentPage={currentPage}
            totalPages={Math.ceil(fakeData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default OrderList;
