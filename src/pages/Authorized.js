import React from 'react';
import Redirect from 'umi/redirect';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import _ from 'lodash';
import Authorized from '@/utils/Authorized';

function AuthComponent({ children, location, routerData, status }) {
  const isLogin = status === 'ok';

  const getRouteAuthority = (pathname, routeData) => {
    const routes = routeData.slice(); // clone

    const getAuthority = (routeDatas, path) => {
      let authorities;
      routeDatas.forEach(route => {
        // check partial route
        if (pathToRegexp(`${route.path}(.*)`).test(path)) {
          if (route.authority) {
            authorities = route.authority;
          }
          // is exact route?
          if (!pathToRegexp(route.path).test(path) && route.routes) {
            authorities = getAuthority(route.routes, path);
          }
        }
      });

      return authorities;
    };

    return getAuthority(routes, pathname);
  };
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect push to="/user/login" />}
    >
      {children}
    </Authorized>
  );
}
export default connect(({ menu: menuModel, login: loginModel }) => ({
  routerData: _.get(menuModel, 'routerData', []),
  status: _.get(loginModel, 'status', false),
}))(AuthComponent);
