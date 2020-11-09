import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Form, Input, Row, Select, Table, Button, Icon } from 'antd';
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

class Form2C extends React.Component<Form2C_Props> {
  state = {
    lyLichBanThan: [
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: 'adasd',
      },
    ],

    lyLichVoChong: [
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        key: shortid.generate(),
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: 'adasd',
      },
    ],
  };

  const deleteRow = (key) => {
    const data1 = this.state.lyLichBanThan,
      data2 = this.state.lyLichVoChong;
    this.setState({
      lyLichBanThan: data1.filter(object => object.key != key),
      lyLichVoChong: data2.filter(object => object.key != key)
    })
  };

  themNguoiThan = () => {
    const data = this.state.lyLichBanThan;
    data.push({
      key: shortid.generate(),
      quanHe: '',
      hoTen: '',
      namSinh: '',
      lyLich: '',
    });
    this.setState({
      lyLichBanThan: data,
    });
  };

  themNguoiThanVoChong = () => {
    const data = this.state.lyLichVoChong;
    data.push({
      key: shortid.generate(),
      quanHe: '',
      hoTen: '',
      namSinh: '',
      lyLich: '',
    });
    this.setState({
      lyLichVoChong: data,
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
    let data = [];
    const columns = [
      {
        title: 'Mối quan hệ',
        dataIndex: 'quanHe',
        width: '14%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <TextArea
            defaultValue={text}
            className={styles.form2c_table_input}
            type="text"
            placeholder="Mối quan hệ"
          />
        ),
      },
      {
        title: 'Họ và tên',
        dataIndex: 'hoTen',
        width: '20%',
        editable: true,
        render: (text, record) => (
          <TextArea
            defaultValue={text}
            className={styles.form2c_table_input}
            type="text"
            placeholder="Họ và tên"
          />
        ),
      },
      {
        title: 'Năm sinh',
        dataIndex: 'namSinh',
        width: '10%',
        editable: true,
        render: (text, record) => (
          <TextArea
            defaultValue={text}
            className={styles.form2c_table_input}
            type="text"
            placeholder="Năm sinh"
          />
        ),
      },
      {
        title:
          'Quê quán, nghề nghiệp, chức danh, chức vụ, đơn vị công tác, học tập, nơi ở (trong, ngoài nước); thành viên các tổ chức chính trị - xã hội ...)',
        dataIndex: 'lyLich',
        width: '46%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <div className={styles.position_relative}>
            <TextArea
              className={styles.form2c_table_input}
              type="text"
              defaultValue={text}
              placeholder="Quê quán, nghề nghiệp, chức danh, chức vụ, đơn vị công tác, học tập, nơi ở (trong, ngoài nước); thành viên các tổ chức chính trị - xã hội ...)"
            />
            <Button className={styles.outside_button_delete} icon="close-circle" onClick={() => this.deleteRow(record.key)} />
          </div>
        ),
      },
    ];

    return (
      visible && (
        <div className={styles.form2c_form2}>
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
                  <h4 className={styles.form2c_name_form}>II. QUAN HỆ GIA ĐÌNH</h4>
                  <Form labelAlign="left" labelCol={{ span: 24 }}>
                    <Form.Item
                      wrapperCol={{
                        span: 24,
                        offset: 0,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span>
                            <span className={styles.form2c_red_text}>15. </span>Về bản thân: Cha,
                            Mẹ, Vợ (hoặc chồng), các con, anh chị em ruột:
                          </span>
                          <Button
                            type="link"
                            icon="user-add"
                            onClick={this.themNguoiThan}
                            className={styles.red_button}
                          >
                            Thêm người
                          </Button>
                        </span>
                      }
                    >
                      {getFieldDecorator('giaPhaBanThan', {
                        // rules: [...rules.ten],
                      })(
                        <Table
                          bordered
                          dataSource={this.state.lyLichBanThan}
                          columns={columns}
                          pagination={false}
                          className={styles.form2c_table}
                        />
                      )}
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                        offset: 0,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span>
                            <span className={styles.form2c_red_text}>16. </span>Về bên vợ (hoặc
                            chồng): Cha, Mẹ, anh chị em ruột:
                          </span>
                          <Button
                            type="link"
                            icon="user-add"
                            onClick={this.themNguoiThanVoChong}
                            className={styles.red_button}
                          >
                            Thêm người
                          </Button>
                        </span>
                      }
                    >
                      {getFieldDecorator('giaPhavoChong', {
                        // rules: [...rules.ten],
                      })(
                        <Table
                          bordered
                          dataSource={this.state.lyLichVoChong}
                          columns={columns}
                          pagination={false}
                          className={styles.form2c_table}
                        />
                      )}
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
