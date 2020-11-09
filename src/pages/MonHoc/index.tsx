import React from 'react';
import uuidv1 from 'uuid/v1';
import {IBase} from "@/utils/base";
import { connect } from 'dva';
import Form from './components/Form';
import { Table, Divider, Tag, Button, Popconfirm } from 'antd';
import TableBase from "@/components/Table/Table.tsx";


type MonHoc_List_Props = {
    monhoc: IBase;
    loading: boolean;
    dispatch: Function;
};

@connect(({ monhoc, loading }) => ({
    monhoc,
    loading: loading.models.monhoc,
  }))


class ListMonHoc extends React.Component<MonHoc_List_Props> {

    handleEdit = record => {
      this.props.dispatch({
        type: "monhoc/changeState",
        payload: {
          showDrawer: true,
          edit: true,
          record,
          key: uuidv1(),
          isTouched: false
        }
      });
    };


    render(){
        const renderLastColumn = (value, record) => (
            <>
                <Button
                    type="primary"
                    shape="circle"
                    icon="edit"
                    title="Chỉnh Sửa"
                    onClick= {() => {{this.handleEdit(record)}}}
                />
                <Divider type="vertical"/>
                <Popconfirm title="Bạn có chắc muốn xóa" okText="OK" cancelText="Cancel">
                  <Button title="Xóa" shape="circle" icon="delete"/>
                </Popconfirm>
            </>
        );
        const columns: IColumn[] =    [
            {
              title: 'STT',
              dataIndex: 'index',
              align: 'center',
              width: '30px',
            },
            {
              title: 'Ten Mon',
              dataIndex: 'tenMon',
              align: 'center',
              width: '80px'
            },
            {
              title: 'Mã Môn',
              dataIndex: 'maMon',
              align: 'center',
              width: '60px',
            },
            {
              title: "Thao Tác",
              align: "center",
              width: 130,
              render: (value, record) => renderLastColumn(value, record)
            }

           
          ];
        

        return(
            <TableBase
                model={this.props.monhoc}
                modelName="monhoc"
                loading={this.props.loading}
                dispatch={this.props.dispatch}
                columns={columns}
                cond={{}}
                Form={Form}
                title={'Chưa cập nhật'}
                hasCreate
                tableProp={{
                scroll: { x: 1000 },
            }} 
            />
        );

    }    
}

export default ListMonHoc;