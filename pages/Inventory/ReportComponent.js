import React, { useState } from 'react';
import { Table, DatePicker, Layout, Breadcrumb, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const reportData = [
  {
    key: '1',
    number: '1',
    itemName: 'Шампунь для мойки',
    initialQty: 6,
    initialSum: 6000,
    receivedQty: 6,
    receivedSum: 6000,
    consumedQty: 6,
    consumedSum: 6000,
    finalQty: 6,
    finalSum: 6000,
  },
  {
    key: '2',
    number: '2',
    itemName: 'Очиститель стекол',
    initialQty: 10,
    initialSum: 15000,
    receivedQty: 5,
    receivedSum: 7500,
    consumedQty: 7,
    consumedSum: 10500,
    finalQty: 8,
    finalSum: 12000,
  },
  {
    key: '3',
    number: '3',
    itemName: 'Полироль',
    initialQty: 8,
    initialSum: 24000,
    receivedQty: 4,
    receivedSum: 12000,
    consumedQty: 5,
    consumedSum: 15000,
    finalQty: 7,
    finalSum: 21000,
  },
  {
    key: '4',
    number: '4',
    itemName: 'Воск для автомобиля',
    initialQty: 3,
    initialSum: 10500,
    receivedQty: 2,
    receivedSum: 7000,
    consumedQty: 2,
    consumedSum: 7000,
    finalQty: 3,
    finalSum: 10500,
  },
  {
    key: '5',
    number: '5',
    itemName: 'Очиститель колес',
    initialQty: 15,
    initialSum: 30000,
    receivedQty: 10,
    receivedSum: 20000,
    consumedQty: 12,
    consumedSum: 24000,
    finalQty: 13,
    finalSum: 26000,
  },
  {
    key: '6',
    number: '6',
    itemName: 'Средство для чистки салона',
    initialQty: 12,
    initialSum: 26400,
    receivedQty: 6,
    receivedSum: 13200,
    consumedQty: 8,
    consumedSum: 17600,
    finalQty: 10,
    finalSum: 22000,
  },
  {
    key: '7',
    number: '7',
    itemName: 'Автошампунь с воском',
    initialQty: 9,
    initialSum: 24300,
    receivedQty: 5,
    receivedSum: 13500,
    consumedQty: 7,
    consumedSum: 18900,
    finalQty: 7,
    finalSum: 18900,
  },
  {
    key: '8',
    number: '8',
    itemName: 'Средство для ухода за кожей',
    initialQty: 5,
    initialSum: 16000,
    receivedQty: 3,
    receivedSum: 9600,
    consumedQty: 4,
    consumedSum: 12800,
    finalQty: 4,
    finalSum: 12800,
  },
  {
    key: '9',
    number: '9',
    itemName: 'Очиститель тормозов',
    initialQty: 8,
    initialSum: 14400,
    receivedQty: 6,
    receivedSum: 10800,
    consumedQty: 5,
    consumedSum: 9000,
    finalQty: 9,
    finalSum: 16200,
  },
  {
    key: '10',
    number: '10',
    itemName: 'Очиститель кузова',
    initialQty: 20,
    initialSum: 50000,
    receivedQty: 15,
    receivedSum: 37500,
    consumedQty: 12,
    consumedSum: 30000,
    finalQty: 23,
    finalSum: 57500,
  },
  {
    key: '11',
    number: '11',
    itemName: 'Салфетки для очистки',
    initialQty: 30,
    initialSum: 15000,
    receivedQty: 20,
    receivedSum: 10000,
    consumedQty: 25,
    consumedSum: 12500,
    finalQty: 25,
    finalSum: 12500,
  },
  {
    key: '12',
    number: '12',
    itemName: 'Средство для удаления насекомых',
    initialQty: 4,
    initialSum: 11200,
    receivedQty: 3,
    receivedSum: 8400,
    consumedQty: 3,
    consumedSum: 8400,
    finalQty: 4,
    finalSum: 11200,
  },
  {
    key: '13',
    number: '13',
    itemName: 'Шампунь для мойки автомобилей',
    initialQty: 25,
    initialSum: 62500,
    receivedQty: 20,
    receivedSum: 50000,
    consumedQty: 22,
    consumedSum: 55000,
    finalQty: 23,
    finalSum: 57500,
  },
  {
    key: '14',
    number: '14',
    itemName: 'Очиститель стекол автомобилей',
    initialQty: 18,
    initialSum: 27000,
    receivedQty: 10,
    receivedSum: 15000,
    consumedQty: 15,
    consumedSum: 22500,
    finalQty: 13,
    finalSum: 19500,
  },
  {
    key: '15',
    number: '15',
    itemName: 'Полироль для автомобилей',
    initialQty: 10,
    initialSum: 30000,
    receivedQty: 5,
    receivedSum: 15000,
    consumedQty: 8,
    consumedSum: 24000,
    finalQty: 7,
    finalSum: 21000,
  },
];


const reportColumns = [
  {
    title: 'Номер',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Наименование товара',
    dataIndex: 'itemName',
    key: 'itemName',
  },
  {
    title: 'Наличие на начало периода',
    children: [
      {
        title: 'Кол-во',
        dataIndex: 'initialQty',
        key: 'initialQty',
      },
      {
        title: 'Сумма',
        dataIndex: 'initialSum',
        key: 'initialSum',
      },
    ],
  },
  {
    title: 'Поступление товара',
    children: [
      {
        title: 'Кол-во',
        dataIndex: 'receivedQty',
        key: 'receivedQty',
      },
      {
        title: 'Сумма',
        dataIndex: 'receivedSum',
        key: 'receivedSum',
      },
    ],
  },
  {
    title: 'Расход товара',
    children: [
      {
        title: 'Кол-во',
        dataIndex: 'consumedQty',
        key: 'consumedQty',
      },
      {
        title: 'Сумма',
        dataIndex: 'consumedSum',
        key: 'consumedSum',
      },
    ],
  },
  {
    title: 'Наличие на конец периода',
    children: [
      {
        title: 'Кол-во',
        dataIndex: 'finalQty',
        key: 'finalQty',
      },
      {
        title: 'Сумма',
        dataIndex: 'finalSum',
        key: 'finalSum',
      },
    ],
  },
];

const exportMenu = (
  <Menu>
    <Menu.Item key="1">PDF</Menu.Item>
    <Menu.Item key="2">Excel</Menu.Item>
  </Menu>
);

const ReportComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Layout>
      <Content>
        <div style={{ background: '#fff', minHeight: 280 }}>
          <div style={{ margin: '16px 50px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ marginRight: '16px' }}>
              <RangePicker />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px' }}>Экспортировать</span>
              <Dropdown overlay={exportMenu}>
                <Button style={{ marginRight: '8px' }}>
                  PDF <DownOutlined />
                </Button>
              </Dropdown>
              <Button icon={<DownloadOutlined />} type="primary" />
            </div>
          </div>
          <Table
            rowSelection={rowSelection}
            dataSource={reportData}
            columns={reportColumns}
            pagination={false}
          />
        </div>
        
      </Content>
    </Layout>
  );
};

export default ReportComponent;
