import React, { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import axios from "axios";
import { axiosInstance } from "../../../client-api";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { ResponseData } from "../../../model/product";
import Layout from "../../../ui-component/shared/Layout";
import AdminPagination from "../AdminPagination";
import { useNavigate } from "react-router";

const fakeData = [
  {
    _id: "1",
    code: "String",
    decrease_amount: "10%",
    quantity: 21,
    expirydate: "14/2/2023"
  },
  {
    _id: "2",
    code: "String",
    decrease_amount: "50%",
    quantity: 21,
    expirydate: "14/2/2023"
  },
  {
    _id: "3",
    code: "String",
    decrease_amount: "25%",
    quantity: 21,
    expirydate: "14/2/2023"
  },
  {
    _id: "4",
    code: "String",
    decrease_amount: "45%",
    quantity: 21,
    expirydate: "14/2/2023"
  },
  {
    _id: "5",
    code: "String",
    decrease_amount: "22%",
    quantity: 21,
    expirydate: "14/2/2023"
  },

]

const CategoryList = () => {
  const itemsPerPage = 2;
  const [productData, setProductData] = useState<ResponseData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { toastDispatch } = useToastContext();
  const navigate = useNavigate();
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
  const generateCateGrid = (products: any[], currentPage: number, productsPerPage: number) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return (
      <Table striped="column" bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Code</th>
              <th>Category Decrease Amount</th>
              <th>Category Quantity</th>
              <th>Expiry Date</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          {fakeData.length ? fakeData.slice(startIndex, endIndex).map((item) => (
            <tr key={item?._id}>
              <td>{item?._id}</td>
              <td>{item?.code}</td>
              <td>{item?.decrease_amount}</td>
              <td>{item?.quantity}</td>
              <td>{item?.expirydate}</td>
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
    );
  };

  return (
    <Layout>
      <div className="w-100">
        {/* {loading && <Loading />} */}
        <div className="list-header d-flex">
          <h1 style={{flex: 1}}>All Category</h1>
          <InputGroup style={{flex: 2, margin: "0px 20px"}}>
            {/* <Form.Control type="text" placeholder="Keyword"/> */}
          </InputGroup>
          <Button style={{ flex: 0.5}}
                  onClick={() => navigate("/admin/category/create-category")}
          >Create New Category</Button>
        </div>
        {generateCateGrid(fakeData,currentPage,itemsPerPage)}
        <div className="pagination-wrapper" style={{margin: "20px auto"}}>
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

export default CategoryList;
