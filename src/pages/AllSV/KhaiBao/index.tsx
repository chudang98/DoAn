import React from 'react';
import { connect } from 'dva';
import uuidv1 from 'uuid/v1';
import { Button, Divider, Popconfirm } from 'antd';
import { IColumn } from '@/utils/interfaces';
import Form from './components/Form';
import TableBase from '@/components/Table/Table';
import { IBase } from '@/utils/base';
import moment from 'moment';

type Props = {
  khaibao: IBase,
  loading: boolean,
  dispatch: Function,
}

@connect(({ khaibao, loading }) => ({
  khaibao,
  loading: loading.models.khaibao,
}))
class KhaiBao extends React.Component<Props> {
  state = {
  };

  componentDidMount() {
  }

  handleEdit = record => {
    this.props.dispatch({
      type: 'khaibao/changeState',
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
      type: 'khaibao/del',
      payload: {
        _id,
        key: uuidv1(),
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
    )

    const columns: IColumn[] = [
      {
        title: 'STT',
        dataIndex: 'index',
        align: 'center',
        width: '150px',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        width: 110,
        render: val => <span title={moment(val).format('DD/MM/YYYY HH:mm:ss')}>{moment(val).format('DD/MM/YYYY')}</span>,
        search: 'sort',
      },
      {
        title: 'Thao tác',
        align: 'center',
        render: (value, record) => renderLast(value, record),
        fixed: 'right',
        width: 110,
      }
    ];

    return (
      <TableBase
        model={this.props.khaibao}
        modelName="khaibao"
        loading={this.props.loading}
        dispatch={this.props.dispatch}
        columns={columns}
        cond={{}}
        Form={Form}
        title={'Chưa cập nhật'}
        hasCreate
        tableProp={{
          scroll: { x: 1000 }
        }}
      />
    );
  }
}

export default KhaiBao;
