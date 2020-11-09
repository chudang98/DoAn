import { GridContent } from '@ant-design/pro-layout';
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Button,
  DatePicker,
  Descriptions,
  Badge,
} from 'antd';
const { TextArea } = Input;
import React from 'react';
import styles from '../index.less';
import shortid from 'shortid';

type Form2C_Props = {
  model: {};
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { getFieldDecorator };
};

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

const ktRongCongTacValue = quaTrinhCongTac => {
  for (let prop in quaTrinhCongTac) {
    if (quaTrinhCongTac[prop] != '') return true;
  }
  if (quaTrinhCongTac.chucVu != '') return true;
  return false;
};

class Form2C extends React.Component<Form2C_Props> {
  state = {
    quaTrinhCongTac: [
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        chucVu: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        chucVu: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        chucVu: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        chucVu: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        chucVu: '',
      },
    ],

    quaTrinhLuong: [
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
      {
        key: shortid.generate(),
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
        },
        maNgach: '',
        heSo: '',
      },
    ],
  };

  deleteRow = key => {
    let data = this.state.quaTrinhCongTac;
    this.setState({
      quaTrinhCongTac: data.filter(object => object.key != key),
    });
  };

  themCongTac = () => {
    const data = this.state.quaTrinhCongTac;
    data.push({
      key: shortid.generate(),
      thoiGian: {
        thangBatDau: '',
        namBatDau: '',
        thangKetThuc: '',
        namKetThuc: '',
      },
      chucVu: '',
    });
    this.setState({
      quaTrinhCongTac: data,
    });
  };

  themQuaTrinhLuong = () => {
    const data = this.state.quaTrinhLuong;
    data.push({
      key: shortid.generate(),
      thoiGian: {
        thangBatDau: '',
        namBatDau: '',
      },
      maNgach: '',
      heSo: '',
    });
    this.setState({
      quaTrinhLuong: data,
    });
  };

  componentDidMount() {}

  render() {
    const {
      model,
      form: { getFieldDecorator },
      cond,
      loading,
      visible,
    } = this.props;
    const dataaa = '';
    const columnsQuaTrinhCongTac = [
      {
        title: 'Từ tháng, năm - đến tháng, năm',
        dataIndex: 'thoiGian',
        width: '17%',
        editable: true,
        render: (text, record) => (
          <Input.Group type="flex" justify="center">
            <Input
              maxLength={2}
              style={{ width: '10%' }}
              className={styles.input_date}
              defaultValue={record.thoiGian.thangBatDau}
              placeholder="...."
            />
            <Input
              className={styles.input_split}
              style={{
                color: 'black',
                pointerEvents: 'none',
              }}
              placeholder="/"
              disabled
            />
            <Input
              maxLength={4}
              style={{ width: '30%' }}
              className={styles.input_date}
              defaultValue={record.thoiGian.namBatDau}
              placeholder="........"
            />
            <Input
              className={styles.input_split}
              style={{
                color: 'black',
                margin: '0 10px 0 10px',
                pointerEvents: 'none',
              }}
              placeholder="-"
              disabled
            />
            <Input
              maxLength={2}
              style={{ width: '10%' }}
              className={styles.input_date}
              defaultValue={record.thoiGian.thangKetThuc}
              placeholder="...."
            />
            <Input
              className={styles.input_split}
              style={{
                color: 'black',
                pointerEvents: 'none',
              }}
              placeholder="/"
              disabled
            />
            <Input
              maxLength={4}
              style={{ width: '30%' }}
              className={styles.input_date}
              defaultValue={record.thoiGian.namKetThuc}
              placeholder="........"
            />
          </Input.Group>
        ),
      },
      {
        title:
          'Chức danh, chức vụ, đơn vị công tác (đảng, chính quyền, đoàn thể, tổ chức xã hội), kể cả thời gian được đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ,......',
        dataIndex: 'chucVu',
        width: '83%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <div className={styles.position_relative}>
            <TextArea
              defaultValue={text}
              className={styles.form2c_table_input}
              type="text"
              placeholder="Chức danh, chức vụ, thời gian đào tạo"
            />
            <Button
              className={styles.outside_button_delete}
              icon="close-circle"
              onClick={() => this.deleteRow(record.key)}
            />
          </div>
        ),
      },
    ];

    return (
      visible && (
        <div className={styles.form2c_form4}>
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
                <Col span={18}>
                  <h4 className={styles.form2c_name_form}>II. QUAN HỆ GIA ĐÌNH</h4>
                  <Form labelAlign="left" {...formItemLayout} labelAlign="left">
                    <Form.Item
                      labelCol={{ span: 24 }}
                      wrapperCol={{
                        span: 24,
                        offset: 0,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span>
                            <span className={styles.form2c_red_text}>26. </span>Đào tạo, bồi dưỡng
                            về chuyên môn, nghiệp vụ, lý luận chính trị, ngoại ngữ, tin học
                          </span>
                          <Button
                            type="link"
                            icon="plus-circle"
                            onClick={this.themCongTac}
                            className={styles.red_button}
                          >
                            Thêm mới
                          </Button>
                        </span>
                      }
                    >
                      <Row type="flex" justify="center">
                        {getFieldDecorator(
                          'quaTrinhCongTac',
                          {}
                        )(
                          <Table
                            bordered
                            dataSource={this.state.quaTrinhCongTac}
                            columns={columnsQuaTrinhCongTac}
                            pagination={false}
                            className={styles.form2c_table}
                          />
                        )}
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>27. </span>Sở trường công tác
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={24}>
                          {getFieldDecorator(
                            'soTruong',
                            {}
                          )(<Input placeholder="Sở trường" size="large" />)}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>28. </span>Khen thưởng
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'khenThuong',
                            {}
                          )(<Input placeholder="Khen thưởng" size="large" />)}
                          <div className={styles.helper_text}>(Hình thức cao nhất, năm nào)</div>
                        </Col>
                        <Col span={12} className="gutter-row">
                          {getFieldDecorator(
                            'thoiGianKhenThuong',
                            {}
                          )(
                            <DatePicker
                              placeholder="Thời gian khen thưởng"
                              onChange={}
                              size="large"
                              className={styles.w_100}
                            />
                          )}
                          <div className={styles.helper_text}>(Thời gian khen thưởng)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>29. </span>Kỷ luật
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'kyLuat',
                            {}
                          )(<Input placeholder="Kỷ luật" size="large" />)}
                          <div className={styles.helper_text}>
                            (Về đảng, chính quyền,... hình thức cao nhất)
                          </div>
                        </Col>
                        <Col span={12} className="gutter-row">
                          {getFieldDecorator(
                            'thoiGianKyLuat',
                            {}
                          )(
                            <DatePicker
                              placeholder="Thời gian kỷ luật"
                              onChange={}
                              size="large"
                              className={styles.w_100}
                            />
                          )}
                          <div className={styles.helper_text}>(Thời gian kỷ luật)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>30. </span>Nghề nghiệp khi được
                          tuyển dụng
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={24}>
                          {getFieldDecorator(
                            'ngheNghiepDuocTuyenDung',
                            {}
                          )(<Input placeholder="Nghề nghiệp" size="large" />)}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>32. </span> Chức vụ, chức danh
                          hiện tại
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={24}>
                          {getFieldDecorator(
                            'chucVuHienTai',
                            {}
                          )(<Input placeholder="Chức vụ" size="large" />)}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>33. </span>Công việc chính được
                          giao
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={24}>
                          {getFieldDecorator(
                            'congViecDuocGiao',
                            {}
                          )(<Input placeholder="Công việc được giao" size="large" />)}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>34. </span>Ngạch công chức (viên
                          chức)
                        </span>
                      }
                    >
                      <Row gutter={[20, 20]}>
                        <Col span={12}>
                          {getFieldDecorator(
                            'ngachCongChuc',
                            {}
                          )(<Input placeholder="Ngạch công chức" size="large" />)}
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'maNgachCongchuc',
                            {}
                          )(<Input placeholder="Mã ngạch" size="large" />)}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'bacLuongCongchuc',
                            {}
                          )(<Input placeholder="Bậc lương" size="large" />)}
                          <div className={styles.helper_text}>(Bậc lương)</div>
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'heSoLuongCongchuc',
                            {}
                          )(<Input placeholder="Hệ số lương" size="large" />)}
                          <div className={styles.helper_text}>(Hệ số lương)</div>
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'ngayHuong',
                            {}
                          )(
                            <DatePicker
                              size="large"
                              className={styles.w_100}
                              placeholder="(Ngày hưởng)"
                            />
                          )}
                          <div className={styles.helper_text}>(Ngày hưởng)</div>
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'phuCapChucVu',
                            {}
                          )(<Input placeholder="Phụ cấp chức vụ" size="large" />)}
                          <div className={styles.helper_text}>(Phụ cấp chức vụ)</div>
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'phuCapCongchucKhac',
                            {}
                          )(<Input placeholder="Phụ cấp khác" size="large" />)}
                          <div className={styles.helper_text}>(Phụ cấp khác)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }}
                      wrapperCol={{
                        span: 24,
                        offset: 0,
                      }}
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>35. </span>Diễn biến quá trình
                          lương của cán bộ, công chức:
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col span={24}>
                          <Descriptions bordered className={styles.table_vertical} column={10}>
                            <Descriptions.Item label="Tháng/ năm" span={24}>
                              {this.state.quaTrinhLuong?.map(item => (
                                <div className={styles.border_left}>
                                  <Input.Group>
                                    <Input
                                      maxLength={2}
                                      style={{ width: '20%' }}
                                      className={styles.input_date}
                                      defaultValue={item.thoiGian.thangBatDau}
                                      placeholder="...."
                                    />
                                    <Input
                                      className={styles.input_split}
                                      style={{
                                        color: 'black',
                                        pointerEvents: 'none',
                                      }}
                                      placeholder="/"
                                      disabled
                                    />
                                    <Input
                                      maxLength={4}
                                      style={{ width: '30%' }}
                                      className={styles.input_date}
                                      defaultValue={item.thoiGian.namBatDau}
                                      placeholder="........"
                                    />
                                  </Input.Group>
                                </div>
                              ))}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mã ngạch/ bậc" span={24}>
                              {this.state.quaTrinhLuong?.map(item => (
                                <div className={styles.border_left}>
                                  <TextArea
                                    placeholder="Mã ngạch"
                                    className={styles.input_description}
                                  />
                                </div>
                              ))}
                            </Descriptions.Item>
                            <Descriptions.Item label="Hệ số lương" span={24}>
                              {this.state.quaTrinhLuong?.map(item => (
                                <div className={styles.border_left}>
                                  <TextArea
                                    placeholder="Hệ số"
                                    className={styles.input_description}
                                  />
                                </div>
                              ))}
                            </Descriptions.Item>
                          </Descriptions>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                        offset: 0,
                      }}
                      labelCol={{ span: 24 }}
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>36. </span>Nhận xét, đánh giá của
                          cơ quan, đơn vị quản lý và sử dụng cán bộ, công chức thân
                        </span>
                      }
                    >
                      <Row>
                        <Col span={24}>
                          {getFieldDecorator(
                            'nhanXetCuaCoQuan',
                            {}
                          )(
                            <Input.TextArea
                              className={styles.textarea_nhanxet}
                              placeholder="Nhận xét, đánh giá"
                            />
                          )}
                        </Col>
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

const WrappedForm = Form.create({ name: 'Form2C' })(Form2C);

export default WrappedForm;
