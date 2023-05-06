import React, { useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import Layout from "../../../ui-component/shared/Layout";

import Helmet from "../../../ui-component/shared/Helmet";
import { Voucher } from "../../../model/order";
import ReactDatePicker from "react-datepicker";
import { axiosInstance } from "../../../client-api";
import { useToastContext } from "../../../ui-component/toast/ToastContext";
import { REMOVE_ALL_AND_ADD } from "../../../ui-component/toast";
const initial = {
  code: "",
  value: 0,
  minimumApplicablePrice: 0,
  quantity: 0,
  expiredAt: new Date().toISOString(),
  visibility: "public" as "public",
};

const CreateVoucher = () => {
  const { toastDispatch } = useToastContext();
  const [initVoucher, setInitVoucher] = useState<Voucher>(initial);
  const handleChange = (e: any) => {
    e.preventDefault();
    setInitVoucher({
      ...initVoucher,
      [e.target.name]: e?.target?.value as string,
    });
  };

  const handleSubmit = useCallback(async () => {
    await axiosInstance
      .post("/voucher", initVoucher)
      .then(() => {
        setInitVoucher(initial);
        toastDispatch({
          type: REMOVE_ALL_AND_ADD,
          payload: {
            type: "is-success",
            content: "Voucher uploaded",
          },
        });
      })
      .catch((err) => {
        setInitVoucher(initial);
        toastDispatch({
          type: REMOVE_ALL_AND_ADD,
          payload: {
            type: "is-danger",
            content: "Voucher uploaded",
          },
        });
      });
  }, [initVoucher, toastDispatch]);

  return (
    <Layout>
      <>
        <Helmet title="Create New Discount" />
        <div className="card w-100">
          <div className="card-body">
            <Form.Group className="mb-4 width-all">
              <label htmlFor="minimumApplicablePrice">Minimum Price</label>
              <Form.Control
                type="number"
                name="minimumApplicablePrice"
                className="form-control"
                id="VoucherCode"
                value={initVoucher?.minimumApplicablePrice}
                placeholder="Minimum price to apply"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="quantity">Voucher Quantity</label>
              <Form.Control
                type="text"
                name="quantity"
                value={initVoucher?.quantity}
                className="form-control"
                id="quantity"
                placeholder="Voucher Quantity"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4 width-all">
              <label htmlFor="value">Voucher Decrease Amount</label>
              <Form.Control
                type="text"
                name="value"
                className="form-control"
                value={initVoucher?.value}
                id="value"
                placeholder="Voucher Decrease Amount"
                onChange={handleChange}
              />
            </Form.Group>
            <ReactDatePicker
              selected={new Date(initVoucher?.expiredAt as string)}
              onChange={(date) =>
                setInitVoucher({
                  ...initVoucher,
                  expiredAt: date?.toISOString() as string,
                })
              }
              placeholderText="MM/DD/YYYY"
            />
            <button
              className="btn btn-primary mr-2 mt-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateVoucher;
