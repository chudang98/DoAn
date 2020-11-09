/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form, Input, Card, Row, Col, Button, DatePicker, Select, Spin } from 'antd';
import _ from 'lodash';
import { connect } from 'dva';
import moment from 'moment';
import { Format, chuanHoa, toRegex, getRecordValue } from '@/utils/utils';
import rules from '@/utils/rules';
import Hint from '@/components/Hint/Hint';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { renderGroup, formItemLayout, tailFormItemLayout } from '@/utils/form';

@connect(({ PAGE_NAME, loading }) => ({
  PAGE_NAME,
  loading: loading.models.PAGE_NAME,
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends React.Component {
  componentDidMount() {
  }

  render() {
    const { PAGE_NAME, form, cond } = this.props;
    const { record, edit } = PAGE_NAME;
    const { getFieldDecorator } = form;
    const handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) return;
        if (edit) {
          this.props.dispatch({
            type: `PAGE_NAME/upd`,
            payload: {
              ...values,
              _id: record._id,
            },
          });
        } else {
          this.props.dispatch({
            type: `PAGE_NAME/add`,
            payload: {
              ...cond,
              ...values,
            },
          });
        }
      });
    };

    return (
      <div className="box">
        <Card
          bordered
          title={
            <div className="cardTitle">{!edit ? `Thêm mới` : `Chỉnh sửa`}</div>
          }
        >
          <GridContent>
            <Row>
              <Col span={18}>
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                  {/* <Form.Item label="Tên môn học">
                    {getFieldDecorator('PAGE_NAME', {
                      initialValue: edit ? _.get(record, 'PAGE_NAME', '') : '',
                      rules: [...rules.text, ...rules.required],
                    })(<Input />)}
                  </Form.Item> */}

                  <Spin spinning={this.props.loading}>
                    <Form.Item {...tailFormItemLayout}>
                      <Button.Group>
                        <Button type="primary" icon="plus" htmlType="submit">
                          {edit ? 'Cập nhật' : 'Thêm mới'}
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

const WrappedForm = Form.create({ name: 'PAGE_NAME_UPPER_CAMEL_CASE' })(PAGE_NAME_UPPER_CAMEL_CASE);

export default WrappedForm;
