import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Table, Slider, Button, Row } from "antd";
import axios from "axios"; // Import axios
import AppHeader from "./component/AppHeader";
import SearchPanel from "./component/SearchPanel";
import FormSection from "./component/FormSection";
import "../../assets/styles/App.css";
import FloatingButtons from "../samePages/Buttons/FloatingButtonsServices";

const { Content } = Layout;

const getPriceFilterDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => (
  <div style={{ padding: 8 }}>
    <p
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      от 0 до 80000
    </p>
    <Slider
      range
      value={selectedKeys[0] || [0, 80000]} // Default range
      onChange={(value) => setSelectedKeys([value])}
      min={0}
      max={80000} // Set the maximum value based on your data's possible range
      style={{ margin: 8, width: "90%" }}
    />
    <Row justify="end">
      <Button
        type="primary"
        size="small"
        style={{ width: 90, marginRight: 10 }}
        onClick={() => confirm()}
      >
        OK
      </Button>
      <Button size="small" style={{ width: 90 }} onClick={clearFilters}>
        Reset
      </Button>
    </Row>
  </div>
);

const columns = [
  {
    title: "Вид услуг",
    dataIndex: "serviceType",
    key: "serviceType",
    width: 150,
    sorter: (a, b) => a.serviceType.localeCompare(b.serviceType),
    filters: [
      { text: "Химчистка", value: "Химчистка" },
      { text: "Мойка", value: "Мойка" },
      // Add more filters as needed
    ],
    onFilter: (value, record) => record.serviceType.includes(value),
  },
  {
    title: "Название",
    dataIndex: "serviceName",
    key: "serviceName",
    width: 200,
    sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description",
    width: 250,
    sorter: (a, b) => a.description.localeCompare(b.description),
  },
  {
    title: "Прайс",
    children: [
      {
        title: "Легковая",
        dataIndex: "priceCar",
        key: "priceCar",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.priceCar >= value[0] && record.priceCar <= value[1],
      },
      {
        title: "Кроссовер",
        dataIndex: "priceCrossover",
        key: "priceCrossover",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.priceCrossover >= value[0] &&
          record.priceCrossover <= value[1],
      },
      {
        title: "Внедорожник",
        dataIndex: "priceSUV",
        key: "priceSUV",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.priceSUV >= value[0] && record.priceSUV <= value[1],
      },
      {
        title: "Микроавтобус",
        dataIndex: "priceMinibus",
        key: "priceMinibus",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.priceMinibus >= value[0] && record.priceMinibus <= value[1],
      },
    ],
  },
];

const Services = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, []);

  const handleAddService = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  const handleSearch = (value) => {
    const filtered = services.filter(
      (item) =>
        (item.serviceName &&
          item.serviceName.toLowerCase().includes(value.toLowerCase())) ||
        (item.description &&
          item.description.toLowerCase().includes(value.toLowerCase())) ||
        (item.serviceType &&
          item.serviceType.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const onSelectChange = (selectedKeys) => {
    console.log("Selected row keys changed: ", selectedKeys);
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Layout>
      <Layout className="site-layout">
        <AppHeader selectedKey={selectedKey} onSelectKey={setSelectedKey} />
        <Content style={{ marginTop: 64 }}>
          <SearchPanel onSearch={handleSearch} />
          <Table
            rowSelection={rowSelection}
            dataSource={searchText ? filteredData : services}
            columns={columns}
            bordered
            pagination={{ pageSize: 50 }}
            style={{ paddingTop: "20px", borderRadius: "0px" }}
          />
          <FloatingButtons onClickAdd={() => setIsModalVisible(true)} />
        </Content>
      </Layout>
      <FormSection
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onAddService={handleAddService}
      />
    </Layout>
  );
};

export default Services;
