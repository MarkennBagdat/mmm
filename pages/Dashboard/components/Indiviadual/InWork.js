import React from "react";
import { Table } from "antd";
import moment from "moment";
import DateNavigation from "../DateNavigationInWork";

const columns = [
  { title: "Марка", dataIndex: "Brand", key: "Brand" },
  { title: "Бокс", dataIndex: "Box", key: "Box" },
  { title: "Номер", dataIndex: "CarNumber", key: "CarNumber" },
  { title: "Сотрудник", dataIndex: "EmployeeId", key: "EmployeeId" },
  { title: "Сумма", dataIndex: "Cost", key: "Cost" },
  { title: "Тип", dataIndex: "Type", key: "Type" },
  { 
    title: "Создано", 
    dataIndex: "CreatedAt", 
    key: "CreatedAt",
    render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') 
  },
  { 
    title: "Завершено", 
    dataIndex: "CompletedAt", 
    key: "CompletedAt",
    render: text => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'Not completed' 
  },
];

const InWork = ({ data, date, setDate, view, setView }) => {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <DateNavigation currentDate={date} setCurrentDate={setDate} view={view} setView={setView} />
      </div>
      <Table dataSource={data} columns={columns} rowKey="Id" />
    </div>
  );
};

export default InWork;