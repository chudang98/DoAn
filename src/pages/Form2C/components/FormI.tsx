import React from 'react';
import { Select, Cascader, Card, Row, Col, Typography, Form, Input, DatePicker } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { CaretDownOutlined } from '@ant-design/icons';
import { formItemLayout } from '@/utils/form';
const { Option } = Select;
import styles from '../index.less';
import rules from '@/utils/rules';

type Form2C_Props = {
  tinhThanh: any[];
  model: {};
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { getFieldDecorator };
};

const handleValuesChange = () => {};

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Form2C extends React.Component<Form2C_Props> {
  componentDidMount() {
    this.props.dispatch({ type: 'form2c/getTinhThanh', payload: {} });
  }

  render() {
    const {
      model,
      form: { getFieldDecorator },
      tinhThanh,
      cond,
      loading,
      visible,
    } = this.props;
    console.log(1111111 + tinhThanh[0].tenDonVi);
    // console.log(tinhThanh);
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
      },
      {
        value: 'zhejiang',
        label: 'Zh,ejiang',
      },
    ];

    return (
      visible && (
        <div className={styles.form2c}>
          <Card
            // bordered
            title={
              <Row type="flex" justify="space-between" align="middle">
                <Col span={12} style={{ fontSize: '24px' }}>
                  <b>Thông tin chi tiết nhân sự</b>
                </Col>
                <Col span={12} className={styles.form2c_red_text} align="end">
                  <i>Khoa Công nghệ thông tin - Bộ môn Công nghệ phần mềm</i>
                </Col>
              </Row>
            }
          >
            <GridContent>
              <Row>
                <div className={styles.form2c_title_form}>
                  SƠ YẾU LÝ LỊCH CÁN BỘ, GIẢNG VIÊN HỌC VIỆN
                </div>
                <p style={{ textAlign: 'center' }} className={styles.form2c_red_text}>
                  (36 nội dung thông tin cá nhân cần cung cấp)
                </p>
              </Row>
              <Row type="flex" justify="space-around" align="middle">
                <Col span={20}>
                  <h4 className={styles.form2c_name_form}>I. THÔNG TIN CÁ NHÂN</h4>
                  <Form {...formItemLayout} labelAlign="left" labelCol={{ span: 5 }}>
                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>2. </span>Họ và tên khai
                          sinh(viết chữ in hoa)
                        </span>
                      }
                    >
                      {getFieldDecorator('hoTen', {
                        rules: [...rules.ten],
                      })(<Input size="large" />)}
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>3. </span>Tên gọi khác
                        </span>
                      }
                    >
                      {getFieldDecorator('tenKhac', {
                        rules: [...rules.ten],
                      })(<Input size="large" />)}
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>4. </span>Ngày/ tháng/ năm sinh
                          và giới tính
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'ngaySinh',
                            {}
                          )(
                            <DatePicker onChange={onChange} size="large" className={styles.w_100} />
                          )}
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'gioiTinh',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Nam/Nữ"
                              optionFilterProp="children"
                            >
                              <Option value="nam">Nam</Option>
                              <Option value="nu">Nữ</Option>
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>5. </span>Nơi sinh
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col span={8}>
                          {getFieldDecorator(
                            'phuongXa',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Phường/Xã"
                              optionFilterProp="children"
                            >
                              <Option value="nam">Nam</Option>
                              <Option value="nu">Nữ</Option>
                            </Select>
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'quanHuyen',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Quận/Huyện"
                              optionFilterProp="children"
                            >
                              <Option value="nam">Nam</Option>
                              <Option value="nu">Nữ</Option>
                            </Select>
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'thanhPho',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Tỉnh/Thành phố"
                              optionFilterProp="children"
                            >
                              <Option value="nam">Nam</Option>
                              <Option value="nu">Nữ</Option>
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>6. </span>Quê quán
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col span={8}>
                          {getFieldDecorator(
                            'phuongXa',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Phường/Xã"
                              optionFilterProp="children"
                            >
                              <Option value="nam">Nam</Option>
                              <Option value="nu">Nữ</Option>
                            </Select>
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'quanHuyen',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Quận/Huyện"
                              optionFilterProp="children"
                            >
                              <Option value="nam">Nam</Option>
                              <Option value="nu">Nữ</Option>
                            </Select>
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'thanhPho',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Tỉnh/Thành phố"
                              optionFilterProp="children"
                            >
                              <Option value="nu">{tinhThanh[0].tenDonVi}</Option>
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>7. </span>Dân tộc và tôn giáo
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'danToc',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Dân tộc"
                              optionFilterProp="children"
                            >
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="tom">Tom</Option>
                            </Select>
                          )}
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'tonGiao',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Tôn giáo"
                              optionFilterProp="children"
                            >
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="tom">Tom</Option>
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>8. </span>Nơi đăng ký hộ khẩu
                          thường chú
                        </span>
                      }
                    >
                      {getFieldDecorator('hoTen', {
                        rules: [...rules.ten],
                      })(<Input size="large" />)}
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 17,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>13. </span>Thương binh và gia
                          đình chính sách
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'thuongBinh',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Thương binh hạng"
                              optionFilterProp="children"
                            >
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="tom">Tom</Option>
                            </Select>
                          )}
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'thuongBinh',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Gia đình chính sách"
                              optionFilterProp="children"
                            >
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="tom">Tom</Option>
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </GridContent>
          </Card>
        </div>
      )
    );
  }
}

const WrappedForm = Form.create({ name: 'Form2C', onValuesChange: handleValuesChange })(Form2C);

export default WrappedForm;
