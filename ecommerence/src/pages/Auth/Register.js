import React, { useState } from "react";
import { Col, Input, Row, Button, message, Form, Typography } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const { Text } = Typography;

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // Track password error
  const { setUserFromToken } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));

    // Password validation in real-time
    if (name === "password") {
      validatePassword(value);
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
      setPasswordError(""); // Clear error if password is valid
    }
  };

  const handleSubmit = () => {
    const { userName, email, password } = state;
    if (!userName.trim() || !email.trim() || !password.trim()) {
      return message.error("All fields are required");
    }
    if (userName.length < 2) {
      return message.error("Name must be greater than 3 characters");
    }
    if (passwordError) {
      return message.error(passwordError); // Prevent form submission if error exists
    }
    if (!isValidEmail(email)) {
      return message.error("Invalid email format");
    }

    setIsProcessing(true);
    axios
      .post("https://ecommerence-backend-9kv6.vercel.app/auth/register", {
        userName,
        email,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setUserFromToken(token);
        message.success("User registered successfully");
        navigate("/");
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
        <h1 className="text-center mb-4">Register</h1>
        <Form>
          <Row gutter={[20, 20]}>
            <Col span={20} offset={2}>
              <Input
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
                name="userName"
                value={state.userName}
                prefix={<UserOutlined />}
              />
            </Col>
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
                placeholder="Enter your password"
                onChange={handleChange}
                name="password"
                value={state.password}
                prefix={<LockOutlined />}
              />
              {/* Show real-time password error */}
              {passwordError && (
                <Text type="danger" className="mt-1 d-block">
                  {passwordError}
                </Text>
              )}
            </Col>
            <Col span={20} offset={2}>
              <Button
                type="primary"
                // style={{background:"#fb8500",color:"white"}}
                loading={isProcessing}
                onClick={handleSubmit}
                block
                disabled={!!passwordError} // Disable button if error exists
              >
                Register
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
