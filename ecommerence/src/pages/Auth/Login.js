import React, { useState } from "react";
import { Col, Input, Row, Button, message, Form } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const initialState = { 
  email: "",
  password: "",
};
export default function Login() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setUserFromToken } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleSubmit = () => {
    const {  email, password } = state;
     
     email.trim();
     password.trim();
    if ( !email || !password) {
      return message.error("All fields are required");
    }
    
    if (password.length < 6) {
      return message.error("Password must be greater than 6 characters");
    }
    if (!isValidEmail(email)) {
      return message.error("Invalid email format");
    }
    setIsProcessing(true);
    axios.post("http://localhost:8000/auth/login", {
       
        email,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        console.log("backend res", response.data);
        localStorage.setItem("token", token);
        setUserFromToken(token);
        setIsProcessing(false);
        
        message.success("Login successful");
       
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response.data.message);
      })
      .finally(() => {
        setIsProcessing(false);
        setState(initialState);
      });
  };

  return (
    <>
      <div className="container min-vh-100   d-flex justify-content-center align-items-center">
        <div className="card shadow p-3 border-none" style={{ width: 500 }}>
          <h1 className="text-center mb-4">Login</h1>
          <Form>
            <Row gutter={[14, 14]}>
             
              <Col size="large" span={20} offset={2}>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  name="email"
                  value={state.email}
                  prefix={<MailOutlined />}
                />
              </Col>
              <Col size="large" span={20} offset={2}>
              <span style={{ float: "right" }}><Link to='/auth/forgot-password'>Forgot Password?</Link></span>
                <Input.Password
                  type="text"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  name="password"
                  value={state.password}
                  prefix={<LockOutlined />}
                />
              </Col>
              <Col size="large" span={20} offset={2}>
                <Button
                  type="primary"
                  loading={isProcessing}
                  onClick={handleSubmit}
                  block
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={20} offset={2}>
              <p className="text-center py-2">
                Create a new account <Link to="/auth/register">Register</Link>{" "}
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}


