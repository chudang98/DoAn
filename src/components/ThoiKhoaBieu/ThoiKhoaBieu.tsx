import React from 'react';
import { Card, Row, Col, Button, Modal, Typography, Spin } from 'antd';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import queryString from 'query-string';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import _ from 'lodash';
import { toHexa, tinhNgayTheoTuan } from '@/utils/utils';
import { ReactNodeLike } from 'prop-types';
import { connect } from 'dva';
import { IBase } from '@/utils/base';
import { getAuthority } from '@/utils/authority';
// import DiemDanh from './DiemDanh';

const messages = {
  allDay: 'Cả ngày',
  previous: 'Trước',
  next: 'Sau',
  today: 'Hôm nay',
  month: 'Tháng',
  week: 'Tuần',
  day: 'Ngày',
  agenda: 'Chung',
  date: 'Ngày',
  time: 'Thời gian',
  event: 'Sự kiện',
  showMore: total => `+ Xem thêm (${total})`,
};

type Props = {
  thoikhoabieu: IBase;
  danhSach: Array<object>;
  footerButton: Array<ReactNodeLike>;
  loading: boolean;
  dispatch: Function;
};

type States = {
  visible: boolean;
  idLopGet: string;
};

@connect(({ thoikhoabieu, lopgv }) => ({
  thoikhoabieu,
  lopgv,
}))
class SuKien extends React.Component<Props, States> {
  state = {
    visible: false,
    idLopGet: '',
  };

  componentDidMount = async () => {
    await this.props.dispatch({
      type: 'lopgv/get',
    });

    const parsed = queryString.parse(window.location.search);
    const { idLop } = parsed;
    await this.setState({ idLopGet: idLop });
  };

  eventPropGetter = event => ({
    style: { backgroundColor: toHexa(event.title) },
  });

  onSelectEvent = record => {
    console.log('record :>> ', record);
    this.setState({
      visible: true,
    });
    this.props.dispatch({
      type: 'thoikhoabieu/changeState',
      payload: {
        record,
      },
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  eventCustom = ({ event }) => {
    const { tenMonHoc, phongHoc, tenLopHoc } = event;
    return (
      <div style={{ width: '100%', fontSize: 13 }}>
        <div>Môn: {`${tenMonHoc || 'Chưa cập nhật'}`}</div>
        <div>
          Phòng: {`${phongHoc === 'NaN' || phongHoc === undefined ? 'Chưa cập nhật' : phongHoc}`}
        </div>
        <div>Lớp: {`${tenLopHoc || 'Chưa cập nhật'}`}</div>
      </div>
    );
  };

  render() {
    const localizer = momentLocalizer(moment);
    const {
      footerButton,
      loading,
      lopgv: { danhSach: danhSachLop },
      thoikhoabieu: { record },
    } = this.props;

    let { danhSach } = this.props;
    if (danhSach?.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      danhSachLop?.map((x: object) => {
        if (x?._id === this.state.idLopGet) {
          danhSach.push(x);
        }
      });
    }

    const { visible } = this.state;
    const data = [];
    if (danhSach.length > 0) {
      danhSach.map(
        ({ tenLopHoc, monHoc, lichHoc, kyHoc: { ngayBatDau }, sinhVien, maLopHoc, _id }) => {
          const tenMonHoc = _.get(monHoc, 'tenMonHoc', '');
          lichHoc.map(
            ({
              tuanHoc,
              thuHoc,
              thoiGianBatDau,
              thoiGianKetThuc,
              phongHoc,
              tietBatDau,
              tietKetThuc,
            }) => {
              tuanHoc.map(i => {
                const ngayHoc = tinhNgayTheoTuan(i, thuHoc, ngayBatDau); // 00:00 của ngày học
                const startTime = moment(thoiGianBatDau, 'HH:mm');
                const endTime = moment(thoiGianKetThuc, 'HH:mm');
                const start = moment(ngayHoc)
                  .add(startTime.hours(), 'hours')
                  .add(startTime.minutes(), 'minutes')
                  .toDate();
                const end = moment(ngayHoc)
                  .add(endTime.hours(), 'hours')
                  .add(endTime.minutes(), 'minutes')
                  .toDate();
                data.push({
                  _id,
                  maLopHoc,
                  tenMonHoc,
                  tenLopHoc,
                  phongHoc,
                  sinhVien,
                  tuanHoc: i,
                  thuHoc,
                  tietBatDau,
                  tietKetThuc,
                  start,
                  end,
                  title: `${`${tenMonHoc} Phòng: ${
                    phongHoc === 'NaN' || phongHoc === undefined ? 'Chưa cập nhật' : phongHoc
                  }Lớp: ${tenLopHoc}`}`,
                });
              });
            }
          );
        }
      );
    }

    console.log('data :>> ', data);
    return (
      <div className="box">
        <Card bordered>
          <Row gutter={24}>
            <Col xs={24}>
              <Spin spinning={loading}>
                <Calendar
                  localizer={localizer}
                  events={data}
                  defaultView={Views.WEEK}
                  scrollToTime={new Date(1970, 1, 1)}
                  defaultDate={new Date()}
                  messages={messages}
                  views={['month', 'week', 'day']}
                  style={{ height: 700 }}
                  min={moment('0600', 'HHmm').toDate()}
                  max={moment('2000', 'HHmm').toDate()}
                  eventPropGetter={this.eventPropGetter}
                  onSelectEvent={record => this.onSelectEvent(record)}
                  components={{ event: (event, date) => this.eventCustom(event) }}
                  popup
                />
              </Spin>
            </Col>
          </Row>
        </Card>
        <Modal
          title="Thông tin lớp học"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleOk}
          footer={[
            ...footerButton,
            <Button type="primary" onClick={this.handleOk}>
              OK
            </Button>,
          ]}
        >
          {_.isEmpty(record) === false ? (
            <div>
              <Typography.Paragraph>Môn: {record.tenMonHoc}</Typography.Paragraph>
              <Typography.Paragraph>
                Phòng: {record?.phongHoc ?? 'Chưa cập nhật'}
              </Typography.Paragraph>
              <Typography.Paragraph>Lớp: {record.tenLopHoc}</Typography.Paragraph>
              <Typography.Paragraph>
                Ngày: {moment(record.start).format('DD/MM/YYYY')} - Tuần {record.tuanHoc}, Thứ{' '}
                {record.thuHoc + 1}
              </Typography.Paragraph>
              <Typography.Paragraph>
                Tiết: {record.tietBatDau} - {record.tietKetThuc}
              </Typography.Paragraph>
            </div>
          ) : null}
        </Modal>
      </div>
    );
  }
}
export default SuKien;
