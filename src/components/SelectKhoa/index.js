/* eslint-disable react/jsx-indent */
import { Select } from 'antd';
import { Format } from '@/utils/utils';

function SelectKhoa(danhSach, onSelect, value) {
  return (
    <Select
      value={value}
      placeholder="Hãy chọn khoa"
      onChange={onSelect}
      style={{ width: 200 }}
      allowClear
      showSearch
      filterOption={(input, option) => Format(option.props.children).indexOf(Format(input)) >= 0}
    >
      {danhSach.map((item, index) => (
        <Select.Option key={index} value={item.maKhoa}>
          {item.tenKhoa}
        </Select.Option>
      ))}
    </Select>
  );
}

export default SelectKhoa;
