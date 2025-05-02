import React, { useState } from "react";
import { Col, Input, Row, Button, message, Form, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

const initialState = {
  email: "",
  newPassword: "",
  conformPassword: "",
};

export default function ForgotPassword() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));

    if (name === "newPassword") {
      validatePassword(value);
    }

    if (name === "conformPassword" || name === "newPassword") {
      if (state.conformPassword && name === "newPassword" && state.conformPassword !== value) {
        setPasswordMatchError("Passwords do not match");
      } else if (state.newPassword && name === "conformPassword" && state.newPassword !== value) {
        setPasswordMatchError("Passwords do not match");
      } else {
        setPasswordMatchError("");
      }
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasSpecialCharacter = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!hasSpecialCharacter(password)) {
      setPasswordError("Password must contain at least one special character");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = () => {
    const { email, newPassword } = state;
    if (!email.trim() || !newPassword.trim()) {
      return message.error("All fields are required");
    }
    if (passwordError || passwordMatchError) {
      return message.error(passwordError || passwordMatchError);
    }
    if (!isValidEmail(email)) {
      return message.error("Invalid email format");
    }

    setIsProcessing(true);
    axios
      .post("https://ecommerence-backend-9kv6.vercel.app/auth/forgot-password", {
        email,
        newPassword,
      })
      .then((response) => {
       
        message.success("Update Password successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      })
      .finally(() => {
        setIsProcessing(false);
        setState(initialState);
      });
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-3 border-none" style={{ width: 500 }}>
        <h1 className="text-center mb-4">Forgot Password</h1>
        <Form>
          <Row gutter={[20, 20]}>
            <Col span={20} offset={2}>
              <Input
                type="text"
                placeholder="Enter your email"
                onChange={handleChange}
                name="email"
                value={state.email}
                prefix={<MailOutlined />}
              />
            </Col>
            <Col span={20} offset={2}>
              <Input.Password
                placeholder="Enter new password"
                onChange={handleChange}
                name="newPassword"
                value={state.newPassword}
                prefix={<LockOutlined />}
              />
              {passwordError && (
                <Text type="danger" className="mt-1  d-block" style={{fontSize:"12px"}}>
                  {passwordError}
                </Text>
              )}
            </Col>
            <Col span={20} offset={2}>
              <Input.Password
                placeholder="Confirm password"
                onChange={handleChange}
                name="conformPassword"
                value={state.conformPassword}
                prefix={<LockOutlined />}
              />
              {passwordMatchError && (
                <Text type="danger" className="mt-1 d-block">
                  {passwordMatchError}
                </Text>
              )}
            </Col>
            <Col span={20} offset={2}>
              <Button
                type="primary"
                loading={isProcessing}
                onClick={handleSubmit}
                block
                disabled={!!passwordError || !!passwordMatchError}
              >
               Update Password
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={24}>
            <p className="text-center py-2">
              Already have an account? <Link to="/auth/login">Login</Link>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
