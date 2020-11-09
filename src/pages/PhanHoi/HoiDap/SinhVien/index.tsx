import React from 'react';
import { connect } from 'dva';
import uuidv1 from 'uuid/v1';
import { Button, Typography, Upload, Empty, Switch } from 'antd';
import { IColumn } from '@/utils/interfaces';
import TableBase from '@/components/Table/Table.tsx';
import { IBase } from '@/utils/base';
import moment from 'moment';
import _ from 'lodash';
import Form from '../components/Form';

type Props = {
  phanhoi: IBase;
  loading: boolean;
  dispatch: Function;
};

@connect(({ phanhoi, loading }) => ({
  phanhoi,
  loading: loading.models.phanhoi,
}))
class HoiDap extends React.Component<Props> {
  state = {
    trangThai: false,
  };

  componentDidMount() {}

  handleEdit = (record: any) => {
    this.props.dispatch({
      type: 'phanhoi/changeState',
      payload: {
        showDrawer: true,
        edit: true,
        record,
        key: uuidv1(),
        isTouched: false,
      },
    });
  };

  handleChange = (checked: any) => {
    this.setState({
      trangThai: checked,
    });
    this.props.dispatch({
      type: 'phanhoi/get',
      payload: {
        page: 1,
        limit: 10,
        cond: {
          trangThai: checked,
          loaiPhanHoi: 0,
          vaiTro: 0,
        },
      },
    });
  };

  render() {
    const renderLast = (value, record) => (
      <React.Fragment>
        <Button
          type="primary"
          shape="circle"
          icon={this.state.trangThai ? 'eye' : 'edit'}
          onClick={() => this.handleEdit(record)}
          title={this.state.trangThai ? 'xem' : 'Trả lời'}
        />
      </React.Fragment>
    );

    const columns: IColumn[] = [
      {
        title: 'STT',
        dataIndex: 'index',
        align: 'center',
        width: '80px',
      },
      {
        title: 'Mã Sinh Viên',
        dataIndex: 'nguoiGui',
        align: 'center',
        width: '150px',
        render: val => _.get(val, 'maSv', ''),
      },
      {
        title: 'Người gửi',
        dataIndex: 'nguoiGui',
        width: 190,
        align: 'center',
        render: item => _.get(item, 'hoTen', ''),
      },
      {
        title: 'Câu hỏi',
        dataIndex: 'cauHoi',
        align: 'center',
        search: 'search',
        render: text => (
          <Typography.Paragraph
            style={{ margin: 0, padding: 0 }}
            strong
            ellipsis={{ rows: 4, expandable: false }}
          >
            {text}
          </Typography.Paragraph>
        ),
      },

      {
        title: 'Thời gian phản hồi',
        dataIndex: 'updatedAt',
        align: 'center',
        search: 'sort',
        width: 150,
        render: value => moment(value).format('DD/MM/YYYY HH:mm'),
      },
      {
        title: 'Tệp đính kèm',
        dataIndex: 'tepDinhKem',
        align: 'center',
        width: 200,
        render: _url => {
          const url = _url || undefined;
          // console.log('url', url);
          if (!url) {
            return (
              <Empty
                image="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                imageStyle={{ height: 40 }}
              />
            );
          }
          return (
            <div
              style={{
                wordWrap: 'break-word',
                'word-break': 'break-all',
                'max-width': '300px',
              }}
            >
              <Upload
                fileList={
                  url
                    ? [
                        {
                          uid: url,
                          name:
                            url &&
                            url
                              .toString()
                              .split('/')
                              .pop()
                              .substring(26),
                          status: 'done',
                          url,
                          key: uuidv1(),
                        },
                      ]
                    : []
                }
                dizzsabled
              />
            </div>
          );
        },
      },
      {
        title: 'Thao tác',
        align: 'center',
        render: (value, record) => renderLast(value, record),
        fixed: 'right',
        width: 110,
      },
    ];

    const title = (
      <div style={{ display: 'flex' }}>
        Quản lý phản hồi sinh viên
        <div style={{ marginLeft: '10px' }}>
          <Switch
            checkedChildren="Đã trả lời"
            unCheckedChildren="Chưa trả lời"
            onClick={this.handleChange}
          />
        </div>
      </div>
    );

    return (
      <TableBase
        model={this.props.phanhoi}
        modelName="phanhoi"
        loading={this.props.loading}
        dispatch={this.props.dispatch}
        columns={columns}
        cond={{ loaiPhanHoi: 0, vaiTro: 0, trangThai: this.state.trangThai }}
        Form={Form}
        title={title}
        tableProp={{
          scroll: { x: 1200, y: 800 },
        }}
      />
    );
  }
}

export default HoiDap;
