import { Radio, Select } from 'antd';
import _ from 'lodash';
import data from './data';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 6 },
    xl: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 18 },
    xl: { span: 18 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export function getSubmitText(model) {
  if (!model.edit) return 'Thêm mới';
  return model.isTouched ? 'Cập nhật' : 'Quay lại';
}

export function handleCommonSubmit(values, props) {
  const {
    model: { edit, record, isTouched },
    cond,
    modelName,
    dispatch,
  } = props;
  if (edit) {
    if (isTouched) {
      // cập nhật
      dispatch({
        type: `${modelName}/upd`,
        payload: {
          ...values,
          _id: record._id,
        },
      });
    } else {
      // không cập nhật
      dispatch({
        type: `${modelName}/changeState`,
        payload: {
          showDrawer: false,
        },
      });
    }
  } else {
    dispatch({
      type: `${modelName}/add`,
      payload: {
        ...cond,
        ...values,
      },
    });
  }
}

export function handleValuesChange(props) {
  const { dispatch, modelName } = props;
  dispatch({
    type: `${modelName}/changeState`,
    payload: {
      isTouched: true,
    },
  });
}

export function renderSelect(dataIndex) {
  return (
    <Select>
      {data[dataIndex].map((item, index) => (
        <Select.Option key={index} value={index.toString()}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
}

export function renderGroup(dataIndex) {
  return (
    <Radio.Group>
      {data[dataIndex].map((item, index) => (
        <Radio value={index}>{item}</Radio>
      ))}
    </Radio.Group>
  );
}

export function renderValue(dataIndex, val) {
  return _.get(data, `[${dataIndex}][${val}]`, undefined);
}

export { formItemLayout, tailFormItemLayout };
