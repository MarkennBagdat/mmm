import React from 'react';
import { Menu, Layout } from 'antd';

const { Header } = Layout;

const AppHeader = ({ selectedKey, onSelectKey }) => (
  <Header className="header_clients">
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      onClick={onSelectKey}
      className="main-menu"
      style={{ borderBottom: "none", backgroundColor: "transparent", gap: "20px" }}
    >
      <Menu.Item className="menu-item-feedback">
      База клиентов
      </Menu.Item>
    </Menu>
  </Header>
);

export default AppHeader;
