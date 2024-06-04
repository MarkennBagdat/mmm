import React, { useState } from "react";
import { Table, Input, Checkbox, DatePicker, Button, Space } from "antd";
import FloatingButtonsEmployee from "../../samePages/Buttons/FloatingButtonsEmployee";
import SearchPanel from "./SearchPanel";
import moment from "moment";

const { Search } = Input;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const data = [
  {
    key: "1",
    name: "Андрей Зимиров",
    position: "Владелец автосервиса",
    phone: "+77758394203",
    startDate: "31.11.2023",
    shifts: 141,
  },
  {
    key: "2",
    name: "Айдос Айдалиев",
    position: "Менеджер филиала",
    phone: "+77015163748",
    startDate: "10.12.2023",
    shifts: 180,
  },
  {
    key: "3",
    name: "Жанна Оразалиева",
    position: "Мойщик",
    phone: "+77758394203",
    startDate: "31.11.2023",
    shifts: 141,
  },
  {
    key: "4",
    name: "Айбек Байганов",
    position: "Мойщик",
    phone: "+77003363754",
    startDate: "11.11.2023",
    shifts: 150,
  },
  // Add other data here
];

const plainOptions = ["Владелец автосервиса", "Менеджер филиала", "Мойщик"];
const defaultCheckedList = [
  "Владелец автосервиса",
  "Менеджер филиала",
  "Мойщик",
];

const DateRangeFilter = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => (
  <div style={{ padding: 8 }}>
    <RangePicker
      value={
        selectedKeys[0]
          ? [moment(selectedKeys[0][0]), moment(selectedKeys[0][1])]
          : []
      }
      onChange={(dates) => setSelectedKeys(dates ? [dates] : [])}
      style={{
        margin: "10px 15px",
        display: "flex",
      }}
    />
    <Space style={{
        padding: "5px 15px",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <Button
        onClick={clearFilters}
        size="small"
        style={{
          border: "none"
        }}
      >
        Сбросить
      </Button>
      <Button
        type="primary"
        onClick={() => confirm()}
        size="small"
        style={{ width: 30, display: "flex",
        justifyContent: "center", alignItems: "center"}}
      >
        OK
      </Button>
    </Space>
  </div>
);

const columns = [
  {
    title: "Имя Фамилия",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Тип сотрудника",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Начало работы",
    dataIndex: "startDate",
    key: "startDate",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <DateRangeFilter
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    ),
    onFilter: (value, record) => {
      if (!value || value.length === 0) return true;
      const recordDate = moment(record.startDate, "DD.MM.YYYY");
      return recordDate.isBetween(value[0], value[1], "days", "[]");
    },
  },
  {
    title: "Кол-во смен",
    dataIndex: "shifts",
    key: "shifts",
    sorter: (a, b) => a.shifts - b.shifts,
  },
  {
    title: " ",
    key: "edit",
    render: () => <a href="#">Ред.</a>,
  },
];

const EmployeesList = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.position.toLowerCase().includes(value.toLowerCase()) ||
        item.phone.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleTypeChange = (list) => {
    setCheckedList(list);
    filterData(list);
  };

  const onCheckAllChange = (e) => {
    const allChecked = e.target.checked ? plainOptions : [];
    setCheckedList(allChecked);
    filterData(allChecked);
  };

  const filterData = (types) => {
    if (types.length === 0) {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) => types.includes(item.position));
      setFilteredData(filtered);
    }
  };

  const onSelectChange = (selectedKeys) => {
    console.log("Selected row keys changed: ", selectedKeys);
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChatClick = () => {};

  return (
    <div>
      <div className="employees_head">
        <SearchPanel onSearch={handleSearch} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div
            className="employee-choice"
            style={{ display: "flex", gap: "16px" }}
          >
            <span className="search-span">Сотрудники:</span>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Все
            </Checkbox>
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={handleTypeChange}
            />
          </div>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      <div
        style={{ marginTop: "24px", backgroundColor: "#fff", padding: "16px" }}
      />
      <FloatingButtonsEmployee
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onChatClick={onChatClick}
      />
    </div>
  );
};

export default EmployeesList;
