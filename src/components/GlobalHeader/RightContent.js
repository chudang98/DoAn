import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import {
  Spin,
  Tag,
  Menu,
  Icon,
  Avatar,
  Tooltip,
  Badge,
  Modal,
  Typography,
  Card,
  Button,
} from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import _ from 'lodash';
import { connect } from 'dva';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import pkgJson from '../../../package.json';

@connect(({ login, loading, global }) => ({
  TenTaiKhoan: login.TenTaiKhoan,
  currentUser: login.currentUser,
  global,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
}))
export default class GlobalHeaderRight extends PureComponent {
  state = {
    visible: false,
    record: {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'global/fetchNotices',
      payload: {
        page: 1,
        limit: 5, // * ko thay đổi
      },
    });
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = (clickedItem, tabProps) => {
    const { _id } = clickedItem;
    this.setState({
      visible: true,
      record: clickedItem,
    });
    if (clickedItem.readed) return;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: {
        _id,
      },
    });
  };

  fetchMoreNotices = tabProps => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchMoreNotices',
    });
  };

  handleOk = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      fetchingMoreNotices,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
      TenTaiKhoan,
      global: { loadedAllNotices, notices, notifyCount, unreadCount },
    } = this.props;

    const { visible, record } = this.state;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        {/* <Menu.Item key="userinfo">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item> */}
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    const loadMoreProps = {
      skeletonCount: 5,
      loadedAll: loadedAllNotices,
      loading: fetchingMoreNotices,
    };

    const noticeData = notices.map(item => ({
      ...item,
      title: item.title,
      description: item.content,
      datetime: moment(item.createdAt).fromNow(),
      readed: !!item.status,
    }));

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {/* <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
          dataSource={[
            formatMessage({ id: 'component.globalHeader.search.example1' }),
            formatMessage({ id: 'component.globalHeader.search.example2' }),
            formatMessage({ id: 'component.globalHeader.search.example3' }),
          ]}
          onSearch={value => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a target="_blank" href="#" rel="noopener noreferrer" className={styles.action}>
            <Icon type="question-circle-o" />
          </a>
        </Tooltip> */}
        <Tooltip title="Tin nhắn">
          <Badge dot>
            <a target="_blank" href="http://chatftu.aisenote.com/" rel="noopener noreferrer">
              <Icon type="message" className={styles.action} />
            </a>
          </Badge>
        </Tooltip>

        <NoticeIcon
          className={styles.action}
          count={unreadCount}
          onItemClick={(item, tabProps) => {
            this.changeReadState(item, tabProps);
          }}
          locale={{
            emptyText: 'Không có thông báo',
            clear: 'Đánh dấu tất cả đã đọc',
            loadedAll: 'Đã tải toàn bộ',
            loadMore: 'Tải thêm',
          }}
          onClear={onNoticeClear}
          onLoadMore={this.fetchMoreNotices}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          clearClose
        >
          <NoticeIcon.Tab
            title="Thông báo mới"
            count={notifyCount}
            list={noticeData}
            name="notification"
            emptyText="Không có thông báo"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            {...loadMoreProps}
          />
        </NoticeIcon>

        {TenTaiKhoan ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src="data:image/jpeg;base64,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"
                alt="avatar"
              />
              <span className={styles.name}>{TenTaiKhoan}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <SelectLang className={styles.action} />
        <span style={{ padding: '0 8px' }}>{`v${pkgJson.version}`}</span>
        <Modal
          title="Thông Báo Từ Hệ Thống"
          visible={visible}
          destroyOnClose
          onCancel={this.handleOk}
          footer={[
            <Button type="primary" onClick={this.handleOk}>
              OK
            </Button>,
          ]}
          width="60%"
        >
          <Card>
            <Typography>
              <Typography.Text>{moment(record.sentAt).format('DD/MM/YYYY HH:mm')}</Typography.Text>
              <Typography.Title style={{ fontSize: 20 }}>{record.title}</Typography.Title>
              <Typography.Paragraph style={{ textAlign: 'justify' }}>
                {record.content}
              </Typography.Paragraph>
            </Typography>
          </Card>
        </Modal>
      </div>
    );
  }
}
