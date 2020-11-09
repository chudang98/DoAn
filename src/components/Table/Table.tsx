/* eslint-disable react/destructuring-assignment */
import { Button, Card, Col, Icon, Input, Row, Table } from 'antd';
import _ from 'lodash';
import { ReactNodeLike } from 'prop-types';
// import { ColumnType } from 'rc-table/lib/interface';
import React from 'react';
import uuidv1 from 'uuid/v1';
import { toRegex } from '@/utils/utils';
import data from '@/utils/data';
import { IBase } from '@/utils/base';
import FormDrawer from '@/components/Drawer/FormDrawer';
import { IColumn } from '../../utils/interfaces';
import InputSearch from '../InputSearch/InputSearch';
import { css } from '@emotion/react';

interface Props {
  model: IBase;
  modelName: string;
  loading: boolean;
  dispatch: Function;
  cond: object;
  columns: IColumn[];
  // drawerStyle: object;
  Form?: ReactNodeLike;
  title: ReactNodeLike;
  hasCreate?: boolean;
  tableProp?: object;
  getDataFrom?: string;
  firstAtt?: string;
}

class TableBase extends React.Component<Props> {
  public componentDidMount() {
    const { modelName, cond } = this.props;
    this.props.dispatch({
      type: `${modelName}/get`,
      payload: {
        page: 1,
        limit: 10,
        cond,
      },
    });
  }

  public componentWillUnmount() {
    const { modelName } = this.props;
    this.props.dispatch({
      type: `${modelName}/changeState`,
      payload: {
        filterInfo: {},
      },
    });
  }

  public getCond = () => {
    // lấy thông tin cond đang search
    const { model } = this.props;
    return _.get(model, 'paging.cond', {});
  };

  public changeState = filters => {
    const { modelName, model } = this.props;
    const { filterInfo } = model;
    this.props.dispatch({
      type: `${modelName}/changeState`,
      payload: {
        filterInfo: {
          ...filterInfo,
          ...filters,
        },
      },
    });
  };

  public onChange = (pagination, filters, sorter) => {
    // thay đổi từ phân trang || filter
    const { current: page, pageSize: limit } = pagination;
    const { columnKey, order } = sorter;
    const orderValue = order === 'ascend' ? 1 : order === 'descend' ? -1 : undefined;
    const { cond, modelName } = this.props;
    //  giữ lại thông tin của cond.
    const tmpCond = _.clone(cond);
    this.changeState({
      ...filters,
      sort: columnKey,
      order: orderValue,
    });
    Object.keys(filters).map(key => {
      if (!filters[key].length) {
        return;
      }
      const value = filters[key][0];
      const isSearch = typeof value === 'string';
      tmpCond[key] = isSearch ? toRegex(value) : value;
      return 0;
    });
    this.props.dispatch({
      type: `${modelName}/get`,
      payload: {
        page,
        limit,
        cond: tmpCond,
        ...(columnKey && orderValue ? { sort: columnKey, order: orderValue } : {}),
      },
    });
  };

  public handleThem = () => {
    const { modelName } = this.props;
    this.props.dispatch({
      type: `${modelName}/changeState`,
      payload: {
        showDrawer: true,
        edit: false,
        record: {},
        key: uuidv1(),
        isTouched: false,
      },
    });
  };

  public getCondValue = dataIndex => {
    const {
      model: { filterInfo },
    } = this.props;
    return _.get(filterInfo, `[${dataIndex}]`, []);
  };

  // kiểm tra xem dataIndex có vừa được search hay ko
  public haveCond = dataIndex => this.getCondValue(dataIndex).length > 0;

  public getSearch = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder="Tìm kiếm"
          value={selectedKeys[0]} //  || selectedKeys[0]
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => {
            confirm();
          }}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Tìm
        </Button>
        <Button
          onClick={() => {
            clearFilters();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Xóa
        </Button>
      </div>
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    filteredValue: this.getCondValue(dataIndex),
    onFilter: () => true,
    filterIcon: filtered => (
      <Icon
        type="search"
        style={{ color: filtered || this.haveCond(dataIndex) ? '#1890ff' : undefined }}
        title="Tìm kiếm"
      />
    ),
  });

  public getFilter = (dataIndex, columnKey) => ({
    // cần đảm bảo trong file data.js đã có dữ liệu
    filters: _.get(data, `[${columnKey || dataIndex}]`, []).map((item, index) => ({
      text: item,
      value: index,
    })),
    onFilter: () => true,
    // đồng bộ với cond đang search
    filteredValue: this.getCondValue(dataIndex),
    filterMultiple: false,
    render: item => _.get(data, `[${columnKey || dataIndex}][${+item}]`, 'Chưa xác định'),
  });

  public getFilterTF = (dataIndex, columnKey) => ({
    // cần đảm bảo trong file data.js đã có dữ liệu
    filters: _.get(data, `[${columnKey || dataIndex}]`, []).map((item, index) => ({
      text: item,
      value: !!index,
    })),
    onFilter: () => true,
    // đồng bộ với cond đang search
    filteredValue: this.getCondValue(dataIndex),
    filterMultiple: false,
    render: item => _.get(data, `[${columnKey || dataIndex}][${+item}]`, 'Chưa xác định'),
  });

  public getSortValue = dataIndex => {
    if (this.getCondValue('sort') !== dataIndex) {
      return false;
    }
    const value = this.getCondValue('order');
    if (value === 1) {
      return 'ascend';
    }
    if (value === -1) {
      return 'descend';
    }
    return false;
  };

  public getSort = dataIndex => ({
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    sortOrder: this.getSortValue(dataIndex),
  });

  handleSearchHoTen = hoTen => {
    const { modelName, cond, firstAtt } = this.props;
    const preCond = this.getCond();
    if (hoTen === '') {
      this.props.dispatch({
        type: `${modelName}/changeState`,
        payload: {
          filterInfo: {},
        },
      });
      this.props.dispatch({
        type: `${modelName}/get`,
        payload: {
          page: 1,
          limit: 10,
          cond,
        },
      });
      return;
    }
    const currentCond = { ...cond, ...preCond };
    currentCond[firstAtt] = toRegex(hoTen);

    // lưu plain text
    const nextState = {};
    nextState[firstAtt] = [hoTen];
    this.changeState(nextState);

    this.props.dispatch({
      type: `${modelName}/get`,
      payload: {
        page: 1,
        limit: 10,
        cond: currentCond,
      },
    });
  };

  public render() {
    let {
      model,
      modelName,
      title,
      drawerStyle,
      Form,
      columns,
      cond,
      hasCreate,
      loading,
      tableProp,
      children,
      getDataFrom,
      firstAtt,
    } = this.props;

    let { danhSach, total, paging } = model;
    if (getDataFrom) {
      danhSach = model[getDataFrom];
    }
    const { page, limit } = paging;
    danhSach = danhSach.map((item, index) => ({
      ...item,
      index: index + 1 + (page - 1) * limit,
      key: index,
    }));
    console.log('Day la danh sach');
    console.log(danhSach);
    columns = columns.map(item => {
      if (item.columnKey) {
        if (item.search === 'filter') {
          return { ...item, ...this.getFilter(item.dataIndex, item.columnKey) };
        }
        if (item.search === 'filterTF') {
          return { ...item, ...this.getFilterTF(item.dataIndex, item.columnKey) };
        }
      }
      if (item.search === 'filter') {
        return { ...item, ...this.getFilter(item.dataIndex) };
      }
      if (item.search === 'filterTF') {
        return { ...item, ...this.getFilterTF(item.dataIndex) };
      }
      if (item.search === 'search') {
        return { ...item, ...this.getSearch(item.dataIndex) };
      }
      if (item.search === 'sort') {
        return { ...item, ...this.getSort(item.dataIndex) };
      }
      return item;
    });
    // console.log("Day la cot");
    // console.log(columns);
    return (
      <div className="box">
        <Card bordered title={<div className="cardTitle">{title}</div>}>
          {children}
          <Row style={{ marginTop: '24px' }}>
            <Col xs={24}>
              {hasCreate && (
                <Button
                  style={{ marginRight: '10px' }}
                  type="primary"
                  // shape="round"
                  icon="plus"
                  // disabled
                  onClick={() => this.handleThem()}
                >
                  Thêm mới
                </Button>
              )}
              {!!firstAtt && (
                <InputSearch
                  handleSearch={this.handleSearchHoTen}
                  value={this.props.model[firstAtt]}
                  placeholder={`Tìm kiếm theo ${columns[1].title.toLowerCase()}`}
                />
              )}
              <h3 style={{ display: 'inline-block', margin: '0 10px 10px 50px', float: 'right' }}>
                Tổng số:
                <Input
                  style={{ width: '90px', fontWeight: 700, fontSize: 18, marginLeft: 10 }}
                  value={total}
                  readOnly
                />
              </h3>

              <Table
                // class Name là kiểu String không nhận SerilizaedStyle của react-emotion
                // className={tableCSS}
                style={{ marginTop: 10 }}
                loading={loading}
                columns={columns}
                dataSource={danhSach}
                onChange={this.onChange}
                bordered
                pagination={{
                  current: page,
                  position: 'bottom',
                  total,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '25', '50', '100'],
                }}
                {...tableProp}
              />
            </Col>
          </Row>
        </Card>
        <FormDrawer name={`${modelName}`} drawerStyle={drawerStyle}>
          {Form && (
            <Form
              model={model}
              modelName={modelName}
              dispatch={this.props.dispatch}
              cond={cond}
              key={model.record._id || model.key}
              loading={loading}
            />
          )}
        </FormDrawer>
      </div>
    );
  }
}

export default TableBase;
