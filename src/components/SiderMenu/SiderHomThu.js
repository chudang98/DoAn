import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';

const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

@connect(({loading, homthu}) => ({
  loading: false,
  menuItem: homthu.menuItem
}))
class Sider extends React.Component {

  handleClick = ({ item, key, keyPath}) => {
    this.props.dispatch({
      type: 'homthu/changeState',
      payload: {
        menuItem: key
      }
    });
    router.push('/HomThuNoiBo');
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={[this.props.menuItem]}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">
          <Icon type="mail" />
          <span>Hộp thư đến</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="forward" />
          <span>Đã gửi</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Sider;
