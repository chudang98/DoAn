import React from 'react';
import { Select, Card, Row, Col, Form, Input, DatePicker, Upload, message, Button } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { CaretDownOutlined } from '@ant-design/icons';

const { Option } = Select;

import styles from '../index.less';
import rules from '@/utils/rules';
import { connect } from 'dva';

type Form2C_Props = {
  tinhThanh: any[];
  quanHuyen: any[];
  xaPhuong: any[];
  danToc: any[];
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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 11 },
    xl: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 13 },
    xl: { span: 15 },
  },
};

const formCardLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 10 },
    xl: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 14 },
    xl: { span: 14 },
  },
};

@connect(({ form2c, loading }) => ({
  form2c,
  loading: loading.models.form2c,
}))
class Form2C extends React.Component<Form2C_Props> {
  state = {
    tinhThanh: [],
    quanHuyenNoiSinh: [],
    quanHuyenQueQuan: [],
    quanHuyenThuongTru: [],
    quanHuyenNoiO: [],
    xaPhuongNoiSinh: [],
    xaPhuongQueQuan: [],
    xaPhuongThuongTru: [],
    xaPhuongNoiO: [],
    danToc: [],
    tonGiao: [],
    nhomMau: [],
  };

  chonTinhNoiSinh = async value => {
    await this.props.dispatch({ type: 'form2c/getQuanHuyen', payload: { maTinh: value } });
    this.setState({
      quanHuyenNoiSinh: this.props?.form2c.quanHuyen,
    });
  };

  chonTinhQueQuan = async value => {
    await this.props.dispatch({ type: 'form2c/getQuanHuyen', payload: { maTinh: value } });
    this.setState({
      quanHuyenQueQuan: this.props?.form2c.quanHuyen,
    });
  };

  chonTinhThuongTru = async value => {
    await this.props.dispatch({ type: 'form2c/getQuanHuyen', payload: { maTinh: value } });
    this.setState({
      quanHuyenThuongTru: this.props?.form2c.quanHuyen,
    });
  };

  chonTinhNoiO = async value => {
    await this.props.dispatch({ type: 'form2c/getQuanHuyen', payload: { maTinh: value } });
    this.setState({
      quanHuyenNoiO: this.props?.form2c.quanHuyen,
    });
  };

  chonQuanHuyenNoiSinh = async value => {
    await this.props.dispatch({ type: 'form2c/getXaPhuong', payload: { maHuyen: value } });
    this.setState({
      xaPhuongNoiSinh: this.props?.form2c.xaPhuong,
    });
  };

  chonQuanHuyenQueQuan = async value => {
    await this.props.dispatch({ type: 'form2c/getXaPhuong', payload: { maHuyen: value } });
    this.setState({
      xaPhuongQueQuan: this.props?.form2c.xaPhuong,
    });
  };

  chonQuanHuyenThuongTru = async value => {
    await this.props.dispatch({ type: 'form2c/getXaPhuong', payload: { maHuyen: value } });
    this.setState({
      xaPhuongThuongTru: this.props?.form2c.xaPhuong,
    });
  };

  chonQuanHuyenNoiO = async value => {
    await this.props.dispatch({ type: 'form2c/getXaPhuong', payload: { maHuyen: value } });
    this.setState({
      xaPhuongNoiO: this.props?.form2c.xaPhuong,
    });
  };

  componentDidMount = async () => {
    await this.props.dispatch({ type: 'form2c/getTinhThanh', payload: {} });
    await this.props.dispatch({ type: 'form2c/getDanToc', payload: {} });
    await this.props.dispatch({ type: 'form2c/getTonGiao', payload: {} });
    await this.props.dispatch({ type: 'form2c/getThuongBinhHang', payload: {} });
    await this.props.dispatch({ type: 'form2c/getGiaDinhChinhSach', payload: {} });

    this.setState({
      tinhThanh: this.props?.form2c?.tinhThanh,
      danToc: this.props?.form2c?.danToc,
      tonGiao: this.props?.form2c?.tonGiao,
      thuongBinhHang: this.props?.form2c?.thuongBinhHang,
      giaDinhChinhSach: this.props?.form2c.giaDinhChinhSach,
    });
  };

  render() {
    const {
      model,
      form: { getFieldDecorator },
      cond,
      loading,
      visible,
    } = this.props;

    return (
      visible && (
        <div className={styles.form2c_form1}>
          <Card
            // bordered
            title={
              <Row type="flex" justify="space-between" align="middle">
                <Col span={12}>
                  <b>Thông tin chi tiết nhân sự</b>
                </Col>
                <Col span={12} className={styles.form2c_red_text} align="end">
                  <i>Khoa Công nghệ thông tin - Bộ môn Công nghệ phần mềm</i>
                </Col>
              </Row>
            }
          >
            <GridContent className={styles.card_form1}>
              <Row type="flex" justify="center" align="middle">
                <Col span={18} type="flex" justify="center" align="middle">
                  <b className={styles.text_black}>
                    Thông tin chi tiết nhân sự được xây dựng dựa theo mẫu{' '}
                    <span className={styles.form2c_red_text}>2c/BNV2008</span> của Bộ Nội vụ{' '}
                  </b>
                  <Form
                    className={styles.set_margin_20}
                    style={{ marginBottom: '24px' }}
                    {...formCardLayout}
                    labelAlign="left"
                  >
                    <Form.Item label="-  Cơ quan, tổ chức có thẩm quyền quản lý">
                      {getFieldDecorator('coQuanQuanLy', {
                        rules: [...rules.required],
                      })(<Input size="large" />)}
                    </Form.Item>
                    <Form.Item label="-  Cơ quan, tổ chức trực tiếp làm việc">
                      {getFieldDecorator('coQuanLamViec', {
                        rules: [...rules.required],
                      })(<Input size="large" />)}
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </GridContent>
          </Card>
          <Card className={styles.set_margin_20}>
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
                <Col span={18}>
                  <h4 className={styles.form2c_name_form}>I. THÔNG TIN CÁ NHÂN</h4>
                  <Form {...formItemLayout} labelAlign="left">
                    <Form.Item
                      type="flex"
                      justify="center"
                      align="middle"
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>1. </span>Ảnh đại diện (Ảnh màu
                          4x6 cm)
                        </span>
                      }
                    >
                      {getFieldDecorator(
                        'anhDaiDien',
                        {}
                      )(
                        <Upload>
                          <div className={styles.button_upload}>
                            <Button icon="picture" />
                            <div>Tải ảnh lên</div>
                          </div>
                        </Upload>
                      )}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
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
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>3. </span>Tên gọi khác
                        </span>
                      }
                    >
                      {getFieldDecorator('tenKhac', {
                        rules: [...rules.ten],
                      })(<Input size="large" />)}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>4. </span>Dân tộc và tôn giáo
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
                              {this.state.danToc?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDanToc ?? ''}
                                </Select.Option>
                              ))}
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
                              {this.state.tonGiao?.map(item => (
                                <Select.Option value={item?.ma}>
                                  {item?.tenDanToc ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>5. </span>Ngày/ tháng/ năm sinh
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
                              suffixIcon={}
                              size="large"
                              showSearch
                              placeholder="Nam/Nữ"
                              optionFilterProp="children"
                            >
                              <Option value="0">Nam</Option>
                              <Option value="1">Nữ</Option>
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>6. </span>Nơi sinh
                        </span>
                      }
                    >
                      <Row gutter={[20, 20]} justify="space-between">
                        <Col span={8}>
                          {getFieldDecorator(
                            'thanhPhoNoiSinh',
                            {}
                          )(
                            <Select
                              onChange={this.chonTinhNoiSinh}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Tỉnh/Thành phố"
                              optionFilterProp="children"
                            >
                              {this.state.tinhThanh?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                          <div className={styles.helper_text}>
                            (Số nhà, đường phố, thành phố, xóm, thôn, xã, huyện, tỉnh)
                          </div>
                        </Col>

                        <Col span={8}>
                          {getFieldDecorator(
                            'quanHuyenNoiSinh',
                            {}
                          )(
                            <Select
                              onChange={this.chonQuanHuyenNoiSinh}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Quận/Huyện"
                              optionFilterProp="children"
                            >
                              {this.state.quanHuyenNoiSinh?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>

                        <Col span={8}>
                          {getFieldDecorator(
                            'phuongXaNoiSinh',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Phường/Xã"
                              optionFilterProp="children"
                            >
                              {this.state.xaPhuongNoiSinh?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>
                        <Col span={24}>
                          {getFieldDecorator('soNhaNoiSinh', {
                            rules: [...rules.ten],
                          })(<Input placeholder="Số nhà" size="large" />)}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>7. </span>Quê quán
                        </span>
                      }
                    >
                      <Row gutter={[20, 20]} justify="space-between">
                        <Col span={8}>
                          {getFieldDecorator(
                            'thanhPhoQueQuan',
                            {}
                          )(
                            <Select
                              onChange={this.chonTinhQueQuan}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Tỉnh/Thành phố"
                              optionFilterProp="children"
                            >
                              {this.state.tinhThanh?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'quanHuyenQueQuan',
                            {}
                          )(
                            <Select
                              onChange={this.chonQuanHuyenQueQuan}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Quận/Huyện"
                              optionFilterProp="children"
                            >
                              {this.state.quanHuyenQueQuan?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'phuongXaQueQuan',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Phường/Xã"
                              optionFilterProp="children"
                            >
                              {this.state.xaPhuongQueQuan?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>
                        <Col span={24}>
                          {getFieldDecorator('soNhaQueQuan', {
                            rules: [...rules.ten],
                          })(<Input placeholder="Số nhà" size="large" />)}
                          <div className={styles.helper_text}>
                            (Số nhà, đường phố, thành phố, xóm, thôn, xã, huyện, tỉnh)
                          </div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>8. </span>Nơi đăng ký hộ khẩu
                          thường chú
                        </span>
                      }
                    >
                      <Row gutter={[20, 20]}>
                        <Col span={8}>
                          {getFieldDecorator(
                            'thanhPhoThuongTru',
                            {}
                          )(
                            <Select
                              onChange={this.chonTinhThuongTru}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Tỉnh/Thành phố"
                              optionFilterProp="children"
                            >
                              {this.state.tinhThanh?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>

                        <Col span={8}>
                          {getFieldDecorator(
                            'quanHuyenThuongTru',
                            {}
                          )(
                            <Select
                              onChange={this.chonQuanHuyenThuongTru}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Quận/Huyện"
                              optionFilterProp="children"
                            >
                              {this.state.quanHuyenThuongTru?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>

                        <Col span={8}>
                          {getFieldDecorator(
                            'phuongXaThuongTru',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Phường/Xã"
                              optionFilterProp="children"
                            >
                              {this.state.xaPhuongThuongTru?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>

                        <Col span={24}>
                          {getFieldDecorator('soNhaHoKhauThuongTru', {
                            rules: [...rules.ten],
                          })(<Input placeholder="Số nhà" size="large" />)}
                          <div className={styles.helper_text}>
                            (Số nhà, đường phố, thành phố, xóm, thôn, xã, huyện, tỉnh)
                          </div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>9. </span>Nơi ở hiện nay
                        </span>
                      }
                    >
                      <Row gutter={[20, 20]}>
                        <Col span={8}>
                          {getFieldDecorator(
                            'thanhPhoNoiO',
                            {}
                          )(
                            <Select
                              onChange={this.chonTinhNoiO}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              showSearch
                              placeholder="Tỉnh/Thành phố"
                              optionFilterProp="children"
                            >
                              {this.state.tinhThanh?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>

                        <Col span={8}>
                          {getFieldDecorator(
                            'quanHuyenNoiO',
                            {}
                          )(
                            <Select
                              onChange={this.chonQuanHuyenNoiO}
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Quận/Huyện"
                              optionFilterProp="children"
                            >
                              {this.state.quanHuyenNoiO?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>

                        <Col span={8}>
                          {getFieldDecorator(
                            'phuongXaNoiO',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Phường/Xã"
                              optionFilterProp="children"
                            >
                              {this.state.xaPhuongNoiO?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>

                        <Col span={24}>
                          {getFieldDecorator('soNhaHoKhauNoiO', {
                            rules: [...rules.ten],
                          })(<Input placeholder="Số nhà" size="large" />)}
                          <div className={styles.helper_text}>
                            (Số nhà, đường phố, thành phố, xóm, thôn, xã, huyện, tỉnh)
                          </div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>10. </span>Số CMND/ CCCD và ngày
                          cấp
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col span={12}>
                          {getFieldDecorator(
                            'soCMND',
                            {}
                          )(<Input placeholder="Số CMND / CCCD" size="large"></Input>)}
                        </Col>
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'ngayCapCMND',
                            {}
                          )(
                            <DatePicker
                              onChange={onChange}
                              size="large"
                              className={styles.w_100}
                              placeholder="Ngày cấp"
                            />
                          )}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>11. </span>Số bảo hiểm xã hội
                        </span>
                      }
                    >
                      {getFieldDecorator('soBaoHiem', {
                        rules: [...rules.ten],
                      })(<Input size="large" />)}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>12. </span>Tình trạng sức khoẻ
                        </span>
                      }
                    >
                      <Row gutter={[20, 20]}>
                        <Col span={12}>
                          {getFieldDecorator(
                            'sucKhoe',
                            {}
                          )(<Input placeholder="Tình trạng sức khoẻ" size="large"></Input>)}
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'nhomMau',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Nhóm máu"
                              optionFilterProp="children"
                            >
                              {this.state.nhomMau?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDonVi ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>
                      </Row>
                      <Row gutter={[20, 20]}>
                        <Col span={12}>
                          {getFieldDecorator(
                            'chieuCao',
                            {}
                          )(<Input placeholder="Chiều cao" size="large"></Input>)}
                          <div className={styles.helper_text}>(Tính theo đơn vị cm)</div>
                        </Col>

                        <Col span={12}>
                          {getFieldDecorator(
                            'canNang',
                            {}
                          )(<Input placeholder="Cân nặng" size="large"></Input>)}
                          <div className={styles.helper_text}>(Tính theo đơn vị kg)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
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
                              {this.state.thuongBinhHang?.map(item => (
                                <Select.Option value={item}>{item ?? ''}</Select.Option>
                              ))}
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
                              {this.state.giaDinhChinhSach?.map(item => (
                                <Select.Option value={item}>{item ?? ''}</Select.Option>
                              ))}
                            </Select>
                          )}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                        offset: 0,
                      }}
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>14. </span>Đặc điểm lịch sử bản
                          thân
                        </span>
                      }
                    >
                      <Row className={styles.form_lai_lich}>
                        {getFieldDecorator(
                          'tienSu',
                          {}
                        )(
                          <Input.Group className={styles.form2c_input_addon}>
                            <Col span={10} className={styles.textarea_addon}>
                              Khai rõ: bị bắt, bị tù (từ ngày tháng năm nào đến ngày tháng năm nào,
                              ở đâu), đã khai báo cho ai, những vấn đề gì? Bản thân có làm việc
                              trong chế độ cũ (cơ quan, đơn vị nào, địa điểm, chức danh, chức vụ,
                              thời gian làm việc ....)
                            </Col>
                            <Col span={14} className={styles.h_100}>
                              <Input.TextArea
                                className={styles.textarea}
                                placeholder="Điền thông tin"
                              />
                            </Col>
                          </Input.Group>
                        )}
                        {getFieldDecorator(
                          'hoatDong',
                          {}
                        )(
                          <Input.Group className={styles.form2c_input_addon}>
                            <Col span={10} className={styles.textarea_addon}>
                              <p>
                                Tham gia hoặc có quan hệ với các tổ chức chính trị, kinh tế, xã hội
                                nào ở nước ngoài (làm gì, tổ chức nào, đặt trụ sở ở đâu .........?):
                              </p>
                            </Col>
                            <Col span={14} className={styles.h_100}>
                              <Input.TextArea
                                className={styles.textarea}
                                placeholder="Điền thông tin"
                              />
                            </Col>
                          </Input.Group>
                        )}
                        {getFieldDecorator(
                          'thanNhan',
                          {}
                        )(
                          <Input.Group className={styles.form2c_input_addon}>
                            <Col span={10} className={styles.textarea_addon}>
                              <p>
                                Có thân nhân (Cha, Mẹ, Vợ, Chồng, con, anh chị em ruột) ở nước ngoài
                                (làm gì, địa chỉ)?
                              </p>
                            </Col>
                            <Col span={14} className={styles.h_100}>
                              <Input.TextArea
                                className={styles.textarea}
                                placeholder="Điền thông tin"
                              />
                            </Col>
                          </Input.Group>
                        )}
                      </Row>
                    </Form.Item>
                    <div className={styles.button_group}>
                      {this.props?.buttonPre}
                      {this.props?.buttonNext}
                    </div>
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
