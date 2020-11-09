/* eslint-disable react/destructuring-assignment */
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getSubmitText, handleCommonSubmit, handleValuesChange, tailFormItemLayout } from '@/utils/form';
import { Button, Card, Col, Form, Row, Spin } from 'antd';
import React from 'react';

type Example_Props = {
  model: { edit, record },
  cond: object,
  loading: boolean,
  dispatch: Function,
  form: { validateFieldsAndScroll, getFieldDecorator },
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 },
    xl: { span: 16 },
  },
};

class Example extends React.Component<Example_Props> {
  componentDidMount() {
  }

  handleSubmit = e => {
    const { form, model: { edit, record }, cond } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      handleCommonSubmit(values, this.props);
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

const WrappedForm = Form.create({ name: 'Example', onValuesChange: handleValuesChange })(Example);

export default WrappedForm;
