import React from 'react';
import { connect } from 'dva';
import Form from './Form';
import TableBase from '@/components/Table/Table';

@connect(({ monhoc, khoa }) => ({
  monhoc,
  khoa,
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends React.Component {
  state = {
  };

  componentDidMount() {
  }

  render() {
    const columns = [
      {
        title: 'STT',
        dataIndex: 'index',
        align: 'center',
        width: '150px',
      },
    ];

    const actions = record => [];

    return (
      <TableBase
        model="PAGE_NAME"
        columns={columns}
        scroll={{ x: 1000, y: 600 }}
        cond={{}}
        actions={actions}
        Form={Form}
        // title={''}
        hasEdit
        hasDelete
        hasCreate
        hasSearch
      />
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;
