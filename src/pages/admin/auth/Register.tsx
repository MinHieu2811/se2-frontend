import React from "react";
import { Form } from "react-bootstrap";

const Register = () => {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row justify-center align-center height-full">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">REGISTER</h4>
                <form className="forms-sample">
                  <Form.Group className="mb-4">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <Form.Control
                      type="text"
                      id="exampleInputUsername1"
                      placeholder="Username"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <Form.Control
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <label htmlFor="exampleInputConfirmPassword1">
                      Confirm Password
                    </label>
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="exampleInputConfirmPassword1"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <button className="btn btn-primary mr-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
