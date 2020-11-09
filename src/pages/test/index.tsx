import TableBase from '@/components/Table/Table';
import { IBase } from '@/utils/base';
import { IColumn } from '@/utils/interfaces';
import { Button, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import React from 'react';
import uuidv1 from 'uuid/v1';
import Form from './components/Form';

interface IProps {
  test: IBase,
  loading: boolean,
  dispatch: Function,
}

@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
class Test extends React.Component<IProps> {
  public state = {
  };

  public componentDidMount() {
  }

  public handleEdit = record => {
    this.props.dispatch({
      type: 'test/changeState',
      payload: {
        showDrawer: true,
        edit: true,
        record,
        key: uuidv1(),
      },
    });
  };

  public handleDel = _id => {
    this.props.dispatch({
      type: 'test/del',
      payload: {
        _id,
        key: uuidv1(),
      },
    });
  };

  public render() {
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
        // search: 'filter' || 'search'
      },
      {
        title: 'Thao tác',
        dataIndex: 'thaoTac',
        align: 'center',
        render: (value, record) => renderLast(value, record),
        width: 110,
      }
    ];

    return (
      <TableBase
        model={this.props.test}
        modelName="test"
        loading={this.props.loading}
        dispatch={this.props.dispatch}
        columns={columns}
        cond={{}}
        Form={Form}
        title={''}
        hasCreate={true}
        tableProp={{
          scroll: { x: 1000, y: 600 }
        }}
      />
    );
  }
}

export default Test;
