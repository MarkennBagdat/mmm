import React, { useState } from "react";
import { Table, Input, Layout, Breadcrumb } from "antd";
import SearchPanel from "./SearchPanel";
import FloatingButtonsInventory from "../samePages/Buttons/FloatingButtonsInventory";

const { Content } = Layout;
const { Search } = Input;

const inventoryData = [
  {
    key: "1",
    number: "1",
    itemName: "Шампунь для мойки",
    name: "Turtle Wax Car Wash Shampoo",
    unit: "литр",
    minStock: 5,
    maxStock: 50,
    pricePerUnit: 2500,
    totalPrice: 12500,
    supplier: "3M Company",
    expiryDate: "20.05.2025",
    note: "",
  },
  {
    key: "2",
    number: "2",
    itemName: "Очиститель стекол",
    name: "Meguiar's Glass Cleaner",
    unit: "литр",
    minStock: 10,
    maxStock: 30,
    pricePerUnit: 1500,
    totalPrice: 15000,
    supplier: "Meguiar's",
    expiryDate: "15.08.2024",
    note: "",
  },
  {
    key: "3",
    number: "3",
    itemName: "Полироль",
    name: "Mothers California Gold",
    unit: "литр",
    minStock: 3,
    maxStock: 20,
    pricePerUnit: 3000,
    totalPrice: 9000,
    supplier: "Mothers",
    expiryDate: "10.12.2024",
    note: "",
  },
  {
    key: "4",
    number: "4",
    itemName: "Воск для автомобиля",
    name: "Chemical Guys Butter Wet Wax",
    unit: "литр",
    minStock: 2,
    maxStock: 15,
    pricePerUnit: 3500,
    totalPrice: 7000,
    supplier: "Chemical Guys",
    expiryDate: "05.03.2025",
    note: "",
  },
  {
    key: "5",
    number: "5",
    itemName: "Очиститель колес",
    name: "Griot's Garage Wheel Cleaner",
    unit: "литр",
    minStock: 8,
    maxStock: 40,
    pricePerUnit: 2000,
    totalPrice: 16000,
    supplier: "Griot's Garage",
    expiryDate: "25.11.2024",
    note: "",
  },
  {
    key: "6",
    number: "6",
    itemName: "Средство для чистки салона",
    name: "Armor All Interior Cleaner",
    unit: "литр",
    minStock: 6,
    maxStock: 25,
    pricePerUnit: 2200,
    totalPrice: 13200,
    supplier: "Armor All",
    expiryDate: "30.09.2025",
    note: "",
  },
  {
    key: "7",
    number: "7",
    itemName: "Автошампунь с воском",
    name: "Rain-X Wash & Wax",
    unit: "литр",
    minStock: 5,
    maxStock: 35,
    pricePerUnit: 2700,
    totalPrice: 13500,
    supplier: "Rain-X",
    expiryDate: "12.07.2024",
    note: "",
  },
  {
    key: "8",
    number: "8",
    itemName: "Средство для ухода за кожей",
    name: "Lexol Leather Conditioner",
    unit: "литр",
    minStock: 4,
    maxStock: 20,
    pricePerUnit: 3200,
    totalPrice: 12800,
    supplier: "Lexol",
    expiryDate: "22.01.2025",
    note: "",
  },
  {
    key: "9",
    number: "9",
    itemName: "Очиститель тормозов",
    name: "CRC Brakleen",
    unit: "литр",
    minStock: 6,
    maxStock: 30,
    pricePerUnit: 1800,
    totalPrice: 10800,
    supplier: "CRC",
    expiryDate: "14.04.2025",
    note: "",
  },
  {
    key: "10",
    number: "10",
    itemName: "Очиститель кузова",
    name: "Adam's Polishes Car Shampoo",
    unit: "литр",
    minStock: 7,
    maxStock: 50,
    pricePerUnit: 2500,
    totalPrice: 17500,
    supplier: "Adam's Polishes",
    expiryDate: "05.06.2024",
    note: "",
  },
  {
    key: "11",
    number: "11",
    itemName: "Салфетки для очистки",
    name: "Detailer’s Pro Series Wipe",
    unit: "упаковка",
    minStock: 15,
    maxStock: 100,
    pricePerUnit: 500,
    totalPrice: 7500,
    supplier: "Detailer’s Pro Series",
    expiryDate: "01.12.2023",
    note: "",
  },
  {
    key: "12",
    number: "12",
    itemName: "Средство для удаления насекомых",
    name: "Bug Remover by CarPro",
    unit: "литр",
    minStock: 3,
    maxStock: 20,
    pricePerUnit: 2800,
    totalPrice: 8400,
    supplier: "CarPro",
    expiryDate: "19.02.2025",
    note: "",
  },
];


const inventoryColumns = [
  {
    title: "Номер",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Наименование товара",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ед. измер.",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Мин. запас",
    dataIndex: "minStock",
    key: "minStock",
  },
  {
    title: "Макс. запас",
    dataIndex: "maxStock",
    key: "maxStock",
  },
  {
    title: "Цена за ед., тг",
    dataIndex: "pricePerUnit",
    key: "pricePerUnit",
  },
  {
    title: "Сумма, тг",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
  {
    title: "Поставщик",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "Срок годности",
    dataIndex: "expiryDate",
    key: "expiryDate",
  },
  {
    title: "Примечание",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "",
    dataIndex: "",
    key: "note",
    render: () => <a href="#">Ред.</a>,
  },
];

const InventoryComponent = () => {
  const [filteredData, setFilteredData] = useState(inventoryData);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = inventoryData.filter(
      (item) =>
        item.itemName.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.supplier.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChatClick = () => {};

  const totalSum = selectedRowKeys.reduce((sum, key) => {
    const item = filteredData.find((data) => data.key === key);
    return sum + (item ? item.totalPrice : 0);
  }, 0);

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", minHeight: 280 }}>
          <SearchPanel onSearch={handleSearch} />
          <Table
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={inventoryColumns}
            pagination={false}
          />
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ marginRight: '8px' }}>Сумма, тг:</span>
            <Input value={totalSum.toFixed(2)} readOnly style={{ width: '150px' }} />
          </div>
        <div
          style={{
            marginTop: "24px",
            backgroundColor: "#fff",
            padding: "16px",
          }}
        />
        <FloatingButtonsInventory
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onChatClick={onChatClick}
        />
      </div>
      </Content>
    </Layout>
  );
};

export default InventoryComponent;
