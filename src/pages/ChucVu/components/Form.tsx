/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Input, Card, Row, Col, Button, DatePicker, Select, Spin } from 'antd';
import _ from 'lodash';
import { getRecordValue } from '@/utils/utils';
import rules from '@/utils/rules';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formItemLayout, tailFormItemLayout, handleValuesChange, handleCommonSubmit, getSubmitText } from '@/utils/form';

type Example_Props = {
  model: { edit, record },
  cond: object,
  loading: boolean,
  dispatch: Function,
  form: { validateFieldsAndScroll, getFieldDecorator },
}

class Example extends React.Component<Example_Props> {
  componentDidMount() {
  }

  handleSubmit = e => {
    const { form, model: { edit, record }, cond } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      let newValue = {thuTu: 0, ...values};
      console.log(newValue)
      handleCommonSubmit(newValue, this.props);
    });
  };

  render() {
    const { model, form: { getFieldDecorator }, cond, loading } = this.props;
    return (
      <div className="box">
        <Card
          bordered
          title={
            <div className="cardTitle">{!model.edit ? `Thêm mới` : `Chỉnh sửa`}</div>
          }
        >
          <GridContent>
            <Row>
              <Col span={22}>

                <Form {...formItemLayout} labelAlign='left' onSubmit={this.handleSubmit}>
                  <Form.Item label="Tên Chức Vụ">
                    {getFieldDecorator('tenChucVu', {
                      initialValue: "",
                      rules: [...rules.ten, ...rules.required],
                    })
                      (<Input />)}
                  </Form.Item>
                  <Form.Item label="Mô tả">
                    {getFieldDecorator('mota', {
                      initialValue: "",
                      rules: [...rules.ten, ...rules.required],
                    })
                      (<Input />)}
                  </Form.Item>
                  <Form.Item >
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Thêm
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>

          </GridContent>
        </Card>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'Example', onValuesChange: handleValuesChange })(Example);

export default WrappedForm;
