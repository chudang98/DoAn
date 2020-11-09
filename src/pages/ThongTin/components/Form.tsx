/* eslint-disable react/destructuring-assignment */
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formItemLayout, getSubmitText, handleCommonSubmit, handleValuesChange, tailFormItemLayout } from '@/utils/form';
import rules from '@/utils/rules';
import { Button, Card, Col, Form, Input, Row, Spin, Radio, Upload, Icon, Select } from 'antd';
import _ from 'lodash';
import React from 'react';

type Example_Props = {
  model: { edit, record, isTouched },
  cond: object,
  loading: boolean,
  dispatch: Function,
  form: { validateFieldsAndScroll, getFieldDecorator },
  record: object
}

class Example extends React.Component<Example_Props> {
  state = {
    fileList: []
  };
  componentDidMount() {

  }

  handleSubmit = e => {
    const { form, model: { edit, record }, cond } = this.props;
    e.preventDefault();
    if (e.target.type == "default") {
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
      handleCommonSubmit(values, this.props);
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
    const { Option } = Select;
    const props = {
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange,
      multiple: true
    };
    const { model, form: { getFieldDecorator }, cond, loading } = this.props;
    const styleFlex = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    };
    return (
      <div className="box">
        <Card
          bordered
          title={(
            <div style={styleFlex}>
              <div style={styleFlex}>
                <h2 style={{ margin: 30 }}>Chỉnh sửa nhân sự </h2>
                <Button type="default">
                  <Icon type="delete" /> Xóa nhân sự
                </Button>
              </div>
              <p style={{ color: "red" }}>Khoa Công nghệ thông tin- Bộ môn công nghệ phần mềm</p>
            </div>
          )}
        >
          {/* <div style={styleFlex}>
            <h3>Thông tin cơ bản</h3>
            <Button type="primary">
              <Icon type="edit" /> Điền thông tin chi tiết
                </Button>
          </div> */}
          <GridContent>
            <Row>
              <Col span={22}>
                <div style={{ marginBottom: 30, ...styleFlex }}>
                  <h3>Thông tin cơ bản</h3>
                  <Button type="primary">
                    <Icon type="edit" /> Điền thông tin chi tiết
                </Button>
                </div>
                <Form {...formItemLayout} labelAlign='left'>
                  <Form.Item label="Họ Tên">
                    {getFieldDecorator('hoTen', {
                      initialValue: this.props.record.hoTen,
                      rules: [...rules.ten, ...rules.required],
                    })
                      (<Input />)}
                  </Form.Item>
                  <Form.Item label="Chức Vụ">
                    {getFieldDecorator('chucVu', {
                      initialValue: this.props.record.chucVu,
                      rules: [...rules.required],
                    })
                      (<Input />)}
                  </Form.Item>
                  <Form.Item label="Ngày, tháng, năm sinh">
                    {getFieldDecorator('dob', {
                      initialValue: this.props.record.dob,
                      rules: [...rules.required],
                    })
                      (<Input />)}
                  </Form.Item>
                  <Form.Item label="Quê Quán">
                    {getFieldDecorator('queQuan', {
                      initialValue: this.props.record.chucVu,
                      
                    })
                      (
                        <div style={styleFlex}>
                          <Select defaultValue="Xã A" style={{ width: 250 }}>
                            <Option value="Xã A">Xã A</Option>
                            <Option value="Xã B">Xã B</Option>
                          </Select>
                          <Select defaultValue="Huyện A" style={{ width: 250 }} >
                            <Option value="Xã A">Huyện A</Option>
                            <Option value="Xã B">Huyện B</Option>
                          </Select>
                          <Select defaultValue="Tỉnh A" style={{ width: 250 }} >
                            <Option value="Xã A">Tỉnh A</Option>
                            <Option value="Xã B">Tỉnh B</Option>
                          </Select>
                        </div>
                      )}
                  </Form.Item>
                  <Form.Item label="Địa Chỉ Thường Trú">
                    {getFieldDecorator('diaChi', {
                      initialValue: this.props.record.chucVu,
                      
                    })
                      (
                        <div style={styleFlex}>
                          <Select defaultValue="Xã A" style={{ width: 250 }}>
                            <Option value="Xã A">Xã A</Option>
                            <Option value="Xã B">Xã B</Option>
                          </Select>
                          <Select defaultValue="Huyện A" style={{ width: 250 }} >
                            <Option value="Xã A">Huyện A</Option>
                            <Option value="Xã B">Huyện B</Option>
                          </Select>
                          <Select defaultValue="Tỉnh A" style={{ width: 250 }} >
                            <Option value="Xã A">Tỉnh A</Option>
                            <Option value="Xã B">Tỉnh B</Option>
                          </Select>
                        </div>
                      )}
                  </Form.Item>
                  <Form.Item label="Số điện thoại">
                    {getFieldDecorator('sdt', {
                      initialValue: this.props.record.sdt,
                      rules: [rules.soDienThoai, ...rules.required],
                    })
                      (<Input />)}
                  </Form.Item>
                  <Form.Item label="Email">
                    {getFieldDecorator('email', {
                      initialValue: this.props.record.email,
                      rules: [rules.email, ...rules.required],
                    })
                      (<Input />)}
                  </Form.Item>
                  <div style={{display:"flex", justifyContent:"center"}}>
                    <Button type="default">Hủy</Button>
                    <Button type="danger">Cập nhật thông tin</Button>
                  </div>
                </Form>
              </Col>
            </Row>
                     
          </GridContent>

        </Card>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'thongtin', onValuesChange: handleValuesChange })(Example);

export default WrappedForm;
