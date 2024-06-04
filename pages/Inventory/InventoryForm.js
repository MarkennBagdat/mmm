import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker, Row, Col } from "antd";
import moment from "moment";
import "../Dashboard/App.css";

moment.locale("kk");

const InventoryForm = ({ isModalVisible, setIsModalVisible, handleOk }) => {
  return (
    <Modal
      title={
        <div
          style={{
            textAlign: "start",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
          }}
        >
          Добавить товар
        </div>
      }
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={handleOk}
      okText="Сохранить"
      cancelText="Закрыть"
      width={800}
      style={{
        borderRadius: "8px",
        transform: "none",
      }}
      footer={null}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Наименование товара:" name="itemType" rules={[{ required: true, message: 'Тип товара' }]}>
              <Input placeholder="Тип товара" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Единица измерения:" name="unit" rules={[{ required: true, message: 'Ед. измерения' }]}>
              <Input placeholder="Ед. измерения" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Название:" name="name" rules={[{ required: true, message: 'Название' }]}>
          <Input placeholder="Название" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Мин. запас:" name="minStock" rules={[{ required: true, message: 'Число' }]}>
              <Input placeholder="Число" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Макс. запас:" name="maxStock" rules={[{ required: true, message: 'Число' }]}>
              <Input placeholder="Число" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Цена за единицу, тг:" name="pricePerUnit" rules={[{ required: true, message: 'Номер' }]}>
              <Input placeholder="Номер" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Сумма, тг:" name="totalPrice" rules={[{ required: true, message: 'Сумма, тг' }]}>
              <Input placeholder="Сумма, тг" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Поставщик:" name="supplier" rules={[{ required: true, message: 'Название компании' }]}>
              <Input placeholder="Название компании" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Срок годности:" name="expiryDate" rules={[{ required: true, message: 'Дата' }]}>
              <DatePicker style={{ width: '100%' }} placeholder="Дата" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Примечание:" name="note">
          <Input.TextArea placeholder="Комментарий" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
          <Button onClick={() => setIsModalVisible(false)} style={{ marginLeft: '8px' }}>
            Закрыть
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryForm;
