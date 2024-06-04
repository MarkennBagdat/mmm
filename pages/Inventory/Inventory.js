import React from 'react';
import { Tabs } from 'antd';
import InventoryComponent from './InventoryComponent';
import ReportComponent from './ReportComponent';

const { TabPane } = Tabs;

const Inventory = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Склад" key="1">
      <InventoryComponent />
    </TabPane>
    <TabPane tab="Отчетность" key="2">
      <ReportComponent />
    </TabPane>
  </Tabs>
);

export default Inventory;
