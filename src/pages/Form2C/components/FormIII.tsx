import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Form, Input, Row, Select, Table, Button, DatePicker } from 'antd';
const { TextArea } = Input;
import { CaretDownOutlined } from '@ant-design/icons';
import React from 'react';
import styles from '../index.less';

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

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

class Form2C extends React.Component<Form2C_Props> {
  state = {
    lichSuHocVan: [
      {
        tenTruong: '',
        chuyenNganh: '',
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        hinhThuc: '',
        vanBang: '',
      },
      {
        tenTruong: '',
        chuyenNganh: '',
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        hinhThuc: '',
        vanBang: '',
      },
      {
        tenTruong: '',
        chuyenNganh: '',
        thoiGian: {
          thangBatDau: '',
          namBatDau: '',
          thangKetThuc: '',
          namKetThuc: '',
        },
        hinhThuc: '',
        vanBang: '',
      },
    ],
  };

  deleteRow = (key) => {
    let data = this.state.lichSuHocVan;
    this.setState({
      lichSuHocVan: data.filter(object => object.id != key)
    })
  }

  themDaoTao = () => {
    const data = this.state.lichSuHocVan;
    data.push({
      key: shortid.generate(),
      tenTruong: '',
      chuyenNganh: '',
      thoiGian: {
        thangBatDau: '',
        namBatDau: '',
        thangKetThuc: '',
        namKetThuc: '',
      },
      hinhThuc: '',
      vanBang: '',
    });
    this.setState({
      lichSuHocVan: data,
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

    const columns = [
      {
        title: 'Tên trường',
        dataIndex: 'tenTruong',
        width: '20%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <TextArea
            defaultValue={text}
            className={styles.form2c_table_input}
            type="text"
            placeholder="Tên trường"
          />
        ),
      },
      {
        title: 'Chuyên ngành đào tạo, bồi dưỡng',
        dataIndex: 'chuyenNganh',
        width: '25%',
        editable: true,
        render: (text, record) => (
          <TextArea
            defaultValue={text}
            className={styles.form2c_table_input}
            type="text"
            placeholder="Chuyên ngành"
          />
        ),
      },
      {
        title: 'Từ tháng, năm - đến tháng, năm',
        dataIndex: 'thoiGian',
        width: '20%',
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
        title: 'Hình thức đào tạo',
        dataIndex: 'hinhThuc',
        width: '15%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <div className={styles.position_relative}>
            <TextArea
              className={styles.form2c_table_input}
              type="text"
              defaultValue={text}
              placeholder="Đào tạo"
            />
            <Button className={styles.outside_button_delete} icon="close-circle" onClick={() => this.deleteRow(record.key)} />

          </div>
        ),
      },
      {
        title: 'Văn bằng, chứng chỉ, trình độ đào tạo',
        dataIndex: 'vanBang',
        width: '20%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <TextArea
            className={styles.form2c_table_input}
            type="text"
            defaultValue={text}
            placeholder="Văn bằng/ chứng chỉ"
          />
        ),
      },
    ];

    return (
      visible && (
        <div className={styles.form2c_form3}>
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
                  <h4 className={styles.form2c_name_form}>III. TÓM TẮT QUÁ TRÌNH ĐÀO TẠO</h4>
                  <Form {...formItemLayout} labelAlign="left">
                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>17. </span>Trình độ giáo dục phổ
                          thông
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'lop',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Lớp "
                              optionFilterProp="children"
                            >
                              {this.state.danToc?.map(item => (
                                <Select.Option value={item.ma}>
                                  {item?.tenDanToc ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                          <div className={styles.helper_text}>(Lớp tốt nghiệp)</div>
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'heTotNghiep',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Hệ tốt nghiệp"
                              optionFilterProp="children"
                            >
                              {this.state.tonGiao?.map(item => (
                                <Select.Option value={item?.ma}>
                                  {item?.tenDanToc ?? ''}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                          <div className={styles.helper_text}>(Hệ tốt nghiệp)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>19. </span>Ngoại ngữ - tin học
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'ngoaiNgu',
                            {}
                          )(
                            <Input
                              size="large"
                              placeholder="Ngoại ngữ "
                              optionFilterProp="children"
                            />
                          )}
                          <div className={styles.helper_text}>
                            (Tên ngoại ngữ + Trình độ A, B, C, D.....)
                          </div>
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'heTotNghiep',
                            {}
                          )(
                            <Input size="large" placeholder="Tin học" optionFilterProp="children" />
                          )}
                          <div className={styles.helper_text}>(Trình độ A, B, C, D.....)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>20. </span>Thời gian vào Đảng
                          cộng sản Việt Nam
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator(
                            'ngayVaoDang',
                            {}
                          )(<DatePicker onChange={} size="large" className={styles.w_100} />)}
                          <div className={styles.helper_text}>(Ngày vào Đảng)</div>
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'ngayChinhThuc',
                            {}
                          )(<DatePicker onChange={} size="large" className={styles.w_100} />)}
                          <div className={styles.helper_text}>(Ngày chính thức)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>21. </span>Ngày tham gia tổ chức
                          chính trị - xã hội
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={12}>
                          {getFieldDecorator('toChucThamGia', {})(<Input placeholder="Tổ chức" />)}
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'heTotNghiep',
                            {}
                          )(<DatePicker onChange={} size="large" className={styles.w_100} />)}
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
                        <span className={styles.form2c_label}>
                          <span>
                            <span className={styles.form2c_red_text}>25. </span>Đào tạo, bồi dưỡng
                            về chuyên môn, nghiệp vụ, lý luận chính trị, ngoại ngữ, tin học
                          </span>
                          <Button
                            type="link"
                            icon="plus-circle"
                            onClick={this.themDaoTao}
                            className={styles.red_button}
                          >
                            Thêm mới
                          </Button>
                        </span>
                      }
                    >
                      <Row type="flex" justify="center">
                        <div>
                          <span className={styles.form2c_red_text}>Ghi chú:</span> Hình thức đào
                          tạo: Chính quy, tại chức, chuyên tu, bồi dưỡng ..../ Văn bằng: TSKH, TS,
                          Ths, Cử nhân, Kỹ sư ............
                        </div>
                        {getFieldDecorator('lichSuHocVan', {
                          // rules: [...rules.ten],
                        })(
                          <Table
                            bordered
                            dataSource={this.state.lichSuHocVan}
                            columns={columns}
                            pagination={false}
                            className={styles.form2c_table}
                          />
                        )}
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

const WrappedForm = Form.create({ name: 'Form2C' })(Form2C);

export default WrappedForm;
