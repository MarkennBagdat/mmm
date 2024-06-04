import React from "react";
import { Layout, Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import MyDriveLogo from "../../assets/images/myDrivePrologo.svg";
import { useAuth } from "../contexts/AuthContext";

const { Content } = Layout;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          username: values.username,
          password: hashedPassword,
        }
      );
      const { token } = response.data;
      document.cookie = `token=${token}; Secure; HttpOnly; SameSite=Strict`;
      login(values.username, hashedPassword);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      message.error("Login failed. Please check your username and password.");
    }
  };

  return (
    <Layout className="Login_main">
      <Layout className="site-layout">
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "1000px",
          }}
        >
          <div className="login-form-wrapper">
            <div
              className="login-form-header"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              <div className="logo" style={{ marginBottom: "20px" }}>
                <img src={MyDriveLogo} alt="myDrivePro logo" />
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "/* your desired font size here */",
                }}
              >
                Войти в систему
              </h1>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите ваше имя пользователя!",
                  },
                ]}
                style={{ marginBottom: "20px" }}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Адрес электронной почты"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите ваш пароль!",
                  },
                ]}
                style={{ marginBottom: "20px" }}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Пароль"
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "10px" }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginBottom: "10px" }}
                >
                  Войти
                </Button>
                <div
                  className="login-form-register"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "22px",
                    color: "rgba(103, 101, 101, 1)",
                  }}
                >
                  Еще не зарегистрировались?
                </div>
                <div
                  className="login-form-register"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "22px",
                    color: "rgba(103, 101, 101, 1)",
                    marginTop: "5px",
                  }}
                >
                  Забыли почту или пароль?
                </div>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LoginPage;
