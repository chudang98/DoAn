import React, { Component } from 'react';
import { Button, notification } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { genUUID } from '@/services/hocsinh';
import notificationAlert from '@/components/Notification';

@connect(({ loading }) => ({
  loading: loading.models.hocsinh,
}))
class GenUUID extends Component {
  state = {
    loading: false,
  };

  gen = () => {
    this.setState({ loading: true });
    genUUID()
      .then(ret => {
        this.setState({ loading: false });
        notificationAlert('success', formatMessage({ id: 'Thêm thành công' }), '');
      })
      .catch(err => {
        notificationAlert('error', formatMessage({ id: 'Thêm bị lỗi' }), '');
      })
      .finally(() => {
        this.props.dispatch({
          type: 'hocsinh/get',
        });
      });
  };

  render() {
    const { loading } = this.state;
    return (
      // <Spin spinning={loading}>
      <Button
        type="primary"
        icon="file-done"
        loading={loading || this.props.loading}
        onClick={this.gen}
      >
        Sinh mã UUID toàn trường
      </Button>
      // </Spin>
    );
  }
}

export default GenUUID;
