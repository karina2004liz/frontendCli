import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./login.css";
import { history } from "../services/history";

const LoginComponent = (props) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const { email, password } = values;

    AuthService.login(email, password).then(
      () => {
        history.push("/home");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        //setMessage(resMessage);
      }
    );
  };

  return (
    <center>
      <img style={{width:"25%"}} src={"https://pngimg.com/uploads/welcome/welcome_PNG48.png"}></img>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          {loading ? (
            <Spin tip="Loading..."></Spin>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </center>
  );
};

export default LoginComponent;
