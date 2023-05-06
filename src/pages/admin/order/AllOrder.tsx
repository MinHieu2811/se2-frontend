import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { axiosInstance } from "../../../client-api";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import Loading from "../../../ui-component/shared/Loading";
import { AiFillCheckSquare } from "react-icons/ai";
import Layout from "../../../ui-component/shared/Layout";
import AdminPagination from "../AdminPagination";
import { ResponeOrder, STATUS } from "../../../model/order";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { ProductModel } from "../../../model/product";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";

const OrderList = () => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toastDispatch } = useToastContext();
  const { token } = useAuth();
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    ;(async () => {
      setLoading(true);
      await axiosInstance
        .get("/order", {
          cancelToken: cancelToken.token,
          headers: {
            Authorization: `${token}`,
          },
        })
        .then(async (res) => {
          setOrderList(res.data?.data);
          let listProd: string[] = [];
          const a = res?.data?.data?.map((item: ResponeOrder) => {
            const listPic = item?.products.map((prod) => prod?.id);
            return (listProd = [...listProd, ...listPic]);
          });
          await axiosInstance
            ?.post("/product/ids", { ids: a?.flat() })
            .then((res) => {
              console.log(res?.data?.data);
              setProductList(res?.data?.data);
            });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    })()

    return () => {
      cancelToken.cancel();
    };
  }, [toastDispatch, token]);

  const handleFinishOrder = useCallback(async(orderId: string) => {
    await axiosInstance?.post(`/order/${orderId}/finish`)?.then((res) => {
      if(res?.data?.success) {
        toastDispatch({
          type: REMOVE_ALL_AND_ADD,
          payload: {
            type: 'is-success',
            content: 'Order finished!'
          }
        })
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateCateGrid = (
    products: any[],
    currentPage: number,
    productsPerPage: number
  ) => {

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
          {orderList?.map((item: ResponeOrder) => (
            <tr key={item?.id}>
              <td className="order-table__body id">
                <Link to={`/admin/order/${item?.id}`}>#{item?.id}</Link>
              </td>
              <td className="order-table__body">
                {productList?.map((item: ProductModel) => (
                  <div key={item?.id}>
                    <img
                      src={item?.images[0]}
                      alt={item?.name}
                      className="order-table__img"
                    />
                    <span>{item?.name}</span>
                  </div>
                ))}
              </td>
              <td className="order-table__body">{item?.address}</td>
              <td className="order-table__body">{item?.status as STATUS}</td>
              <td className="order-table__body">
                <button className="order-table__button" style={{padding: "10px", width: "100%"}}
                onClick={() => handleFinishOrder(item?.id)}>
                    <AiFillCheckSquare /> Accept
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
        </div>
        {generateCateGrid(orderList, currentPage, itemsPerPage)}
        <div className="pagination-wrapper" style={{ margin: "20px auto" }}>
          <AdminPagination
            currentPage={currentPage}
            totalPages={Math.ceil(orderList.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default OrderList;
