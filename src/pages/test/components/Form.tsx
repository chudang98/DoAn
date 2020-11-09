/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Input, Card, Row, Col, Button, DatePicker, Select, Spin } from 'antd';
import _ from 'lodash';
import { getRecordValue } from '@/utils/utils';
import rules from '@/utils/rules';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formItemLayout, tailFormItemLayout } from '@/utils/form';

type Test_Props = {
  model: { edit, record },
  cond: object,
  loading: boolean,
  dispatch: Function,
  form: { validateFieldsAndScroll, getFieldDecorator },
}

class Test extends React.Component<Test_Props> {
  componentDidMount() {
  }

  handleSubmit = e => {
    const { form, model: { edit, record }, cond } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      if (edit) {
        this.props.dispatch({
          type: `test/upd`,
          payload: {
            ...values,
            _id: record._id,
          },
        });
      } else {
        this.props.dispatch({
          type: `test/add`,
          payload: {
            ...cond,
            ...values,
          },
        });
      }
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
              <Col span={18}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="Tên môn học">
                    {getFieldDecorator('dataIndex', {
                      initialValue: getRecordValue(model, cond, 'dataIndex', ''),
                      rules: [...rules.required],
                    })(<Input />)}
                  </Form.Item>

                  <Spin spinning={loading}>
                    <Form.Item {...tailFormItemLayout}>
                      <Button.Group>
                        <Button type="primary" icon="plus" htmlType="submit">
                          {model.edit ? 'Cập nhật' : 'Thêm mới'}
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

const WrappedForm = Form.create({ name: 'Test' })(Test);

export default WrappedForm;
