import React from "react";
// import { useParams } from "react-router";
import Layout from "../../ui-component/customer/Layout";
import * as OrderData from "./orderData.json";
import { Order, OrderStatus } from "../../model/order";
import { BsPaypal } from "react-icons/bs";
import { CartModel } from "../../context/CartProvider";

const OrderDetail = () => {
  // const params = useParams();
  const orderData = JSON.parse(JSON.stringify(OrderData)) as Order;

  return (
    <Layout>
      <div className="orderDetail-wrapper">
        <div className="col-5 order-info__user bg-gray">
          <h2 className="left-col__title">
            Order <span>#{orderData?.id}</span>
          </h2>

          <div className="user-info">
            <div className="left col-4">
              <div className="user-info__name user-info__item">Name:</div>
              <div className="user-info__email user-info__item">Email:</div>
              <div className="user-info__phone user-info__item">Phone:</div>
              <div className="user-info__address user-info__item">Address:</div>
              <div className="user-info__payment user-info__item">
                Payment method:
              </div>
              <div className="user-info__status user-info__item">
                Order Status:
              </div>
            </div>
            <div className="right col-8">
              <div className="user-info__name user-info__item">
                {orderData?.orderInfo?.name}
              </div>
              <div className="user-info__email user-info__item">
                {orderData?.orderInfo?.email}
              </div>
              <div className="user-info__phone user-info__item">
                {orderData?.orderInfo?.phone}
              </div>
              <div className="user-info__address user-info__item">
                {orderData?.orderInfo?.address}, {orderData?.orderInfo?.city},{" "}
                {orderData?.orderInfo?.country}
              </div>
              <div className="user-info__payment user-info__item">
                {orderData?.orderInfo?.paymentInfo ? (
                  <BsPaypal size={20} className="mr-2" />
                ) : (
                  <></>
                )}
                {orderData?.orderInfo?.paymentInfo ? "PAYPAL" : "COD"}
              </div>
              <div className="user-info__status user-info__item">
                {OrderStatus[orderData?.orderInfo?.status as number]}
              </div>
            </div>
          </div>
        </div>
        <div className="col-7 order-info__items">
          <h2 className="right-col__title">Items</h2>

          <div className="order-info__cart">
            {orderData?.cart?.items.map(
              ({ product, quantity }: CartModel, index) => (
                <div className="order-info__item" key={`item-${index}`}>
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="order-info__img "
                  />
                  <div className="order-info__data">
                    <p>
                      {product?.name} - {product?.brand}
                    </p>
                    <p>Quantity: {quantity}</p>
                    <p>Price: ${product?.price}</p>
                  </div>
                </div>
              )
            )}
          </div>
          <hr className="my-2"/>
          <div className="order-info__price">
            <div className="left">
              <p>Total items: </p>
              <p>Subtotal:</p>
              <p>Discount code: </p>
              <hr />
              <p>Total: </p>
            </div>
            <div className="right">
              <p>{orderData?.cart?.totalItems}</p>
              <p>${orderData?.cart?.totalPrice}</p>
              <p>Free</p>
              <hr />
              <p>${orderData?.cart?.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
