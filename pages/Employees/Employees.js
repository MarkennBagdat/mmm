import React from "react";
import { Layout, Breadcrumb, Tabs } from "antd";
import EmployeesList from "./Parts/EmployeesList";
import SalaryCalculation from "./Parts/SalaryCalculation";
import "../../assets/styles/main.scss";

const { Content } = Layout;
const { TabPane } = Tabs;

const Employees = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", minHeight: 280 }}>
          <Tabs
            defaultActiveKey="1"
          >
            <TabPane tab="Сотрудники" key="1">
              <EmployeesList />
            </TabPane>
            <TabPane tab="Расчет зарплат" key="2">
              <SalaryCalculation />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Employees;
