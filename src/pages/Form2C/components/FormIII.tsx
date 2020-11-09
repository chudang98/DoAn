import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Form, Input, Row, Select, Table, Button, DatePicker } from 'antd';
const { TextArea } = Input;
import { CaretDownOutlined } from '@ant-design/icons';
import React from 'react';
import styles from '../index.less';

import { connect } from 'dva';

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
@connect(({ form2c, loading }) => ({
  form2c,
  loading: loading.models.form2c,
}))
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
    lyLuanChinhTri: [],
    quanHam: [],
    trinhDoChuyenMon: [],
    heTotNghiep: [],
  };

  deleteRow = key => {
    let data = this.state.lichSuHocVan;
    this.setState({
      lichSuHocVan: data.filter(object => object.id != key),
    });
  };

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

  chonLop = async value => {
    console.log(value);

    if (value > 10)
      this.setState({
        heTotNghiep: [12],
      });
    else
      this.setState({
        heTotNghiep: [10, 12],
      });
  };

  componentDidMount = async () => {
    await this.props.dispatch({ type: 'form2c/getLyLuanChinhTri', payload: {} });
    await this.props.dispatch({ type: 'form2c/getQuanHam', payload: {} });
    await this.props.dispatch({ type: 'form2c/getTrinhDoChuyenMon', payload: {} });

    this.setState({
      lyLuanChinhTri: this.props?.form2c?.lyLuanChinhTri,
      quanHam: this.props?.form2c?.quanHam,
      trinhDoChuyenMon: this.props?.form2c?.trinhDoChuyenMon,
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

    let lichSuHocVan = this.state.lichSuHocVan;

    const columns = [
      {
        title: 'Tên trường',
        dataIndex: 'tenTruong',
        width: '20%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <div>
            <TextArea
              defaultValue={text}
              className={styles.form2c_table_input}
              type="text"
              placeholder="Tên trường"
            />
          </div>
        ),
      },
      {
        title: 'Chuyên ngành đào tạo, bồi dưỡng',
        dataIndex: 'chuyenNganh',
        width: '25%',
        editable: true,
        render: (text, record) => (
          <div>
            <TextArea
              defaultValue={text}
              className={styles.form2c_table_input}
              type="text"
              placeholder="Chuyên ngành"
            />
          </div>
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
          <div>
            <TextArea
              className={styles.form2c_table_input}
              type="text"
              defaultValue={text}
              placeholder="Đào tạo"
            />
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
          <div className={styles.position_relative}>
            <TextArea
              className={styles.form2c_table_input}
              type="text"
              defaultValue={text}
              placeholder="Văn bằng/ chứng chỉ"
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
                <Col span={18}>
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
                              onChange={this.chonLop}
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
                                <Select.Option value={item}>Lớp {item}</Select.Option>
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
                              {this.state.heTotNghiep?.map(item => (
                                <Select.Option value={item}>Hệ {item} năm</Select.Option>
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
                          <span className={styles.form2c_red_text}>18. </span>Trình độ chuyên môn
                          cao nhất
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={24}>
                          {getFieldDecorator(
                            'trinhDoChuyenMon',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Hệ tốt nghiệp"
                              optionFilterProp="children"
                            >
                              {this.state.trinhDoChuyenMon?.map(item => (
                                <Select.Option value={item}>{item}</Select.Option>
                              ))}
                            </Select>
                          )}
                          <div className={styles.helper_text}>
                            (TSKH, TS, ThS, cử nhân, kỹ sư, cao đẳng, trung cấp, sơ cấp, chuyên
                            ngành)
                          </div>
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
                            'tinHoc',
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
                          {getFieldDecorator(
                            'toChucThamGia',
                            {}
                          )(<Input placeholder="Tổ chức" size="large" />)}
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'toChuc',
                            {}
                          )(<DatePicker onChange={} size="large" className={styles.w_100} />)}
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>22. </span>Lý luận chính trị và
                          quản lý nhà nước
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col span={12}>
                          {getFieldDecorator(
                            'lyLuanChinhTri',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Lý luận chính trị"
                              optionFilterProp="children"
                            >
                              {this.state.lyLuanChinhTri?.map(item => (
                                <Select.Option value={item}>{item ?? ''}</Select.Option>
                              ))}
                            </Select>
                          )}
                          <div className={styles.helper_text}>
                            (Cao cấp, trung cấp, sơ cấp và tương đương)
                          </div>
                        </Col>
                        <Col span={12}>
                          {getFieldDecorator(
                            'toChucThamGia',
                            {}
                          )(<Input placeholder="Vị trí quản lý" size="large" />)}
                          <div className={styles.helper_text}>
                            (Chuyên viên cao cấp, chuyên viên chính, ...)
                          </div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>23. </span>Quá trình tham gia
                          quân ngũ cộng sản Việt Nam
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col span={8}>
                          {getFieldDecorator(
                            'ngayNhapNgu',
                            {}
                          )(
                            <DatePicker
                              onChange={}
                              size="large"
                              className={styles.w_100}
                              placeholder="Ngày nhập ngũ"
                            />
                          )}
                          <div className={styles.helper_text}>(Ngày nhập ngũ)</div>
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'ngayChinhThuc',
                            {}
                          )(
                            <DatePicker
                              onChange={}
                              size="large"
                              className={styles.w_100}
                              placeholder="Ngày xuất ngũ"
                            />
                          )}
                          <div className={styles.helper_text}>(Ngày xuất ngũ)</div>
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator(
                            'ngayVaoDang',
                            {}
                          )(
                            <Select
                              suffixIcon={<CaretDownOutlined />}
                              size="large"
                              placeholder="Quân hàm"
                              optionFilterProp="children"
                            >
                              {this.state.quanHam?.map(item => (
                                <Select.Option value={item}>{item ?? ''}</Select.Option>
                              ))}
                            </Select>
                          )}
                          <div className={styles.helper_text}>(Quân hàm cao nhất)</div>
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          <span className={styles.form2c_red_text}>24. </span>Danh hiệu được phong
                          tặng cao nhất
                        </span>
                      }
                    >
                      <Row gutter={20} justify="space-between">
                        <Col className="gutter-row" span={24}>
                          {getFieldDecorator(
                            'danhHieu',
                            {}
                          )(<Input placeholder="Danh hiệu" size="large" />)}
                          <div className={styles.helper_text}>
                            (Anh hùng lao động, anh hùng lực lượng vũ trang; nhà giáo, thầy thuốc,
                            nghệ sĩ nhân dân, ...)
                          </div>
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
                            dataSource={lichSuHocVan}
                            columns={columns}
                            pagination={false}
                            className={styles.form2c_table}
                          />
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

const WrappedForm = Form.create({ name: 'Form2C' })(Form2C);

export default WrappedForm;
