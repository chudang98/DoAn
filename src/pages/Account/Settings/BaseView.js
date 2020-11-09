import React, { Component, Fragment } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import uuidv1 from 'uuid/v1';

import moment from 'moment';
import WrapperUpload from '@/components/Upload/Upload';
import styles from './BaseView.less';
// import { getTimeDistance } from '@/utils/utils';
const { TextArea } = Input;
const { Option } = Select;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

@connect(({ user, manager }) => ({
  currentUser: user.currentUser,
  toChucCoSoDang: manager.data,
}))
@Form.create()
class BaseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: undefined,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'manager/getSoDoToChuc',
    });
    this.myId = uuidv1();
  }

  getAvatarURL() {
    const { currentUser } = this.props;
    if (this.state.imageUrl) return this.state.imageUrl;
    if (currentUser.Image) {
      return currentUser.Image;
    }
    const url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  handleChange = ({ file }) => {
    getBase64(file.originFileObj, imageUrl =>
      this.setState({
        imageUrl,
      })
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          Email,
          SoLyLich,
          SoTheDangVien,
          HoVaTen,
          NgaySinh,
          IdCoSoDang,
          NgayVaoDang,
          NgayVaoDangChinhThuc,
          NoiCuTru,
          QueQuan,
          SoDienThoai,
          anhdaidien,
        } = values;
        this.props.dispatch({
          type: 'geographic/updateThongTinNguoiDung',
          payload: {
            ...this.props.currentUser,
            Email,
            SoLyLich,
            SoTheDangVien,
            HoVaTen,
            NgaySinh,
            IdCoSoDang,
            NgayVaoDang,
            NgayVaoDangChinhThuc,
            NoiCuTru,
            QueQuan,
            SoDienThoai,
            Image: anhdaidien[0].originFileObj,
          },
        });
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { currentUser } = this.props;
    const {
      HoVaTen,
      NgaySinh,
      QueQuan,
      NoiCuTru,
      IdCoSoDang,
      SoLyLich,
      SoTheDangVien,
      NgayVaoDang,
      NgayVaoDangChinhThuc,
      Email,
      SoDienThoai,
      Image
    } = currentUser;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <Form.Item label={<span>{formatMessage({ id: 'Họ và tên' })}</span>}>
              {getFieldDecorator('HoVaTen', {
                rules: [{ required: true, message: formatMessage({ id: 'Hãy nhập họ và tên' }) }],
                initialValue: HoVaTen,
              })(<Input />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'Ngày sinh' })}>
              {getFieldDecorator('NgaySinh', {
                rules: [{ required: true, message: formatMessage({ id: 'Nhập chọn ngày sinh' }) }],
                initialValue: moment(new Date(NgayVaoDang), dateFormatList[0]),
              })(<DatePicker format={dateFormatList} />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'Ảnh đại diện' })}>
              {getFieldDecorator('anhdaidien', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue:
                  Image && Image.length
                    ? [
                      {
                        uid: uuidv1(),
                        name: Image.split('/')
                          .pop()
                          .substring(22),
                        status: 'done',
                        url: Image,
                      },
                    ]
                    : [],
              })(<WrapperUpload key={this.myId} />)}
            </Form.Item>
            <Form.Item label={<span>{formatMessage({ id: 'Quê quán' })}</span>}>
              {getFieldDecorator('QueQuan', {
                rules: [{ required: true, message: formatMessage({ id: 'Hãy nhập quê quán' }), whitespace: true }],
                initialValue: QueQuan,
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>{formatMessage({ id: 'Nơi cư trú' })}</span>}>
              {getFieldDecorator('NoiCuTru', {
                rules: [{ required: true, message: formatMessage({ id: 'Hãy nhập nơi cư trú' }), whitespace: true }],
                initialValue: NoiCuTru,
              })(<TextArea rows={3} />)}
            </Form.Item>
            <Form.Item label={<span>{formatMessage({ id: 'Tổ chức cơ sở Đảng' })}</span>}>
              {getFieldDecorator('IdCoSoDang', {
                rules: [{ required: true, message: formatMessage({ id: 'Hãy chọn tên cơ sở Đảng' }), whitespace: true }],
                initialValue: IdCoSoDang,
              })(
                <Select
                  // showSearch
                  disabled
                // style={{ width: 200 }}
                // placeholder="Chọn cơ sở Đảng"
                // optionFilterProp="children"
                // filterOption={(input, option) =>
                // option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                >
                  {this.props.toChucCoSoDang.map(({ IdCoSoDang, TenCoSoDang }) => (
                    <Option value={IdCoSoDang}>{TenCoSoDang}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={<span>{formatMessage({ id: 'Số lí lịch' })}</span>}>
              {getFieldDecorator('SoLyLich', {
                rules: [{ required: true, message: formatMessage({ id: 'Hãy nhập số lí lịch' }) }],
                initialValue: SoLyLich,
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>{formatMessage({ id: 'Số thẻ Đảng' })}</span>}>
              {getFieldDecorator('SoTheDangVien', {
                rules: [{ required: true, message: formatMessage({ id: 'Hãy nhập số thẻ Đảng' }) }],
                initialValue: SoTheDangVien,
              })(<Input />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'Ngày vào Đảng' })}>
              {getFieldDecorator('NgayVaoDang', {
                rules: [{ required: true, message: formatMessage({ id: 'Nhập chọn ngày vào Đảng' }) }],
                initialValue: moment(new Date(NgayVaoDang), dateFormatList[0]),
              })(<DatePicker format={dateFormatList} />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'Ngày vào chính thức' })}>
              {getFieldDecorator('NgayVaoDangChinhThuc', {
                rules: [{ required: true, message: formatMessage({ id: 'Nhập chọn ngày vào Đảng chính thức' }) }],
                initialValue: moment(new Date(NgayVaoDangChinhThuc), dateFormatList[0]),
              })(<DatePicker format={dateFormatList} />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('Email', {
                rules: [
                  {
                    type: 'email',
                    message: formatMessage({ id: 'Nhập email không đúng định dạng' }),
                  },
                  {
                    required: true,
                    message: formatMessage({ id: 'Hãy nhập email' }),
                  },
                ],
                initialValue: Email,
              })(<Input />)}
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'Số điện thoại' })}>
              {getFieldDecorator('SoDienThoai', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'Nhập số điện thoại theo định dạng 0912 345 666 -> 912345666' }),
                  },
                ],
                initialValue: SoDienThoai,
              })(<Input style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                {formatMessage({ id: 'Cập nhật' })}
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <div className={styles.right}>
          <Fragment>
            <div className={styles.avatar_title}>
              <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
            </div>
            <div className={styles.avatar}>
              <img src={this.getAvatarURL()} alt="avatar" />
            </div>
            <Upload fileList={[]} onChange={this.handleChange}>
              <div className={styles.button_view}>
                <Button icon="upload">
                  <FormattedMessage
                    id="app.settings.basic.change-avatar"
                    defaultMessage="Change avatar"
                  />
                </Button>
              </div>
            </Upload>
          </Fragment>
        </div> */}
      </div>
    );
  }
}

export default BaseView;
