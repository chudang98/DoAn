import React from 'react';
import { Button, Modal, Typography, Radio, Table } from 'antd';
import _ from 'lodash';
import { connect } from 'dva';
import { IBase } from '@/utils/base';
import moment from 'moment';
import InputSearch from '@/components/InputSearch/InputSearch';
import { includes } from '@/utils/utils';

type Props = {
  thoikhoabieu: IBase;
  loading: boolean;
  dispatch: Function;
};

@connect(({ loading, thoikhoabieu, lopgv }) => ({
  thoikhoabieu,
  lopgv,
  loading: loading.models.thoikhoabieu,
}))
class DiemDanh extends React.Component<Props> {
  state = {
    danhSach: [],
    searchText: '',
  };

  handleOk = () => {
    this.setState({
      danhSach: [],
    });
    this.props.dispatch({
      type: 'thoikhoabieu/changeState',
      payload: {
        visibleDiemDanh: false,
      },
    });
  };

  onChange = (e, rec) => {
    const { danhSach } = this.state;
    danhSach[rec.index - 1] = e.target.value;
    this.setState({
      danhSach,
    });
  };

  handleUpdate = async () => {
    const {
      thongTinDiemDanh: { _id, danhSachSinhVien },
    } = this.props.thoikhoabieu;
    const { danhSach } = this.state;
    let danhSachDiemDanh = [];
    danhSachDiemDanh = danhSachSinhVien.map((item, index) => ({
      maSv: item.maSv,
      trangThai: danhSach[index],
    }));
    await this.props.dispatch({
      type: 'thoikhoabieu/putDiemDanh',
      payload: {
        _id,
        danhSachSinhVien: danhSachDiemDanh,
      },
    });

    console.log('this.props :>> ', this.props);
    await this.props.dispatch({
      type: 'lopgv/getDiemDanh',
      payload: { maLopHoc: this.props?.maLopHoc },
    });
  };

  updateState = () => {
    const {
      thongTinDiemDanh: { danhSachSinhVien },
    } = this.props.thoikhoabieu;
    const danhSach = danhSachSinhVien.map(item => item.trangThai);
    this.setState({
      danhSach,
    });
  };

  handleSearch = value => {
    this.setState({
      searchText: value,
    });
  };

  render() {
    const {
      thoikhoabieu: { record, visibleDiemDanh, thongTinDiemDanh },
      loading,
    } = this.props;
    let data = [];
    if (_.isEmpty(thongTinDiemDanh) === false) {
      data = thongTinDiemDanh.danhSachSinhVien.map((item, index) => ({
        index: index + 1,
        ...item,
      }));

      if (this.state.danhSach.length !== data.length) {
        this.updateState();
      }

      data = data.filter(item =>
        includes(_.get(item, 'sinhVien.hoTen', ''), this.state.searchText)
      );
    }

    const columns = [
      {
        title: 'STT',
        dataIndex: 'index',
        width: '80px',
        align: 'center',
      },
      {
        title: 'Niên khóa',
        dataIndex: 'nienKhoa',
        width: '100px',
        align: 'center',
        render: (val, rec) => rec.sinhVien.nienKhoa,
      },
      {
        title: 'Mã SV',
        dataIndex: 'maSv',
        width: '150px',
        align: 'center',
      },
      {
        title: 'Họ và tên',
        dataIndex: 'hoTen',
        align: 'center',
        render: (val, rec) => rec.sinhVien.hoTen,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'trangThai',
        width: '450px',
        render: (val, rec) => (
          <Radio.Group
            value={this.state.danhSach[rec.index - 1]}
            onChange={e => this.onChange(e, rec)}
          >
            <Radio value={0}>Có mặt</Radio>
            <Radio value={1}>Nghỉ có phép</Radio>
            <Radio value={2}>Nghỉ không phép</Radio>
          </Radio.Group>
        ),
        align: 'center',
      },
    ];
    return (
      <Modal
        title="Điểm danh"
        visible={visibleDiemDanh}
        onCancel={this.handleOk}
        footer={[
          <Button type="primary" onClick={() => this.handleUpdate()}>
            Cập nhật
          </Button>,
        ]}
        width="80%"
        maskClosable={false}
      >
        {_.isEmpty(record) === false ? (
          <div>
            <Typography.Paragraph>{record.title}</Typography.Paragraph>
            <Typography.Paragraph>
              Ngày: {moment(record.start).format('DD/MM/YYYY')} - Tuần {record.tuanHoc}, Thứ{' '}
              {record.thuHoc + 1}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Tiết: {record.tietBatDau} - {record.tietKetThuc}
            </Typography.Paragraph>
            <Typography.Paragraph>Số sinh viên: {data.length}</Typography.Paragraph>
            <InputSearch
              handleSearch={this.handleSearch}
              placeholder="Tìm kiếm theo tên sinh viên"
            />
            <br />
            <Table
              loading={loading}
              bordered
              dataSource={data}
              columns={columns}
              pagination={{
                position: 'top',
                total: data.length,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '35', '50'],
              }}
            ></Table>
          </div>
        ) : null}
      </Modal>
    );
  }
}

export default DiemDanh;
