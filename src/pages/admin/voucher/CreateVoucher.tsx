import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Layout from "../../../ui-component/shared/Layout";

import Helmet from "../../../ui-component/shared/Helmet";
type Props = {};

const CreateVoucher = (props: Props) => {
  const handleChange = () => {};

  return (
    <Layout>
      <>
        <Helmet title="Create New Discount" />
          <div className="card mt-5">
            <div className="card-body height-full">
            <form>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="VoucherCode">Voucher Code</label>
                <Form.Control
                  type="text"
                  name="VoucherCode"
                  className="form-control"
                  id="VoucherCode"
                  placeholder="Voucher Code"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="ProductDesc">Voucher Quantity</label>
                <Form.Control
                  type="text"
                  name="VoucherQuantity"
                  className="form-control"
                  id="VoucherQuantity"
                  placeholder="Voucher Quantity"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-4 width-all">
                <label htmlFor="VoucherDecreaseAmount">Voucher Decrease Amount</label>
                <Form.Control
                  type="text"
                  name="VoucherDecreaseAmount"
                  className="form-control"
                  id="VoucherDecreaseAmount"
                  placeholder="Voucher Decrease Amount"
                  onChange={handleChange}
                />
              </Form.Group>
              <button className="btn btn-primary mr-2 mt-4">Submit</button>
            </form>
            </div>
          </div>
      </>
    </Layout>
  )
}

export default CreateVoucher;
