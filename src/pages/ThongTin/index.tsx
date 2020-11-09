import { IBase } from '@/utils/base';
import { IColumn } from '@/utils/interfaces';
import { Button, Card, Descriptions, Divider, Popconfirm} from 'antd';
import FormDrawer from '@/components/Drawer/FormDrawer';
import { connect } from 'dva';
import moment from 'moment';
import React from 'react';
import uuidv1 from 'uuid/v1';
import styles from "./index.css";
import queryString from 'query-string';
import Form from './components/Form';
type Props = {
  location: Object
  thongTin: IBase;
  loading: boolean;
  dispatch: Function;
};

@connect(({ thongtin, loading }) => ({
  thongtin,
  loading: loading.models.thongtin,
}))
class Example extends React.Component<Props> {
  state = {
    record: {}
  }

  componentDidMount() {
    
    const { location } = this.props;
    // const parsed = queryString.parse(location?.search ?? window.location.search);
    const { query: { record } } = location;
    this.setState({
      record,
    })
  }


  // click vao chỉnh sủa
  handleClick = () => {
    this.props.dispatch({
      type: 'thongtin/changeState',
      payload: {
        edit: true,
        showDrawer: true,
      },
    });
    console.log(this.state.record);
  }
  render() {
    // let {
    //   model,
    //   modelName,
    //   title,
    //   drawerStyle,
    //   Form,
    //   columns,
    //   cond,
    //   hasCreate,
    //   loading,
    //   tableProp,
    //   children,
    //   getDataFrom,
    //   firstAtt,
    // } = this.props;
    const customCss = {
      marginRight: "20px",
      display: "inline"
    }
    return (
      <div>
        <Card title={(<div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Thông tinh nhân sự</p>
          <p>Khoa Công nghệ thông tin- Bộ Môn công nghệ phần mềm</p>
        </div>)} >
          <Descriptions style={{ marginLeft: 50 }} title={(<h2 style={{ color: "red" }}>Nguyễn Văn A - <span style={{ fontSize: "16px" }}>Trưởng nhóm nghiên cứu</span></h2>)} column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item label={(<p style={customCss}>Ảnh đại diện <span style={{ color: "red" }}>*</span></p>)}>{<img style={{ width: 120, height: 160 }} src={this.state.record.srcImage}></img>}</Descriptions.Item>
            <Descriptions.Item label={(<p style={customCss}>Họ và tên <span style={{ color: "red" }}>*</span></p>)}>{this.state.record.hoTen}</Descriptions.Item>
            <Descriptions.Item label={(<p style={customCss}>Chức danh chính <span style={{ color: "red" }}>*</span></p>)}>{this.state.record.chucVu}</Descriptions.Item>
            <Descriptions.Item label={(<p style={customCss}>Ngày, tháng, năm sinh<span style={{ color: "red" }}>*</span></p>)}>{this.state.record.dob}</Descriptions.Item>
            <Descriptions.Item label={(<p style={customCss}>Quên quán</p>)}>{this.state.record.queQuan}</Descriptions.Item>
            <Descriptions.Item label={(<p style={customCss}>Địa chỉ thường chú</p>)}>{this.state.record.diaChi}</Descriptions.Item>
            <Descriptions.Item label={(<p style={customCss}>Số điện thoại</p>)}>{this.state.record.sdt}</Descriptions.Item>
            <Descriptions.Item label={(<p style={customCss}>Email</p>)}>{this.state.record.email}</Descriptions.Item>
          </Descriptions>
          <div className={styles.Buttons}>
            <Button type="default" size="large" className="cancelButton">Quay lại</Button>
            <Button type="danger" size="large" className="submitButton" onClick= {() => this.handleClick()}>Chỉnh sửa</Button>
          </div>
          {this.props.thongtin.edit && (<FormDrawer name="thongtin" drawerStyle={{}}>
          {Form && (
            <Form
              record= {this.state.record}
              // model={model}
              // modelName={modelName}
              // dispatch={this.props.dispatch}
              // cond={cond}
              // key={model.record._id || model.key}
              // loading={loading}
            />
          )}
        </FormDrawer>)}
        </Card>
      </div>
    );
  }
}

export default Example;
