import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import axios from "axios";
import { axiosInstance } from "../client-api";
import { useToastContext } from "../ui-component/toast/ToastContext";
import Loading from "../ui-component/shared/Loading";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { ResponseData } from "../model/product";
import Layout from "../ui-component/shared/Layout";
import Pagination from "../ui-component/shared/Pagination";

const fakeData = [
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21
  },
  {
    _id: "123123791827",
    name: "String",
    description: "kajshdkjashdkjahdkjsahdkjas",
    price: 123,
    quantity: 21
  },
]

const ProductList = () => {
  const [productData, setProductData] = useState<ResponseData>();
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();

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

  return (
    <Layout>
      <div className="table-wrapper">
        {loading && <Loading />}
        <div className="list-header d-flex">
          <h1 style={{flex: 1}}>All Products</h1>
          <InputGroup style={{flex: 3, margin: "0px 20px"}}>
            <Form.Control type="text" placeholder="Keyword"/>
          </InputGroup>
          <Button style={{ flex: 1}}>Create New Product</Button>
        </div>
        <Table striped="column" bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          {fakeData.length ? fakeData.map((item) => (
            <tr key={item?._id}>
              <td>{item?._id}</td>
              <td>{item?.name}</td>
              <td>{item?.description}</td>
              <td>{item?.price}</td>
              <td>{item?.quantity}</td>
              <td className="d-flex justify-center">
                <Button href={`/admin/products/edit/${item?._id}`} style={{marginRight: "5px"}}>
                  <AiOutlineEdit />
                </Button>
                <Button>
                  <AiFillDelete />
                </Button>
              </td>
            </tr>
          )) : (
            <></>
          )}
        </Table>
        <div className="pagination-wrapper" style={{margin: "20px auto"}}>
          <Pagination totalPage={5} currentPage={2} isAdmin />
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;