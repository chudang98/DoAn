/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Row, Col, Button, Card, Table, Input, Icon, Popover, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormDrawer from '@/components/Drawer/FormDrawer';
import { toRegex, isValue } from '@/utils/utils';
import InputSearch from '@/components/InputSearch/InputSearch';
import data from '@/utils/data';

let Nhi = uuidv1();

@connect(state => ({
  state,
}))
class TableBase extends React.Component {
  static propTypes = {
    model: PropTypes.string.isRequired, // tên model được sử dụng. Ví dụ: nhansu.
    cond: PropTypes.object.isRequired, // thông tin chung của bảng, ví dụ: cond: { vaiTro: 1 }.
    columns: PropTypes.arrayOf(PropTypes.object).isRequired, // thông tin các cột của table, ngoại trừ cột cuối.
    Form: PropTypes.node.isRequired, // form để thêm, sửa.
    firstAtt: PropTypes.string.isRequired, // thuộc tính sử dụng để search. Ví dụ 'hoTen'
    title: PropTypes.string.isRequired, // Title của trang
    actions: PropTypes.arrayOf(PropTypes.object).isRequired, // Danh sách button.
    otherProps: PropTypes.object.isRequired, // các thuộc tính khác được truyền trực tiếp cho Table
    hasDelete: PropTypes.bool.isRequired, // các thuộc tính khác được truyền trực tiếp cho Table
    hasEdit: PropTypes.bool.isRequired, // các thuộc tính khác được truyền trực tiếp cho Table
    hasCreate: PropTypes.bool.isRequired,
    hasSearch: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { model, cond } = this.props;
    this.props.dispatch({
      type: `${model}/get`,
      payload: {
        page: 1,
        limit: 10,
        cond,
      },
    });
  }

  getCond = () => {
    // lấy thông tin cond đang search
    const { state, model } = this.props;
    return _.get(state, `[${model}].paging.cond`, {});
  };

  changeState = filters => {
    const { model, state } = this.props;
    const { filterInfo } = state[model];
    this.props.dispatch({
      type: `${model}/changeState`,
      payload: {
        filterInfo: {
          ...filterInfo,
          ...filters,
        },
      },
    });
  };

  onChange = (pagination, filters) => {
    const preCond = this.getCond();
    const { current: page, pageSize: limit } = pagination;
    const { cond, firstAtt, model } = this.props;
    const tmpCond = { ...cond }; // hạn chế việc thay đổi props
    tmpCond[firstAtt] = preCond[firstAtt] || toRegex('');
    this.changeState({
      ...filters,
      ...pagination,
    });
    Object.keys(filters).map(key => {
      //  giữ lại thông tin của hoTen và cond.
      if (!filters[key].length) return;
      const value = filters[key][0];
      const isSearch = typeof value === 'string';
      tmpCond[key] = isSearch ? toRegex(value) : value;
      return 0;
    });
    this.props.dispatch({
      type: `${model}/get`,
      payload: {
        page,
        limit,
        cond: tmpCond,
      },
    });
  };

  handleDel = _id => {
    Nhi = uuidv1();
    const { model } = this.props;
    this.props.dispatch({
      type: `${model}/del`,
      payload: {
        _id,
      },
    });
  };

  handleThem = () => {
    Nhi = uuidv1();
    const { model } = this.props;
    this.props.dispatch({
      type: `${model}/changeState`,
      payload: {
        showDrawer: true,
        edit: false,
        record: {},
      },
    });
  };

  handleEdit = record => {
    Nhi = uuidv1();
    const { model } = this.props;
    this.props.dispatch({
      type: `${model}/changeState`,
      payload: {
        showDrawer: true,
        edit: true,
        record,
      },
    });
  };

  getCondValue = dataIndex => {
    const { model, state } = this.props;
    const { filterInfo } = state[model];
    return _.get(filterInfo, `[${dataIndex}]`, []);
  };

  // kiểm tra xem dataIndex có vừa được search hay ko
  haveCond = dataIndex => this.getCondValue().length > 0;

  getSearch = dataIndex => ({
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

  getFilter = dataIndex => ({
    filters: _.get(data, `[${dataIndex}]`, []).map((item, index) => ({
      text: item,
      value: index,
    })),
    onFilter: () => true,
    // đồng bộ với cond đang search, isValue lấy cả giá trị 0
    filteredValue: this.getCondValue(dataIndex),
    filterMultiple: false,
    render: item => _.get(data, `[${dataIndex}][${+item}]`, 'Chưa xác định'),
  });

  handleSearchHoTen = hoTen => {
    const { model, cond, firstAtt } = this.props;
    const preCond = this.getCond();
    if (hoTen === '') {
      this.props.dispatch({
        type: `${model}/changeState`,
        payload: {
          filterInfo: {},
        },
      });
      this.props.dispatch({
        type: `${model}/get`,
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
      type: `${model}/get`,
      payload: {
        page: 1,
        limit: 10,
        cond: currentCond,
      },
    });
  };

  render() {
    let {
      state,
      model,
      title,
      Form,
      columns,
      cond,
      actions,
      hasDelete,
      hasEdit,
      hasCreate,
      hasSearch,
      scroll,
      firstAtt,
      ...otherProps
    } = this.props;
    const loading = _.get(state, `loading.models[${model}]`, false);
    const thisModel = state[model] || {};
    let { danhSach, total, paging } = thisModel;
    const { page, limit } = paging;
    danhSach = danhSach.map((item, index) => ({
      ...item,
      index: index + 1 + (page - 1) * limit,
      key: index,
    }));

    columns = columns.map(item => {
      if (item.search === 'filter') return { ...item, ...this.getFilter(item.dataIndex) };
      if (item.search === 'search') return { ...item, ...this.getSearch(item.dataIndex) };
      return item;
    });

    // các actions ở cuối
    const list = (text, record) => (
      <React.Fragment>
        {actions && actions(record).map(x => x)}
        {hasEdit && (
          <React.Fragment>
            <Button
              type="primary"
              shape="circle"
              icon="edit"
              onClick={() => this.handleEdit(record)}
              title="Chỉnh sửa"
            />
            <Divider type="vertical" />
          </React.Fragment>
        )}
        {hasDelete && (
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => this.handleDel(record._id)}>
            <Button type="danger" shape="circle" icon="delete" title="Xóa" />
          </Popconfirm>
        )}
      </React.Fragment>
    );

    const last = {
      // phần tử cuối của columns
      title: 'Tùy chọn',
      width: '120px',
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        const numOfActions = parseInt((actions(record).length + 1) / 2) + !!hasEdit + !!hasCreate;
        return numOfActions >= 3 ? (
          <Popover
            content={list(text, record)}
            title="Thao tác"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button type="primary">
              <Icon type="edit" />
            </Button>
          </Popover>
        ) : (
          list(text, record)
        );
      },
    };

    if (actions) columns.push(last);
    return (
      <div className="box">
        <Card bordered title={<div className="cardTitle">{title}</div>}>
          <Row>
            <Col xs={24}>
              {hasCreate && (
                <Button
                  style={{ marginRight: '20%' }}
                  type="primary"
                  // shape="round"
                  icon="plus"
                  // disabled
                  onClick={() => this.handleThem()}
                >
                  Thêm mới
                </Button>
              )}
              {hasSearch && (
                <InputSearch
                  handleSearch={this.handleSearchHoTen}
                  value={this.getCondValue(firstAtt)}
                  placeholder={`Tìm kiếm theo ${columns[1].title.toLowerCase()}`}
                />
              )}
              <h3 style={{ display: 'inline-block', margin: '0 10px 10px 50px', float: 'right' }}>
                Tổng số:
                <Input
                  style={{ width: '70px', fontWeight: 700, fontSize: 18 }}
                  value={total}
                  readOnly
                />
              </h3>

              <Table
                rowKey={record => record.key}
                style={{ marginTop: 10 }}
                loading={loading}
                bordered
                scroll={scroll}
                columns={columns}
                dataSource={danhSach}
                onChange={this.onChange}
                pagination={{
                  current: page,
                  position: 'bottom',
                  total,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '25', '50', '100'],
                }}
                {...otherProps}
              />
            </Col>
          </Row>
        </Card>
        <FormDrawer name={`${model}`}>
          <Form cond={cond} key={thisModel.record._id || Nhi} />
        </FormDrawer>
      </div>
    );
  }
}

export default TableBase;
