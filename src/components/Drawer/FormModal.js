import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'umi';
import router from 'umi/router';
import queryString from 'query-string';

@connect(state => ({
  state
}))
class SimpleModal extends React.Component {
  onClose = () => {
    this.props.dispatch({
      type: `${this.props.name}/changeState`,
      payload: {
        showModal: false
      }
    });
  };

  render() {
    const { name, state } = this.props; // Name của models. Ex: nghiquyet
    const models = state[name];
    const { showModal } = models;
    return (
      <Modal
        width="100%"
        onCancel={() => this.onClose()}
        onOk={() => this.onClose()}
        visible={showModal}
        footer={null}
        style={{ margin: 0, padding: 0 }}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default SimpleModal;
