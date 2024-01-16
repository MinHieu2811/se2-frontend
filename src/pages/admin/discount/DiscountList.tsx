import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import axios from "axios";
import { axiosInstance } from "../../../client-api";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import Loading from "../../../ui-component/shared/Loading";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import Layout from "../../../ui-component/shared/Layout";
import AdminPagination from "../AdminPagination";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";
import { Link } from "react-router-dom";

const DiscountList = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    (async () => {
      setLoading(true);
      await axiosInstance
        .get("/discount", {
          cancelToken: cancelToken.token,
        })
        .then((res) => {
          setProductData(res.data?.data);
        })
        .catch(() => {
          toastDispatch({
            type: REMOVE_ALL_AND_ADD,
            payload: {
              type: "is-danger",
              content: "Something went wrong!",
            },
          });
        })
        .finally(() => {
          setLoading(false);
        });
    })();

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
      <Table striped="column" bordered hover>
        <thead>
          <tr>
            <th>Discount ID</th>
            <th>Product ID</th>
            <th>Expiry Date</th>
            <th>Discount Amount</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        {productData?.length ? (
          productData?.slice(startIndex, endIndex).map((item:any) => (
            <tr key={item?.id}>
              <td>{item?.id}</td>
              <td>{item?.productId}</td>
              <td>{item?.expiryDate}</td>
              <td>{item?.discountAmount}</td>
              <td className="d-flex justify-center">
                <Button style={{ marginRight: "5px" }}>
                  <Link to={`/admin/discount/edit/${item?.id}`}>
                    <AiOutlineEdit />
                  </Link>
                </Button>
                <Button>
                  <AiFillDelete />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </Table>
    );
  };
  return (
    <Layout>
      <div className="w-100">
        {loading && <Loading />}
        <div className="list-header d-flex">
          <h1 style={{ flex: 1 }}>All Discount</h1>
          <InputGroup style={{ flex: 3, margin: "0px 20px" }}>
            <Form.Control type="text" placeholder="Keyword" />
          </InputGroup>
          <Button style={{ flex: 1 }}>Create New Discount</Button>
        </div>
        {generateCateGrid(productData, currentPage, itemsPerPage)}
        <div className="pagination-wrapper" style={{ margin: "20px auto" }}>
          <AdminPagination
            currentPage={currentPage}
            totalPages={Math.ceil(productData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DiscountList;
