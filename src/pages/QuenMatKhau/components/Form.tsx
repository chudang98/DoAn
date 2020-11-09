/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Input, Card, Row, Col, Button, DatePicker, Select, Spin } from 'antd';
import _ from 'lodash';
import { getRecordValue } from '@/utils/utils';
import rules from '@/utils/rules';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {
  formItemLayout,
  tailFormItemLayout,
  handleValuesChange,
  handleCommonSubmit,
  getSubmitText,
} from '@/utils/form';

type quenMatKhau_Props = {
  model: { edit; record };
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { validateFieldsAndScroll; getFieldDecorator };
};

class quenMatKhau extends React.Component<quenMatKhau_Props> {
  componentDidMount() {}

  handleSubmit = e => {
    const {
      form,
      model: { edit, record },
      cond,
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      handleCommonSubmit(values, this.props);
    });
  };

  render() {
    const {
      model,
      form: { getFieldDecorator },
      cond,
      loading,
    } = this.props;
    return (
      <div className="box">
        <Card
          bordered
          title={<div className="cardTitle">{!model.edit ? `Thêm mới` : `Chỉnh sửa`}</div>}
        >
          <GridContent>
            <Row>
              <Col span={18}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Spin spinning={loading}>
                    <Form.Item {...tailFormItemLayout}>
                      <Button.Group>
                        <Button type="primary" icon="plus" htmlType="submit">
                          {getSubmitText(model)}
                        </Button>
                      </Button.Group>
                    </Form.Item>
                  </Spin>
                </Form>
              </Col>
            </Row>
          </GridContent>
        </Card>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'quenMatKhau', onValuesChange: handleValuesChange })(
  quenMatKhau
);

export default WrappedForm;
