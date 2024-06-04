import React, { useState } from "react";
import { Layout, Form, Input, Button, Rate, Typography, Menu } from "antd";
import { PhoneOutlined, CloseCircleOutlined, WechatOutlined, } from "@ant-design/icons";

const { Content, Header } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const getMenuItemStyle = (isSelected) => ({
  borderBottom: isSelected ? "2px solid rgba(255, 255, 255, 1)" : "none", // Blue bottom border when selected
  color: isSelected ? "rgba(3, 149, 255, 1)" : "rgba(0, 0, 0, 0.65)", // Text color changes on selection
  padding: "0 30px",
});

const Help = () => {
  const [inputValue, setInputValue] = useState("");

  const clearInput = () => {
    setInputValue(""); // Clear the input
    // Additional logic if needed when clearing input
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onChatClick = () => {};

  const [selectedKey, setSelectedKey] = useState("1"); // Assuming '1' corresponds to "Обратная связь"

  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  const [buttonStyle, setButtonStyle] = useState({
    width: "114px",
    height: "40px",
    padding: "6.4px 15px",
    border: "1px solid transparent",
    borderRadius: "2px 0px 0px 0px",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    textAlign: "center",
    background: "rgba(3, 149, 255, 1)",
    color: "#FFFFFF",
    boxShadow: "none",
  });

  const handleMouseEnter = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      // Add hover styles here
      background: "rgba(3, 149, 255, 0.8)", // example hover style
    }));
  };

  const handleMouseLeave = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      // Revert to initial styles here
      background: "rgba(3, 149, 255, 1)",
    }));
  };
  return (
    <Layout>
      <Header style={{ padding: 0, background: "rgba(255, 255, 255, 1)" }}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          style={{ borderBottom: "none", backgroundColor: "transparent" }}
        >
          <Menu.Item key="1" style={getMenuItemStyle(selectedKey === "1")}>
            Обратная связь
          </Menu.Item>
          {/* ...other items... */}
        </Menu>
      </Header>
      <Content
        style={{
          padding: "24px",
          maxWidth: "700px",
          marginTop: "60px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            <span
              style={{
                fontFamily: "Roboto",
                fontSize: "24px",
                fontWeight: 500,
              }}
            >
              Форма обратной связи
            </span>
            <br />
            <span
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              (для тестировщиков)
            </span>
          </Title>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              label={
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Имя
                </span>
              }
              name="name"
              rules={[
                { required: true, message: "Пожалуйста, введите ваше имя!" },
              ]}
              required={false}
            >
              <Input
                placeholder="Введите ваше имя"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                suffix={
                  inputValue && (
                    <CloseCircleOutlined
                      onClick={clearInput}
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        fontSize: "14px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        borderColor: "rgba(217, 217, 217, 1)",
                      }}
                    />
                  )
                }
              />{" "}
            </Form.Item>

            <Form.Item
              label={
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Номер телефона
                </span>
              }
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите ваш номер телефона!",
                },
              ]}
            >
              <Input
                addonBefore={<PhoneOutlined />}
                placeholder="+1 (234) 5678"
                suffix={
                  inputValue && (
                    <CloseCircleOutlined
                      onClick={clearInput}
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        fontSize: "14px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        borderColor: "rgba(217, 217, 217, 1)",
                      }}
                    />
                  )
                }
              />
            </Form.Item>

            <Form.Item
              label={
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Автомойка / детейлинг
                </span>
              }
              name="company"
            >
              <Input
                placeholder="Название компании"
                suffix={
                  inputValue && (
                    <CloseCircleOutlined
                      onClick={clearInput}
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        fontSize: "14px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        borderColor: "rgba(217, 217, 217, 1)",
                      }}
                    />
                  )
                }
              />
            </Form.Item>

            <Form.Item
              label={
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Оценка платформы
                </span>
              }
              name="rating"
            >
              <Rate />
            </Form.Item>

            <Form.Item
              label={
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  {" "}
                  Что думаете о нашей платформе?
                </span>
              }
              name="feedback"
            >
              <TextArea
                rows={4}
                placeholder="Если у вас есть какие-либо жалобы или предложения, пожалуйста, напишите их сюда"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  textAlign: "left",
                }}
                suffix={
                  inputValue && (
                    <CloseCircleOutlined
                      onClick={clearInput}
                      style={{
                        color: "rgba(255, 255, 255, 1)",
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        fontSize: "14px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        borderColor: "rgba(217, 217, 217, 1)",
                      }}
                    />
                  )
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={buttonStyle}
              >
                Отправить
              </Button>
            </Form.Item>
          </Form>
          <div
          style={{
            position: "absolute", // The buttons will be absolutely positioned relative to their parent container.
            right: "20px", // Aligning the buttons to the right side.
            bottom: "20px", // Aligning the buttons to the bottom.
            display: "flex",
            flexDirection: "row", // Align items horizontally.
            alignItems: "center", // Center items vertically.
          }}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<WechatOutlined />}
            size="large"
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)", // Same background color for consistency.
              color: "rgba(3, 149, 255, 1)", // Same icon color for consistency.
              border: "1px solid rgba(0, 0, 0, 0.25)", // Same border styling for consistency.
              boxShadow: "none", // Same flat design.
              width: "70px", // Same button size for consistency.
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={onChatClick}
          />
        </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Help;
