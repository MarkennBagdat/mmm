// DateNavigation.js
import React, { useState } from 'react';
import { Button, Select, Row, Col, DatePicker } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const DateNavigation = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const goToPreviousDay = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'days'));
  };

  const goToNextDay = () => {
    setCurrentDate(currentDate.clone().add(1, 'days'));
  };

  // Обработчик изменения даты в календаре
  const handleDateChange = (date, dateString) => {
    setCurrentDate(date);
  };

  return (
    <Row justify="center" align="middle" gutter={16} style={{style: 'flex', alignItems: 'center'}}>
      <Col>
      <Button onClick={goToPreviousDay} icon={<LeftOutlined />} style={{margin: 0, border: '1px solid #d9d9d9', borderRadius: '4px'}} />
      </Col>
      <Col>
        <DatePicker value={currentDate} onChange={handleDateChange} format="DD.MM.YYYY" style={{border: '1px solid #d9d9d9'}}/>
      </Col>
      <Col>
        <Button onClick={goToNextDay} icon={<RightOutlined />} style={{margin: 0, border: '1px solid #d9d9d9', borderRadius: '4px'}} />
      </Col>
      <Col>
      </Col>
    </Row>
  );
};

export default DateNavigation;
