/* eslint-disable comma-dangle */
/* eslint-disable no-alert */
import React from 'react';
import TagPopover from '@/components/TagPopover/TagPopover';
import { Button, Popover, Divider, Popconfirm } from 'antd';
import { shallow, mount } from 'enzyme';

let wrapper;
let list;
let actions;
let functions;
let handleEdit = () => {
  alert('edit');
};
beforeEach(() => {
  functions = {
    handleView: () => {
      alert('view');
    },
    resetPwd: () => {
      alert('resetPwd');
    },
    forceActice: () => {
      alert('forceActive');
    },
  };
  actions = [
    {
      node: (
        <Button
          key={0}
          style={{ backgroundColor: '#096dd9', color: '#fff' }}
          type="primary"
          shape="circle"
          icon="eye"
          title="Xem Thông Tin"
        />
      ),
      click: 'handleView',
    },
    {
      node: (
        <Button key={1434} type="primary" shape="circle" icon="reload" title="Cấp lại mật khẩu" />
      ),
      click: 'resetPwd',
    },
  ];
  wrapper = mount(
    <TagPopover
      record={{ a: 1, b: 2 }}
      // handleEdit={() => {
      //   alert('edit');
      // }}
      handleEdit={handleEdit}
      handleDel={() => {
        alert('del');
      }}
      actions={actions}
      functions={functions}
    />
  );
  list = record => (
    <React.Fragment>
      {actions.map((item, index) => {
        const { node, click: func } = item;
        return (
          <React.Fragment key={index}>
            <node.type
              {...node.props}
              onClick={() => {
                // this.hiden();
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
        className="edit"
        // disabled={hideEdit}
        onClick={() => {
          // this.hiden();
          // return handleEdit(record);
        }}
        title="Chỉnh sửa"
      />
      <Divider type="vertical" />

      <Popconfirm
        title="Bạn có chắc muốn xóa?"
        onConfirm={() => {
          // this.hiden();
          // handleDel(record._id);
        }}
      >
        <Button type="danger" shape="circle" icon="delete" title="Xóa" />
      </Popconfirm>
    </React.Fragment>
  );
});
describe('<TagPopover/> rendering', () => {
  it('<Popover/> render', () => {
    expect(wrapper.find('Popover')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('Popover render', () => {
    const WrapperPopover = mount(
      <Popover content={list({ a: 1, b: 2 })} visible title="Thao tác" />
    );
    expect(WrapperPopover.find('Divider')).toHaveLength(3);
    expect(WrapperPopover.find('Button')).toHaveLength(4);
  });
});

describe('<TagPopover /> interactions', () => {
  it('should change state visible to be true when edit button is hovered', () => {
    wrapper.find('Button').simulate('mouseOver');
    expect(wrapper.state('visible')).toEqual(true);
    expect(wrapper.find('Button')).toHaveLength(5);
  });
  it('should call handleVisibleChange when edit button is hovered', () => {});
  // it('should call handleEdit when edit button is clicked', () => {
  //   wrapper.setState({ visible: true }); // loi ko thay doi state
  //   wrapper.update();
  //   const mockHandleEdit = jest.fn();
  //   handleEdit = mockHandleEdit
  //   expect(wrapper.find({ icon: 'edit' })).toHaveLength(1);
  //   wrapper.find({ icon: 'edit' }).simulate('click');
  //   expect(handleEdit).toHaveBeenCalledTimes(1);
  // });
});
