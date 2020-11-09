import React, { Component } from 'react';
import { Button } from 'antd';
import { getUrlHocBa } from '@/services/hocsinh';

class XuatDanhSach extends Component {
    state = {
        loading: false,
    };

    getDanhSach = () => {
        const { record } = this.props;
        // this.setState({ loading: true });
        getUrlHocBa(record._id).then(ret => {
            this.setState({ loading: false });
            window.open(ret.data.url, '_blank');
        });
    };

    render() {
        // const { loading } = this.state;
        return (
          <Button title='Xuất học bạ' type="primary" icon="file" onClick={this.getDanhSach} />
        );
    }
}

export default XuatDanhSach;
