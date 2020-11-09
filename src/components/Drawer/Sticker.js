/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Drawer, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import queryString from 'query-string';
import styles from './style.less';

@connect(state => ({
  state,
}))
class Sticker extends React.Component {
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
    const models = state[name];
    const { showDrawer } = models;
    return (
      <div
        style={{
          width: '50%',
          position: 'fixed',
          bottom: 30,
          right: 30,
          borderRadius: 5,
          display: `${showDrawer ? 'block' : 'none'}`,
          background: 'white',
          zIndex: 10,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Sticker;
