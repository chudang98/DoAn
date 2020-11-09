/* eslint-disable func-names */
import React, { Suspense } from 'react';
import { Layout, notification } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import router from 'umi/router';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { getToken } from '@/utils/Authorized';
import styles from './BasicLayout.less';
import Context from './MenuContext';
import Header from './Header';
import logo from '../assets/logo.jpg';

const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const ip = 'https://api.aepcenter.com/';

const openQuestion = ({ title, body }) => {
  notification.open({
    message: title,
    description: body,
    onClick: () => router.push('/PhanHoi/HoiDap'),
  });
};

const openTech = ({ title, body }) => {
  notification.open({
    message: title,
    description: body,
    onClick: () => router.push('/PhanHoi/HoTro'),
  });
};

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.menu,
}))
class BasicLayout extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
      login,
    } = this.props;

    const token = getToken();
    if (!token || token === 'undefined') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
    dispatch({
      type: 'login/fetchCurrent',
      onComplete: this.setupSocket,
    });

    // // if (!login.TenTaiKhoan) return;
  }

  componentWillUnmount() {
    if (this.socket) this.socket.disconnect();
  }

  setupSocket = () => {
    this.props.dispatch({
      type: 'global/initData',
    });
    // const socket = socketIOClient(ip);
    // this.socket = socket;
    // this.socket.on('new_question', data => openQuestion(data));
    // this.socket.on('new_technical', data => openTech(data));
    if (this.done) return;
    this.done = true;
  };

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && process.env.APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location,
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
      login,
      loading,
    } = this.props;
    console.log('menuData5', menuData);
    let pathname;
    if (!login.TenTaiKhoan) return <PageLoading />;
    if (location) pathname = location.pathname;
    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            loading={!!loading}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />

          <Content className={styles.content} style={contentStyle}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <ErrorBoundary>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </ErrorBoundary>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
