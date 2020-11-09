/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Form,
  Input,
  Card,
  Row,
  Col,
  Button,
  DatePicker,
  Select,
  Radio,
  Spin,
  InputNumber,
} from 'antd';
import _ from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { Format, chuanHoa, includes, renderFileListUrl, getRecordValue } from '@/utils/utils';
import rules from '@/utils/rules';
import Hint from '@/components/Hint/Hint';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { renderSelect, renderGroup, tailFormItemLayout } from '@/utils/form';
import Upload from '@/components/Upload/Upload';
import UploadAvatar from '@/components/Upload/UploadAvatar';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

@connect(({ taikhoan, loading, login }) => ({
  taikhoan,
  loading: loading.models.taikhoan,
  login,
}))
class GiaoVienForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const {
      login: { _id },
    } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      values.anhDaiDien = _.get(values, 'anhDaiDien.fileList[0].originFileObj', undefined);

      this.props.dispatch({
        type: 'login/updateProfile',
        payload: {
          ...values,
          _id,
        },
        onComplete: () => {
          this.props.dispatch({
            type: 'login/fetchCurrent',
          });
        },
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      login: { user: record },
    } = this.props;
    const edit = true;
    return (
      <div className="box">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Spin spinning={this.props.loading || false}>
            <Form.Item label="Họ tên">
              {getFieldDecorator('hoTen', {
                initialValue: edit ? _.get(record, 'hoTen', '') : '',
                rules: [...rules.ten, ...rules.required],
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label="Ảnh đại diện">
              {getFieldDecorator('anhDaiDien', {
                initialValue: renderFileListUrl(
                  getRecordValue({ edit, record }, {}, 'anhDaiDien', undefined)
                ),
                rules: [],
              })(<UploadAvatar />)}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              {getFieldDecorator('soDienThoai', {
                initialValue: edit ? _.get(record, 'soDienThoai', '') : '',
                rules: [...rules.soDienThoai],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Địa chỉ">
              {getFieldDecorator('diaChiHienNay', {
                initialValue: _.get(record, 'diaChiHienNay', ''),
                // rules: [...rules.email],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Địa chỉ hiện tại">
              {getFieldDecorator('diaChiHienNay', {
                initialValue: edit ? _.get(record, 'diaChiHienNay', '') : '',
                rules: [],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Giới tính">
              {getFieldDecorator('gioiTinh', {
                initialValue: edit ? _.get(record, 'gioiTinh', 0) : 0,
                rules: [],
              })(renderGroup('gioiTinh'))}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button.Group>
                <Button type="primary" icon="plus" htmlType="submit">
                  Cập nhật
                </Button>
              </Button.Group>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    );
  }
}

const WrappedQuanTriBaiVietForm = Form.create({ name: 'GiaoVienForm' })(GiaoVienForm);

export default WrappedQuanTriBaiVietForm;
