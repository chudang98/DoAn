import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Form, Input, Row, Select, Table } from 'antd';
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

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Form2C extends React.Component<Form2C_Props> {
  componentDidMount() {}

  render() {
    const {
      model,
      form: { getFieldDecorator },
      cond,
      loading,
      visible,
    } = this.props;
    const EditableFormRow = Form.create()(EditableRow);
    const data = [{}];
    const columns = [
      {
        title: 'Mối quan hệ',
        dataIndex: 'quanHe',
        width: '14%',
        editable: true,
        align: 'center',
      },
      {
        title: 'Họ và tên',
        dataIndex: 'hoTen',
        width: '20%',
        render: (text, record) => <Input type="text" />,
      },
      {
        title: 'Năm sinh',
        dataIndex: 'namSinh',
        width: '10%',
        editable: true,
      },
      {
        title:
          'Quê quán, nghề nghiệp, chức danh, chức vụ, đơn vị công tác, học tập, nơi ở (trong, ngoài nước); thành viên các tổ chức chính trị - xã hội ...)',
        dataIndex: 'lyLich',
        width: '46%',
        editable: true,
        align: 'center',
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
                  <h4 className={styles.form2c_name_form}>II. QUAN HỆ GIA ĐÌNH</h4>
                  <Table
                    bordered
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    className={styles.form2c_table}
                  />
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
