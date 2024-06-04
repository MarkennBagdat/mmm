import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Tabs } from "antd";
import moment from "moment";
import "./App.css";
import "moment/locale/kk"; // Import Kazakh locale
import FloatingButtonsDashboard from "../samePages/Buttons/FloatingButtonsDashboard";
import ServiceBookingForm from "./components/ServiceBookingForm";
import InWork from "./components/Indiviadual/InWork";
import Planned from "./components/Indiviadual/Planned";
import Completed from "./components/Indiviadual/Completed";

moment.locale("kk"); // Set the locale globally to Kazakh

const { Content } = Layout;
const { TabPane } = Tabs;

const items = [
  { key: "1", label: "В работе" },
  { key: "2", label: "Запланированные" },
  { key: "3", label: "Завершенные" },
];

const Dashboard = () => {
  const [date, setDate] = useState(moment());
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [view, setView] = useState("day");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8081/v1/calendar/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Data received:", response.data); 
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the records!", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleAddRecord = newRecord => {
    setData(prevData => [...prevData, newRecord]);
  };

  const onChatClick = () => {};

  const getTabContent = (key) => {
    switch (key) {
      case "1":
        return <InWork data={data.filter(item => item.Type === "Injob")} date={date} setDate={setDate} view={view} setView={setView} />;
      case "2":
        return <Planned data={data.filter(item => item.Type === "Planned")} date={date} setDate={setDate} view={view} setView={setView} />;
      case "3":
        return <Completed data={data.filter(item => item.Type === "Completed")} date={date} setDate={setDate} view={view} setView={setView} />;
      default:
        return null;
    }
  };

  return (
    <Content>
      <ServiceBookingForm
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleAddRecord={handleAddRecord}
      />
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={handleTabChange}
          style={{
            margin: "0 30px 24px",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          {items.map((item) => (
            <TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
        {getTabContent(activeTabKey)}
        <div
          style={{
            marginTop: "24px",
            backgroundColor: "#fff",
            padding: "16px",
          }}
        />
        <FloatingButtonsDashboard
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onChatClick={onChatClick}
        />
      </div>
    </Content>
  );
};

export default Dashboard;
