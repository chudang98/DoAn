/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { Popover, Button, Divider, Icon, Popconfirm } from 'antd';

interface Props {
  record: object;
  handleEdit: Function;
  handleDel: Function;
  hideEdit: boolean;
  actions?: Array<object>;
  functions?: object;
}

interface State {
  visible: boolean;
}

class TagPopover extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.hiden = this.hiden.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  hiden() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { record, handleEdit, handleDel, actions, functions, hideEdit } = this.props;

    const list = record => (
      <React.Fragment>
        {actions.map((item, index) => {
          const { node, click: func } = item;
          return (
            <React.Fragment key={index}>
              <node.type
                {...node.props}
                onClick={() => {
                  this.hiden();
                  return functions[func](record);
                }}
              />
              <Divider type="vertical" />
            </React.Fragment>
          );
        })}

        <Button
          type="primary"
          shape="circle"
          icon="edit"
          disabled={hideEdit}
          onClick={() => {
            this.hiden();
            return handleEdit(record);
          }}
          title="Chỉnh sửa"
        />
        <Divider type="vertical" />

        <Popconfirm
          title="Bạn có chắc muốn xóa?"
          onConfirm={() => {
            this.hiden();
            handleDel(record._id);
          }}
        >
          <Button type="danger" icon="delete" shape="circle" title="Xóa" />
        </Popconfirm>
      </React.Fragment>
    );

    return (
      <Popover
        content={list(record)}
        className="popover"
        visible={this.state.visible}
        onVisibleChange={() => this.handleVisibleChange(!this.state.visible)}
        title="Thao tác"
      >
        <Button
          className="button"
          type="primary"
          onMouseOver={() => this.handleVisibleChange(!this.state.visible)}
        >
          <Icon type="edit" />
        </Button>
      </Popover>
    );
  }
}

export default TagPopover;
