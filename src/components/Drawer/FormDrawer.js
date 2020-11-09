import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'dva';

@connect(state => ({
  state,
}))
class SimpleDrawer extends React.Component {
  onClose = () => {
    this.props.dispatch({
      type: `${this.props.name}/changeState`,
      payload: {
        showDrawer: false,
      },
    });
  };

  render() {
    const { name, state } = this.props; // Name của models. Ex: nghiquyet
    const { drawerStyle } = this.props;
    const models = state[name];
    const { showDrawer } = models;
    return (
      <Drawer
        width="80%"
        onClose={this.onClose}
        visible={showDrawer}
        closable={false}
        destroyOnClose
        mask
        style={drawerStyle}
      >
        {this.props.children}
      </Drawer>
    );
  }
}

export default SimpleDrawer;
