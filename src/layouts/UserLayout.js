import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Row, Col } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import getPageTitle from '@/utils/getPageTitle';
import styles from './UserLayout.less';
import logo from '../assets/logo.jpg';
import pkgJson from '../../package.json';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Bản quyền <Icon type="copyright" /> 2019 Liên Cấp
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo FTU Ngoai thuong" className={styles.logo} src={logo} />
                  <span className={styles.title}>{formatMessage({ id: 'TITLE' })}</span>
                </Link>
              </div>
              {/* <div className={styles.desc}>Cung cấp giải pháp quản lý tác tử trên nền tảng Web</div> */}
            </div>
            {children}
          </div>
          {/* <GlobalFooter links={links} copyright={copyright} /> */}
          <Row>
            <Col xs={24}>
              <div style={{ textAlign: 'center', color: '#C01718', fontWeight: 'bold' }}>
                {`Version: ${pkgJson.version}`}
              </div>
            </Col>
          </Row>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
