import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';

@connect(state => ({
  state,
}))
class SimpleDrawer extends React.Component {
  onClose = () => {
    this.props.dispatch({
      type: `${this.props.name}/changeState`,
      payload: {
        showModal: false,
      },
    });
  };

  render() {
    const { name, state } = this.props; // Name của models. Ex: nghiquyet
    const models = state[name];
    const { showModal } = models;
    return (
      <Modal width="60%" onClose={this.onClose} visible={showModal} closable={false} destroyOnClose>
        {this.props.children}
      </Modal>
    );
  }
}

export default SimpleDrawer;
