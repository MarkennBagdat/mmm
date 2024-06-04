import React from 'react';
import { Input, Space } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  VerticalAlignMiddleOutlined,
  SettingOutlined,
  ShrinkOutlined
} from "@ant-design/icons";

const { Search } = Input;

const SearchPanel = ({ onSearch }) => (
  <div className="search-container">
    <div className="search-input-container">
      <span className="search-span">Поиск:</span>
      <Search
        placeholder="Введите ключевые слова"
        onSearch={onSearch}
        className="search-part"
        prefix={<SearchOutlined className="search-outline" />}
      />
    </div>
    <Space className="icon-container">
      <ReloadOutlined className="search-icon icon-reload" />
      <VerticalAlignMiddleOutlined className="search-icon icon-vertical-align" />
      <SettingOutlined className="search-icon icon-settings" />
      <ShrinkOutlined className="search-icon icon-shrink" />
    </Space>
  </div>
);

export default SearchPanel;
