import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const Analytics = () => {
  return (
    <Layout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>Аналитика</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          Содержимое страницы Аналитика
        </div>
      </Content>
    </Layout>
  );
};

export default Analytics;
