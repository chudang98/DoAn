/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Input, Card, Row, Col, Button, DatePicker, Select, Spin, Modal } from 'antd';
import _ from 'lodash';
import { getRecordValue } from '@/utils/utils';
import rules from '@/utils/rules';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formItemLayout, tailFormItemLayout } from '@/utils/form';
import { router } from 'umi';
import { connect } from 'dva';

type quenMatKhau_Props = {
  model: { edit; record };
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { validateFieldsAndScroll; getFieldDecorator };
};

@connect(({ quenmatkhau, loading }) => ({
  quenmatkhau,
  loading: loading.models.quenmatkhau,
}))
class quenMatKhau extends React.Component<quenMatKhau_Props> {
  componentDidMount() {}

  chuyenTrang = () => {
    router.push({
      pathname: '/user/login',
    });
  };

  handleSubmit = (e: any) => {
    console.log('this.props :', this.props);
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err: any, values: any) => {
      if (err) return;
      this.props.dispatch({
        type: 'quenmatkhau/send',
        payload: {
          email: values.email,
        },
      });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading,
    } = this.props;
    return (
      <div className="box">
        <Card bordered title={<b>Đổi mật khẩu</b>}>
          <GridContent>
            <Row>
              <Col span={18}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="Email">
                    {getFieldDecorator('email', {
                      rules: [...rules.required, ...rules.email],
                    })(<Input />)}
                  </Form.Item>
                  <Spin spinning={!!loading}>
                    <Form.Item {...tailFormItemLayout}>
                      <Button.Group>
                        <Button type="primary" icon="check" onClick={this.handleSubmit}>
                          Gửi
                        </Button>
                      </Button.Group>
                    </Form.Item>
                  </Spin>
                </Form>
                <a style={{ float: 'right' }} href="" onClick={this.chuyenTrang}>
                  Quay lại trang đăng nhập
                </a>
              </Col>
            </Row>
          </GridContent>
        </Card>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'quenMatKhau' })(quenMatKhau);

export default WrappedForm;
