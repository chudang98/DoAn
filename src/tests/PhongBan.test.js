/* eslint-disable comma-dangle */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PhongBan from '@/pages/QuanTriPhanQuyen/PhongBan/index';
import Form from '@/pages/QuanTriPhanQuyen/PhongBan/components/Form';
import TableBase from '@/pages/QuanTriPhanQuyen/PhongBan/TableCustom';

const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
    align: 'center',
    width: '100px',
  },
  {
    title: 'Tên phòng ban',
    dataIndex: 'hoTen',
    align: 'center',
    width: '200px',
    search: 'search',
  },
  {
    title: 'Tài khoản',
    dataIndex: 'username',
    align: 'center',
    width: '200px',
    search: 'search',
  },

  {
    title: 'Thuộc phòng ban',
    dataIndex: 'phongBan',
    align: 'center',
    width: '220px',
    search: 'search',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'soDienThoai',
    align: 'center',
    width: '150px',
    search: 'search',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    align: 'center',
    width: '220px',
    search: 'search',
  },
  {
    title: 'Địa chỉ hiện nay',
    dataIndex: 'diaChiHienNay',
    align: 'center',
  },
  // {
  //   title: 'Thao tác',
  //   align: 'center',
  //   render: (value, record) => renderLast(value, record),
  //   fixed: 'right',
  //   width: 180,
  // },
];

describe('<PhongBan/> rendering', () => {
  it('<TableBase/> render', () => {
    const mockDispatch = jest.fn();
    const wrapper = shallow(
      <PhongBan.WrappedComponent khoa={{ danhSach: [] }} dispatch={mockDispatch} />
    );
    expect(wrapper.find('TableBase')).toHaveLength(1);
  });
  it('test datasource table trong tablebase', () => {
    const mockDispatch = jest.fn();
    const wrapper = shallow(
      <TableBase
        model={{
          danhSach: [{ a: 1, b: 2 }],
          edit: false,
          filterInfo: {},
          isTouched: false,
          modal: false,
          paging: {
            cond: {},
            limit: 10,
            page: 1,
          },
          record: {},
          showDrawer: false,
          thongTinChiTiet: {},
          total: 0,
        }}
        modelName="phongban"
        // loading={this.props.loading}
        dispatch={mockDispatch}
        columns={columns}
        cond={{ vaiTro: 5 }}
        Form={Form}
        // title={SelectKhoa(danhSach, this.onSelectKhoa, this.state.khoa)}
        title="Quản trị các phòng ban"
        hasCreate
        tableProp={{
          scroll: { x: 1600 },
        }}
      />
    );
    expect(wrapper.find('.table').props().dataSource).toHaveLength(1);
  });
});

// describe('<PhongBan /> lifecycle method invocations', () => {
//   it('componentDidMount should have called', () => {
//     const mockDispatch = jest.fn();
//     shallow(<PhongBan.WrappedComponent khoa={{ danhSach: [] }} dispatch={mockDispatch} />);
//     expect(mockDispatch).toHaveBeenCalledTimes(1);
//   });
// });
