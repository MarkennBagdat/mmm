import React, { useState } from "react";
import {
  Form,
  Modal,
  Input,
  Select,
  Row,
  Col,
  Radio,
  Space,
  Checkbox,
  DatePicker,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios"; // Import axios
import "../App.css";
import carBrands from "./dataBase/CarBrands"; // Ensure the path to the file is correct
import CarModels from "./dataBase/CarModels";

moment.locale("kk");

const { Option } = Select;
const { RangePicker } = DatePicker;

const ServiceBookingForm = ({
  isModalVisible,
  setIsModalVisible,
  handleAddRecord,
  selectedEmployees,
  handleEmployeesChange,
}) => {
  const [form] = Form.useForm(); // Define the form instance
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const services = [
    "Стандартная мойка",
    "Комплексная мойка",
    "Экспресс мойка",
    "Техническая мойка",
    "Багажник",
    "Мойка коврика багажника",
    "Технич. мойка с исп. шампуня",
    "Багажник полностью",
    "Комплексная уборка салона",
    "Сушка кузова",
    "Влажная чистка передней панели",
    "Покрытие кузова воском",
    "Чернение шин",
    "Чистка салона пылесосом",
    "Кондиционер кожи",
    "Обработка уплотнителей дверей",
    "Чистка поликов",
    "Мойка двигателя",
    "Мойка радиатора",
    "Покрытие воском",
    "Пылесос салона",
    "Экспресс мойка",
    "Антидождь",
    "Чистка от битума",
  ];

  const initialFormValues = {
    date: moment(),
    endDate: moment().add(1, "hours"),
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post("https://localhost:8081/v1/calendar/orders", values)
          .then((response) => {
            handleAddRecord(response.data); // Add the new record to the parent state
            form.resetFields();
            setIsModalVisible(false); // Close the modal upon success
          })
          .catch((error) => {
            console.error("There was an error submitting the form!", error);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setAvailableModels(CarModels[value] || []);
  };

  return (
    <Modal
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "32px",
          }}
        >
          Создать запись
        </div>
      }
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={handleOk}
      okText="Сохранить"
      cancelText="Отмена"
      width={1000}
      style={{
        borderRadius: "8px 0px 0px 0px",
        transform: "none",
      }}
    >
      <Form
        form={form} // Attach the form instance
        layout="vertical"
        name="form_in_modal"
        initialValues={initialFormValues}
        onFinish={handleOk} // Add this property to the Form
      >
        <Row gutter={42}>
          <Col span={8}>
            <Form.Item
              name="clientName"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя клиента",
                },
              ]}
            >
              <Input placeholder="Введите имя клиента" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="carBrand">
              <Select
                onChange={handleBrandChange}
                placeholder="Выберите марку машины"
              >
                {carBrands.map((brand) => (
                  <Option key={brand.value} value={brand.value}>
                    {brand.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="carNumber"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер машины",
                },
              ]}
            >
              <Input placeholder="Введите номер машины" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={42}>
          <Col span={8}>
            <Form.Item
              name="clientPhone"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер телефона клиента",
                },
              ]}
            >
              <Input placeholder="Введите номер телефона клиента" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="carModel"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите модель машины",
                },
              ]}
            >
              <Select
                placeholder="Сначала выберите марку"
                disabled={!selectedBrand}
              >
                {availableModels.map((model) => (
                  <Option key={model} value={model}>
                    {model}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="dirtLevel"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите степень загрязнения",
                },
              ]}
            >
              <Select placeholder="Выберите степень загрязнения">
                <Option value="low">Низкая</Option>
                <Option value="medium">Средняя</Option>
                <Option value="high">Высокая</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="box"
          rules={[{ required: true, message: "Пожалуйста, выберите бокс" }]}
        >
          <Radio.Group>
            <Radio.Button value="A">Бокс A</Radio.Button>
            <Radio.Button value="B">Бокс B</Radio.Button>
            <Radio.Button value="C">Бокс C</Radio.Button>
            <Radio.Button value="D">Бокс D</Radio.Button>
            <Radio.Button value="E">Бокс E</Radio.Button>
            <Radio.Button value="F">Бокс F</Radio.Button>
            <Radio.Button value="G">
              Другое <DownOutlined />
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="vehicleType">
          <Radio.Group className="my-custom-radio-group">
            <Radio.Button value="sedan">Седан</Radio.Button>
            <Radio.Button value="crossover">Кроссовер</Radio.Button>
            <Radio.Button value="suv">Внедорожник</Radio.Button>
            <Radio.Button value="minibus">Микроавтобус</Radio.Button>
            <Radio.Button value="truck">Грузовые</Radio.Button>
            <Radio.Button value="other">
              Другие <DownOutlined />
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="services">
          <Checkbox.Group className="my-custom-checkbox-group">
            <Row>
              {services.map((service) => (
                <Col span={8} key={service}>
                  <Checkbox value={service}>{service}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="employee"
          rules={[
            {
              required: true,
              message: "Пожалуйста, выберите сотрудника(ов)",
            },
          ]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Введите имена сотрудников"
            onChange={handleEmployeesChange}
            value={selectedEmployees}
            suffixIcon={<UserOutlined />}
            tagRender={(props) => {
              const { label, closable, onClose } = props;
              return (
                <div className="custom-tag">
                  {label}
                  {closable && (
                    <span className="custom-tag-close" onClick={onClose}>
                      &times;
                    </span>
                  )}
                </div>
              );
            }}
          >
            {[
              "Айдос",
              "Жанна",
              "Айбек",
              "Нурсултан",
              "Владимир",
              "Мади",
              "Дружан",
              "Ахмад",
              "Андрей",
              "Амир",
            ].map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }} // Установленная ширина для обоих элементов RangePicker
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={(value) => {
                console.log("onOk: ", value);
              }}
            />
          </Space>
        </Form>

        <Form.Item
          name="sum"
          rules={[
            {
              required: true,
              message: "Пожалуйста, выберите способ оплаты!",
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="cash">Наличные</Radio.Button>
            <Radio.Button value="kaspi_account">Счет Kaspi</Radio.Button>
            <Radio.Button value="kaspi_qr">Kaspi QR</Radio.Button>
            <Radio.Button value="bonus">Бонусы</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="discount"
          rules={[{ required: true, message: "Пожалуйста, выберите опцию!" }]}
        >
          <Radio.Group>
            <Radio.Button value="+10%">+10%</Radio.Button>
            <Radio.Button value="0">0</Radio.Button>
            <Radio.Button value="-10%">-10%</Radio.Button>
            <Radio.Button value="-20%">-20%</Radio.Button>
            <Radio.Button value="-25%">-25%</Radio.Button>
            <Radio.Button value="other">Другое</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <Form.Item name="comment" style={{ flex: 1, marginRight: "20px" }}>
            <Input placeholder="Комментарий" />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <span
              style={{
                marginRight: "10px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Итого к оплате:
            </span>
            <Input
              style={{
                padding: "8px 20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              disabled
              addonAfter="тг"
              value="5400"
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServiceBookingForm;
