/* eslint-disable react/destructuring-assignment */
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {
  formItemLayout,
  getSubmitText,
  handleCommonSubmit,
  handleValuesChange,
  tailFormItemLayout,
} from '@/utils/form';
import rules from '@/utils/rules';
import { Button, Card, Col, Form, Input, Row, Spin, Radio, Upload, Icon } from 'antd';
import _ from 'lodash';
import React from 'react';

type Example_Props = {
  model: { edit; record; isTouched };
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { validateFieldsAndScroll; getFieldDecorator };
};

class Example extends React.Component<Example_Props> {
  state = {
    fileList: [],
  };
  componentDidMount() {
    console.log('day la  record');
    console.log(this.props.model.record);
  }

  handleSubmit = e => {
    const {
      form,
      model: { edit, record },
      cond,
    } = this.props;
    e.preventDefault();
    if (e.target.type == 'default') {
      this.props.dispatch({
        type: 'quantri/changeState',
        payload: {
          isTouched: false,
        },
      });
    } else {
      this.props.dispatch({
        type: 'quantri/changeState',
        payload: {
          isTouched: true,
        },
      });
    }
    form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      console.log('day la value');
      console.log(values);
      const newValue = { ...values };
      newValue.nhiemVu = values.nhiemVu.fileList;
      console.log(newValue);
      newValue.idCapTren = {};
      handleCommonSubmit(newValue, this.props);
    });
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const props = {
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true,
    };
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
          title={
            <div className="cardTitle">{!model.edit ? 'Thêm mới đơn vị' : 'Chỉnh sửa đơn vị'}</div>
          }
        >
          <GridContent>
            <Row>
              <Col span={18}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign="left">
                  <Form.Item label="Tên đơn vị">
                    {getFieldDecorator('tenDonVi', {
                      initialValue: model.edit ? _.get(model.record, 'tenDonVi', '') : '',
                      rules: [...rules.ten, ...rules.required],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Phạm vi hoạt động">
                    {getFieldDecorator('loaiDonVi')(
                      <Radio.Group>
                        <Radio value="co" defaultChecked>
                          Có đơn vị chủ quản
                        </Radio>
                        <Radio value="khong">Hoat động độc lập</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>

                  {/* <div style={{backgroundColor: "red", height: "3px", width: "13444px"}}></div> */}
                  {/* <Form.Item label="Đơn vị chủ quản">
                    {getFieldDecorator('donViChuQuan', {
                      initialValue: model.edit ? _.get(model.record, 'tenDonVi', '') : '',
                      rules: [ ...rules.required],
                    })
                      (<Input />)}
                  </Form.Item> */}
                  <Form.Item label="Mô tả">
                    {getFieldDecorator('moTa', {
                      initialValue: model.edit ? _.get(model.record, 'moTa', '') : '',
                    })(<Input />)}
                  </Form.Item>
                  <p style={{ color: 'red' }}>Thông tin phòng ban</p>
                  <Form.Item label="Địa chỉ trụ sở">
                    {getFieldDecorator('diaChi', {
                      initialValue: model.edit ? _.get(model.record, 'diaChi', '') : '',
                      rules: [...rules.required],
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label="Số điện thoại liên hệ">
                    {getFieldDecorator('soDienThoai', {
                      initialValue: model.edit ? _.get(model.record, 'soDienThoai', '') : '',
                      rules: [...rules.required],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Số fax">
                    {getFieldDecorator('fax', {
                      initialValue: model.edit ? _.get(model.record, 'fax', '') : '',
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Chức năng nhiệm vụ">
                    {getFieldDecorator('nhiemVu', {
                      initialValue: model.edit ? _.get(model.record, 'niemVu', '') : '',
                      rules: [...rules.required],
                    })(
                      <Upload {...props} fileList={this.state.fileList}>
                        <Button size="large">
                          <Icon type="upload" style={{ color: 'red', fontSize: '20px' }} />
                          <p>Upload Directory</p>
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button size="large" type="default" htmlType="submit">
                      Hủy
                    </Button>
                    <Button size="large" type="danger" htmlType="submit">
                      {model.edit ? 'Cập nhật thông tin' : 'Thêm đơn vị'}
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

const WrappedForm = Form.create({ name: 'quantri', onValuesChange: handleValuesChange })(Example);

export default WrappedForm;
