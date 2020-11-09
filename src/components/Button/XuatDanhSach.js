import React, { Component } from 'react';
import { Button } from 'antd';
import { exportXLSX } from '@/services/hocsinh';

class XuatDanhSach extends Component {
  state = {
    loading: false,
  };

  getDanhSach = () => {
    this.setState({ loading: true });
    exportXLSX().then(ret => {
      this.setState({ loading: false });
      window.open(ret.data.url, '_blank');
    });
  };

  render() {
    const { loading } = this.state;
    return (
      // <Spin spinning={loading}>
      <Button type="primary" icon="download" loading={loading} onClick={this.getDanhSach}>
        Xuất danh sách toàn trường
      </Button>
      // </Spin>
    );
  }
}

export default XuatDanhSach;
