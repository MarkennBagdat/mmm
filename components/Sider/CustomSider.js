import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Button, Divider } from "antd";
import {
  LayoutOutlined,
  ProfileOutlined,
  CarOutlined,
  PieChartOutlined,
  ToolOutlined,
  TeamOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
  UserOutlined,
  UpOutlined,
} from "@ant-design/icons";

const CustomSider = ({ collapsed, toggleCollapsed, isLoggedIn }) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("Рус"); // Default to Russian

  // const handleLanguageChange = (language) => {
  //   setSelectedLanguage(language);
  // };

  const handleItemClick = (e) => {
    navigate(e.key);
  };
  return (
    <div className="sider_items">
      <div className="demo-logo-vertical">
        {/* Кнопка для сворачивания/разворачивания Sider */}
        <Button
          type="text"
          icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
          onClick={toggleCollapsed}
          style={{
            margin: "20px 0px 10px", // Consistent margin regardless of collapse state
            left: collapsed ? "21px" : "16px", // Adjust according to the sider's padding when collapsed or expanded
          }}
        />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "/", // Matches the route path for Dashboard
            icon: <LayoutOutlined />,
            label: "Записи",
          },
          {
            key: "/services", // Matches the route path for Services
            icon: <ProfileOutlined />,
            label: "Услуги",
          },
          {
            key: "/clients", // Matches the route path for Clients
            icon: <CarOutlined />,
            label: "Клиенты",
          },
          {
            key: "/analytics", // Matches the route path for Analytics
            icon: <PieChartOutlined />,
            label: "Аналитика",
          },
          {
            key: "/inventory", // The key should match the route path for Inventory
            icon: <ToolOutlined />,
            label: "Склад",
          },
          {
            key: "/employees", // The key should match the route path for Employees
            icon: <TeamOutlined />,
            label: "Сотрудники",
          },
          {
            key: "/settings", // The key should match the route path for Settings
            icon: <SettingOutlined />,
            label: "Настройки",
          },
          {
            key: "/help", // The key should match the route path for Help
            icon: <QuestionCircleOutlined />,
            label: "Помощь",
          },
          {
            key: "/login", // The key should match the route path for Help
          },
        ]}
        onClick={handleItemClick}
      />

      <Divider />
      {/* <div className="language-selection">
        {collapsed ? (
          <Button style={{
            left: collapsed ? "21px" : "16px", // Adjust according to the sider's padding when collapsed or expanded
          }}>{selectedLanguage}</Button>
        ) : (
          <>
            <Button
              style={{ marginLeft: 24, marginRight: 8 }}
              onClick={() => handleLanguageChange("Рус")}
            >
              Рус
            </Button>
            <Button
              style={{ marginRight: 8 }}
              onClick={() => handleLanguageChange("Eng")}
            >
              Eng
            </Button>
            <Button onClick={() => handleLanguageChange("Каз")}>Каз</Button>
          </>
        )}
      </div> */}

      {isLoggedIn && (
        <div className="user-info">
          <div className="user-icon-bg">
            <UserOutlined className="user-icon" />
          </div>
          <div className="user-details">
            <div className="user-name">Вы</div>
            <div className="user-role">Административная роль</div>
          </div>
          <div className="user-action">
            <UpOutlined />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSider;
