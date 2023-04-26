import React from "react";
import Layout from "../../ui-component/customer/Layout";
import { Table } from "react-bootstrap";
import * as OrderData from "./orderData.json";
import { Order, OrderStatus } from "../../model/order";
import { AiFillDelete } from "react-icons/ai";
import { CartModel } from "../../context/CartProvider";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const orderData = [JSON.parse(JSON.stringify(OrderData))];
  return (
    <Layout>
      <div className="order-wrapper">
        <h1 className="order-wrapper__title">Manage Order</h1>
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
                <td className="order-table__body id"><Link to={`/user/order/${item?.id}`}>#{item?.id}</Link></td>
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
      </div>
    </Layout>
  );
};

export default MyOrders;
