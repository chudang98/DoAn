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

type HoiDap_Props = {
  model: { edit; record };
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { validateFieldsAndScroll; getFieldDecorator };
};

class HoiDap extends React.Component<HoiDap_Props> {
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
      const { cauHoi, ...valueIgnorQues } = values;
      handleCommonSubmit(valueIgnorQues, this.props);
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
          title={<div className="cardTitle">{!model.edit ? `Xem câu trả lời` : `Trả lời`}</div>}
        >
          <GridContent>
            <Row>
              <Col span={18}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="Câu hỏi">
                    {getFieldDecorator('cauhoi', {
                      initialValue: getRecordValue(model, cond, 'cauHoi', ''),
                    })(<Input.TextArea rows={10} style={{ fontSize: 20 }} readOnly />)}
                  </Form.Item>
                  <Form.Item label="Câu trả lời">
                    {getFieldDecorator('traLoi', {
                      initialValue: getRecordValue(model, cond, 'traLoi', ''),
                      rules: [...rules.text, ...rules.required],
                    })(<Input.TextArea rows={10} style={{ fontSize: 20 }} />)}
                  </Form.Item>
                  {/* disabled={model.record.daTraLoi} */}
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

const WrappedForm = Form.create({ name: 'HoiDap', onValuesChange: handleValuesChange })(HoiDap);

export default WrappedForm;
