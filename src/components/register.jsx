import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./login.css";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const openNotification = () => {
  notification.success({
    message: "Successfull",
    description:
      "Your account has been created successfully. Now you can enter with your email and password",
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

const SinginComponent = (props) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const { email, password, name, phone } = values;

    AuthService.register(name, phone, email, password).then(
      () => {
        console.log("salió perrón");
        openNotification();
        props.history.push("/");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
      }
    );
  };

  return (
    <center>
      <img style={{width:"15%",position:"relative"}} src = "https://www.pinclipart.com/picdir/big/75-755148_if-your-referral-joins-before-the-annual-conference.png"></img>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your Phone!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Phone"
          />
        </Form.Item>

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
              Registrar
            </Button>
          )}
        </Form.Item>
      </Form>
    </center>
  );
};

export default SinginComponent;
