/* eslint-disable react/jsx-indent */
import { Select } from 'antd';
import { Format } from '@/utils/utils';

function SelectLoai(danhSach, onSelect, value) {
    return (
        <Select
            value={value}
            placeholder='Hãy chọn loại'
            onChange={onSelect}
            style={{ width: 200 }}
            allowClear
            showSearch
            filterOption={(input, option) =>
                Format(option.props.children).indexOf(Format(input)) >= 0
            }
        >
            {danhSach.map((item, index) => (
                <Select.Option key={index} value={item.idLoai}>
                    {item.loai}
                </Select.Option>
            ))}
        </Select>
    )
}

export default SelectLoai;