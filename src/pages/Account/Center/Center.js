import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Row, Col, Avatar, Tag, Divider, Input } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import avatar from '@/assets/admin.png';
import data from '@/utils/data';
import styles from './Center.less';

@connect(({ loading, login }) => ({
  currentUser: login.user,
  currentUserLoading: loading.effects['login/fetchCurrent'],
}))
class Center extends PureComponent {
  state = {};

  componentDidMount() {}

  onTabChange = key => {
    const { match } = this.props;
    router.push(`${match.url}/${key}`);
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const { currentUser, currentUserLoading, match, location, children } = this.props;
    const operationTabList = [
      {
        key: 'editProfile',
        tab: 'Thông tin tài khoản',
      },
      {
        key: 'changePassword',
        tab: <span>Đổi mật khẩu</span>,
      },
      // {
      //   key: 'applications',
      //   tab: (
      //     <span>
      //       {formatMessage({ id: 'Ứng dụng' })}
      //       <span style={{ fontSize: 14 }}>(0)</span>
      //     </span>
      //   ),
      // },
      // {
      //   key: 'projects',
      //   tab: (
      //     <span>
      //       {formatMessage({ id: 'Dự án' })}
      //       <span style={{ fontSize: 14 }}>(0)</span>
      //     </span>
      //   ),
      // },
    ];

    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={currentUserLoading}>
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="avatar" src={currentUser.anhDaiDien || avatar} />
                    <div className={styles.name}>{currentUser.hoTen}</div>
                    <div>
                      <i>{currentUser.username}</i>
                    </div>
                    <div>
                      <i>{currentUser.email}</i>
                    </div>
                    <div>
                      Ngày sinh:{' '}
                      {currentUser.ngaySinh && moment(currentUser.ngaySinh).format('DD-MM-YYYY')}
                    </div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {data.gioiTinh[currentUser.gioiTinh]}
                    </p>
                    <p>
                      <i className={styles.group} />
                      {data.vaiTro[currentUser.vaiTro] || 'Không'}
                    </p>
                    <p>
                      <i className={styles.address} />
                      {_.get(currentUser, 'diaChiHienNay', 'Việt Nam')}
                    </p>
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={currentUserLoading}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
