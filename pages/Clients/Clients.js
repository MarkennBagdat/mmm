import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Table, FloatButton } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import axios from "axios";
import AppHeader from "./component/AppHeader";
import "../../assets/styles/main.scss";
import "../../assets/styles/App.css";
import SearchPanel from "./component/SearchPanel";

const { Content } = Layout;

const Clients = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/clients")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the client data!", error);
      });
  }, []);

  const onSelectChange = (selectedKeys) => {
    console.log("Selected row keys changed: ", selectedKeys);
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChatClick = () => {};

  const handleSearch = (value) => {
    if (!value) {
      // If no search value, reset the filtered data
      setFilteredData(data);
    } else {
      const lowerCaseValue = value.toLowerCase();
      const filtered = data.filter(item =>
        (item.name && item.name.toLowerCase().includes(lowerCaseValue)) ||
        (item.phone && item.phone.toLowerCase().includes(lowerCaseValue)) ||
        (item.car && item.car.toLowerCase().includes(lowerCaseValue)) ||
        (item.number && item.number.toLowerCase().includes(lowerCaseValue)) ||
        (item.bodyType && item.bodyType.toLowerCase().includes(lowerCaseValue))
            );
      setFilteredData(filtered);
    }
    setSearchText(value);
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Машина",
      dataIndex: "car",
      sorter: (a, b) => a.car.localeCompare(b.car),
    },
    {
      title: "Номер",
      dataIndex: "number",
    },
    {
      title: "Тип кузова",
      dataIndex: "bodyType",
      sorter: (a, b) => a.bodyType.localeCompare(b.bodyType),
    },
    {
      title: "Записи",
      dataIndex: "records",
      sorter: (a, b) => a.records.localeCompare(b.records),
    },
  ];

  return (
    <Layout className="layout">
      <AppHeader selectedKey={selectedKey} onSelectKey={setSelectedKey} />
      <Content style={{ marginTop: 64 }}>
      
        <SearchPanel onSearch={handleSearch} />
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={searchText ? filteredData : data}
            className="clients-table"
          />
          <div className="bothButton">
            <FloatButton
              icon={<WechatOutlined />}
              type="default"
              className="samebutton"
              style={{ right: 20 }}
              onClick={onChatClick}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Clients;
