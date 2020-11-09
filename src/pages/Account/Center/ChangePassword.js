/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Input, Card, Row, Col, Button, DatePicker, Select, Radio, Spin } from 'antd';
import _ from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { Format, chuanHoa, includes } from '@/utils/utils';
import rules from '@/utils/rules';
import Hint from '@/components/Hint/Hint';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { renderSelect, renderGroup, tailFormItemLayout } from '@/utils/form';
import Upload from '@/components/Upload/Upload';

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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      values.newPassword2 = undefined;
      this.props.dispatch({
        type: 'login/changePassword',
        payload: {
          ...values,
        },
      });
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    // console.log('form.va', form.validateFields(['newPassword2'], { force: true }));
    if (value) {
      form.validateFields(['newPassword2'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="box">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Spin spinning={this.props.loading || false}>
            <Form.Item label="Mật khẩu hiện tại">
              {getFieldDecorator('oldPassword', {
                initialValue: '',
                rules: [...rules.required],
              })(<Input style={{ '-webkit-text-security': 'disc' }} />)}
            </Form.Item>
            <Form.Item label="Mật khẩu mới">
              {getFieldDecorator('newPassword', {
                initialValue: '',
                rules: [
                  ...rules.required,
                  ...rules.password,
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input style={{ '-webkit-text-security': 'disc' }} />)}
            </Form.Item>
            <Form.Item label="Xác nhận mật khẩu mới">
              {getFieldDecorator('newPassword2', {
                initialValue: '',
                rules: [
                  ...rules.required,
                  {
                    validator: this.compareToFirstPassword, 
                    message: 'Mật khẩu không khớp',
                  },
                ],
              })(<Input style={{ '-webkit-text-security': 'disc' }} />)}
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
