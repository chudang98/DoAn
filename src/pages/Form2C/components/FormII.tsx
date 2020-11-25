import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Form, Input, Row, Select, Table, Button } from 'antd';
const { TextArea } = Input;
import { formItemLayout } from '@/utils/form';
import React from 'react';
import styles from '../index.less';
const { Option } = Select;

type Form2C_Props = {
  model: {};
  cond: object;
  loading: boolean;
  dispatch: Function;
  form: { getFieldDecorator };
};

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const handleValuesChange = () => {};

class Form2C extends React.Component<Form2C_Props> {
  state = {
    lyLichBanThan: [
      {
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      },
      {
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: 'adasd',
      },
    ],
  };

  themNguoi = () => {
    this.setState({
      lyLichBanThan: this.state.lyLichBanThan.push({
        quanHe: '',
        hoTen: '',
        namSinh: '',
        lyLich: '',
      }),
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
        title: 'Mối quan hệ',
        dataIndex: 'quanHe',
        width: '14%',
        editable: true,
        align: 'center',
        render: (text, record) => (
          <TextArea
            value={text}
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
            value={text}
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
            value={text}
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
          <TextArea
            className={styles.form2c_table_input}
            type="text"
            value={text}
            placeholder="Quê quán, nghề nghiệp, chức danh, chức vụ, đơn vị công tác, học tập, nơi ở (trong, ngoài nước); thành viên các tổ chức chính trị - xã hội ...)"
          />
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
                        span: 23,
                        offset: 1,
                      }}
                      label={
                        <span className={styles.form2c_label}>
                          <span className={styles.form2c_red_text}>15. </span>Về bản thân: Cha, Mẹ,
                          Vợ (hoặc chồng), các con, anh chị em ruột:
                          <Button>Thêm người</Button>
                        </span>
                      }
                    >
                      {getFieldDecorator('hoTen', {
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
                        span: 23,
                        offset: 1,
                      }}
                    >
                      {getFieldDecorator(
                        'hoTen',
                        {}
                      )(
                        <Input.Group className={styles.form2c_input_addon}>
                          <Col span={10} className={styles.textarea_addon}>
                            Khai rõ: bị bắt, bị tù (từ ngày tháng năm nào đến ngày tháng năm nào, ở
                            đâu), đã khai báo cho ai, những vấn đề gì? Bản thân có làm việc trong
                            chế độ cũ (cơ quan, đơn vị nào, địa điểm, chức danh, chức vụ, thời gian
                            làm việc ....)
                          </Col>
                          <Col span={14} className={styles.h_100}>
                            <Input.TextArea className={styles.textarea} />
                          </Col>
                        </Input.Group>
                      )}
                      {getFieldDecorator(
                        'hoTen',
                        {}
                      )(
                        <Input.Group className={styles.form2c_input_addon}>
                          <Col span={10} className={styles.textarea_addon}>
                            <p>
                              Khai rõ: bị bắt, bị tù (từ ngày tháng năm nào đến ngày tháng năm nào,
                              ở đâu), đã khai báo cho ai, những vấn đề gì? Bản thân có làm việc
                              trong chế độ cũ (cơ quan, đơn vị nào, địa điểm, chức danh, chức vụ,
                              thời gian làm việc ....)
                            </p>
                          </Col>
                          <Col span={14} className={styles.textarea}>
                            <Input.TextArea className={styles.textarea} />
                          </Col>
                        </Input.Group>
                      )}
                    </Form.Item>
                    {/* <Form.Item></Form.Item> */}
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
