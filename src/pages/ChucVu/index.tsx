import React from 'react';
import { connect } from 'dva';
import { Button, Divider, Icon, Popconfirm } from 'antd';
import { IColumn } from '@/utils/interfaces';
import TableBase from '@/components/Table/Table.tsx';
import { IBase } from '@/utils/base';
import moment from 'moment';
type Props = {
  example: IBase;
  loading: boolean;
  dispatch: Function;
};
@connect(({ example, loading }) => ({
  example,
  loading: loading.models.example,
}))
class Example extends React.Component<Props> {
  state = {};

  componentDidMount() {}

  handleEdit = record => {
    this.props.dispatch({
      type: 'example/changeState',
      payload: {
        showDrawer: true,
        edit: true,
        record,
        key: uuidv1(),
        isTouched: false,
      },
    });
  };

  handleDel = _id => {
    this.props.dispatch({
      type: 'example/del',
      payload: {
        _id,
        key: uuidv1(),
      },
    });
  };

  handleAdd = () => {
    this.props.dispatch({
      type: 'example/changeState',
      payload: {
        showDrawer: true,
        edit: false,
      },
    });
  };
  render() {
    const renderLast = (value, record) => (
      <React.Fragment>
        <Button
          type="primary"
          shape="circle"
          icon="edit"
          onClick={() => this.handleEdit(record)}
          title="Chỉnh sửa"
        />

        <Divider type="vertical" />

        <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => this.handleDel(record._id)}>
          <Button type="danger" shape="circle" icon="delete" title="Xóa" />
        </Popconfirm>
      </React.Fragment>
    );

    const columns: IColumn[] = [
      {
        title: 'STT',
        dataIndex: 'index',
        align: 'center',
        width: '30px',
      },
      {
        title: 'Họ và tên',
        dataIndex: 'hoTen',
        align: 'center',
        width: '80px',
        filters: [
          {
            text: 'Xuan',
            value: 'Xuan',
          },
          {
            text: 'Tuan',
            value: 'Tuan',
          },
          {
            text: 'Lan',
            value: 'Lan',
          },
        ],
        filterMultiple: true,
        onFilter: (value, record) => record.hoTen.indexOf(value) === 0,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Mã sinh viên',
        dataIndex: 'maSv',
        align: 'center',
        width: '60px',
      },
      {
        title: 'Tài khoản',
        dataIndex: 'username',
        align: 'center',
        width: '60px',
      },
      {
        title: 'Mật khẩu',
        dataIndex: 'password',
        align: 'center',
        width: '60px',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        width: 70,
        render: val => (
          <span title={moment(val).format('DD/MM/YYYY HH:mm:ss')}>
            {moment(val).format('DD/MM/YYYY')}
          </span>
        ),
        search: 'sort',
      },
      {
        title: 'Thao tác',
        align: 'center',
        render: (value, record) => renderLast(value, record),
        fixed: 'right',
        width: 130,
      },
    ];

    return (
      <TableBase
        model={this.props.example}
        modelName="example"
        loading={this.props.loading}
        dispatch={this.props.dispatch}
        columns={columns}
        cond={{}}
        Form={Form}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Quản lý chức vụ</h1>
            <Button type="primary" onClick={() => this.handleAdd()}>
              <Icon type="user-add" />
              Thêm chức vụ
            </Button>
          </div>
        }
        hasCreate
        tableProp={{
          scroll: { x: 1000 },
        }}
      />
    );
  }
}

export default Example;
