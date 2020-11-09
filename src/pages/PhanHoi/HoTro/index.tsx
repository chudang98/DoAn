import React from 'react';
import { connect } from 'dva';
import uuidv1 from 'uuid/v1';
import { Button, Divider, Popconfirm, Typography, Upload, Empty, Tag } from 'antd';
import { IColumn } from '@/utils/interfaces';
import TableBase from '@/components/Table/Table.tsx';
import { IBase } from '@/utils/base';
import moment from 'moment';
import _ from 'lodash';
import Form from './components/Form';

type Props = {
  phanhoi: IBase;
  loading: boolean;
  dispatch: Function;
};

@connect(({ phanhoi, loading }) => ({
  phanhoi,
  loading: loading.models.phanhoi,
}))
class HoTro extends React.Component<Props> {
  state = {};

  componentDidMount() {}

  handleEdit = record => {
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

  handleDel = _id => {
    this.props.dispatch({
      type: 'phanhoi/del',
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
        title: 'Câu hỏi',
        dataIndex: 'cauHoi',
        align: 'center',
        render: text => (
          <Typography.Paragraph
            style={{ margin: 0, padding: 0 }}
            strong
            ellipsis={{ rows: 4, expandable: false }}
          >
            {text}
          </Typography.Paragraph>
        ),
        search: 'search',
      },
      {
        title: 'Thời gian phản hồi',
        dataIndex: 'createdAt',
        align: 'center',
        width: 150,
        search: 'sort',
        render: time => moment(time).format('DD-MM-YYYY HH:mm'),
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
        title: 'Tình trạng',
        dataIndex: 'traLoi',
        align: 'center',
        width: 150,
        search: 'sort',
        render: rep =>
          rep ? <Tag color="green">Đã trả lời</Tag> : <Tag color="volcano">Chưa trả lời</Tag>,
      },
      {
        title: 'Thao tác',
        align: 'center',
        render: (value, record) => renderLast(value, record),
        fixed: 'right',
        width: 110,
      },
    ];

    return (
      <TableBase
        model={this.props.phanhoi}
        modelName="phanhoi"
        loading={this.props.loading}
        dispatch={this.props.dispatch}
        columns={columns}
        cond={{ loaiPhanHoi: 1 }}
        Form={Form}
        title="Quản lý phản hồi"
        tableProp={{
          scroll: { x: 1200, y: 600 },
        }}
      />
    );
  }
}

export default HoTro;
