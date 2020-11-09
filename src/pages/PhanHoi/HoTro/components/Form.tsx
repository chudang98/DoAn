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

type HoTro_Props = {
  model: { edit; record };
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { validateFieldsAndScroll; getFieldDecorator };
};

class HoTro extends React.Component<HoTro_Props> {
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
      const { cauHoi, ...valuesIgnorQues } = values;
      handleCommonSubmit(valuesIgnorQues, this.props);
    });
  };

  render() {
    const {
      model,
      form: { getFieldDecorator },
      cond,
      loading,
    } = this.props;
    model.record.daTraLoi = !!model.record.traLoi;
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
                  <Form.Item label="Câu hỏi">
                    {getFieldDecorator('cauHoi', {
                      initialValue: getRecordValue(model, cond, 'cauHoi', ''),
                      rules: [...rules.text, ...rules.required],
                    })(<Input.TextArea rows={4} style={{ fontSize: 20 }} readOnly />)}
                  </Form.Item>
                  <Form.Item label="Câu trả lời">
                    {getFieldDecorator('traLoi', {
                      initialValue: getRecordValue(model, cond, 'traLoi', ''),
                      rules: [...rules.text, ...rules.required],
                    })(
                      <Input.TextArea
                        rows={4}
                        style={{ fontSize: 20 }}
                        disabled={model.record.daTraLoi}
                      />
                    )}
                  </Form.Item>
                  {!model.record.daTraLoi && (
                    <Spin spinning={loading}>
                      <Form.Item {...tailFormItemLayout}>
                        <Button.Group>
                          <Button type="primary" icon="plus" htmlType="submit">
                            Gửi
                          </Button>
                        </Button.Group>
                      </Form.Item>
                    </Spin>
                  )}
                </Form>
              </Col>
            </Row>
          </GridContent>
        </Card>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'HoTro', onValuesChange: handleValuesChange })(HoTro);

export default WrappedForm;
