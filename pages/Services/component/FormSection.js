import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Row, Col } from "antd";
import axios from "axios"; // Import axios
import "../../../assets/styles/App.css";
import "../../../assets/styles/main.scss";

const { Option } = Select;

const FormSection = ({ isModalVisible, setIsModalVisible, onAddService }) => {
  const [form] = Form.useForm();

  const onSave = () => {
    form
      .validateFields()
      .then((values) => {
        axios.post("http://localhost:8080/api/services", values)
          .then(response => {
            onAddService(response.data); // Add the new service to the parent state
            form.resetFields();
            setIsModalVisible(false);
          })
          .catch(error => {
            console.error("There was an error submitting the form!", error);
          });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={isModalVisible}
      onOk={form.submit}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          className="save-button"
          onClick={onSave}
        >
          Сохранить
        </Button>,
        <Button
          key="back"
          className="close-button"
          onClick={() => setIsModalVisible(false)}
        >
          Закрыть
        </Button>,
      ]}
      width={700}
    >
      <Form
        form={form}
        layout="horizontal"
        initialValues={{ layout: "horizontal" }}
      >
        <div
          className="modal-title"
          style={{ paddingBottom: "16px", borderBottom: "1px solid #e8e8e8" }}
        >
          Добавить услугу
        </div>

        <Form.Item
          label="Вид услуги"
          name="serviceType"
          rules={[{ required: true, message: "Выберите вид услуги" }]}
          style={{ margin: "24px 0" }}
          labelCol={{
            style: { width: "100px", display: "flex", alignItems: "start" },
          }}
        >
          <Select
            className="custom-select"
            placeholder="Выберите вид услуги"
            style={{ width: "100%" }}
          >
            <Option value="cleaning">Химчистка</Option>
            <Option value="washing">Мойка</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="serviceName"
          label="Название"
          rules={[{ required: true, message: "Введите название услуги" }]}
          style={{ marginBottom: "24px" }}
          labelCol={{
            style: { width: "100px", display: "flex", alignItems: "start" },
          }}
        >
          <Input
            placeholder="Макс. 150 символов"
            maxLength={150}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: "Введите описание услуги" }]}
          style={{ marginBottom: "24px" }}
          labelCol={{
            style: { width: "100px", display: "flex", alignItems: "start" },
          }}
        >
          <Input.TextArea
            placeholder="Описание услуги"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <div
          className="modal-title"
          style={{ paddingBottom: "5px", borderBottom: "1px solid #e8e8e8" }}
        >
          Прайс
        </div>
        <Row gutter={16} style={{ paddingTop: "24px" }}>
          <Col span={12}>
            <Form.Item
              name="priceCar"
              label="Легковая"
              rules={[
                {
                  required: true,
                  message: "Введите цену для легковой машины",
                },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для легковой машины" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priceCrossover"
              label="Кроссовер"
              rules={[
                { required: true, message: "Введите цену для кроссовера" },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для кроссовера" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="priceSUV"
              label="Внедорожник"
              rules={[
                { required: true, message: "Введите цену для внедорожника" },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для внедорожника" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priceMinibus"
              label="Микроавтобус"
              rules={[
                { required: true, message: "Введите цену для микроавтобуса" },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для микроавтобуса" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormSection;
