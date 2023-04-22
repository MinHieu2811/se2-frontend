import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { AuthProps } from '../../../model/user'

const Login = () => {
    const [userLogin, setUserLogin] = useState<AuthProps>({email: '', password: ''})

    const handleChange = (e: any) => {
        e.preventDefault();
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row justify-center align-center height-full">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">SIGN IN</h4>
                  <Form.Group className="mb-4">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <Form.Control
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <button className="btn btn-primary mr-2">
                    Submit
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login