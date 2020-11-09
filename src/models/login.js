import router from 'umi/router';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { formatMessage } from 'umi/locale';
import _ from 'lodash';
import { setAuthority, setToken, getAuthority } from '@/utils/authority';
import { getPageQuery, includes } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import notificationAlert from '@/components/Notification';
import {
  login as loginRequest,
  logout,
  changePassword,
  updateProfile,
  // loginFacebook,
  // loginGoogle,
  getId,
} from '@/services/user';

import { Process } from '@/utils/selfFunction.js';
import data from '@/utils/data';
import moment from 'moment';
import pkgJson from '../../package.json';

const handleRedirect = vaiTro => {
  const { pathname } = window.location;
  if (includes(pathname, '/user/login') || pathname === '') {
    router.push(_.get(data, `path[${vaiTro}]`, '/'));
  }
};

const reloadWeb = () => {
  window.location.reload();
  localStorage.setItem('lastUpdate', moment());
};

export const checkVersion = version => {
  notificationAlert(
    'warning',
    `Phiên bản hiện tại của bạn là: v${pkgJson.version}. Phiên bản của hệ thống là: v${version}. Vui lòng đợi trong giây lát để cập nhật phiên bản mới.`
  );
  setTimeout(() => {
    reloadWeb();
  }, 4000);
};

const initialState = {
  status: undefined,
  TenTaiKhoan: undefined,
  _id: undefined,
  user: {},
};
export default {
  namespace: 'login',

  state: initialState,

  effects: {
    *login({ payload }, { call, put }) {
      const { userName: username, password } = payload;
      let response;
      try {
        response = yield call(loginRequest, { username, password });
      } catch (err) {
        const {
          response: {
            status,
            data: { error },
          },
        } = err;
        if (status === 418) {
          checkVersion(error.message);
          return;
        }
        notificationAlert('error', formatMessage({ id: 'Tên tài khoản hoặc mật khẩu chưa đúng' }));
        return;
      }
      const { canLogin, state, message } = Process(response.data);
      if (!canLogin) {
        notificationAlert(
          'error',
          message || formatMessage({ id: 'Tên tài khoản hoặc mật khẩu chưa đúng' })
        );
        return;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: true,
          ...state,
        },
      });

      const {
        token,
        _id,
        user: { vaiTro },
      } = state;

      localStorage.setItem('token', token);
      localStorage.setItem('_id', _id);

      // Login successfully
      reloadAuthorized();
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = redirect;
        }
      }
      // handleRedirect(vaiTro);
      yield put(routerRedux.replace('/'));
    },
    // *loginFacebook({ payload }, { call, put }) {
    //   const response = yield call(loginFacebook, payload);
    //   const { canLogin, state, message } = Process(response.data);
    //   if (!canLogin) {
    //     notificationAlert('error', message || 'Không thể đăng nhập');
    //     return;
    //   }
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: {
    //       status: true,
    //       ...state,
    //     },
    //   });

    //   const {
    //     token,
    //     _id,
    //     user: { vaiTro },
    //   } = state;

    //   localStorage.setItem('token', token);
    //   localStorage.setItem('_id', _id);

    //   // Login successfully
    //   reloadAuthorized();
    //   const urlParams = new URL(window.location.href);
    //   const params = getPageQuery();
    //   let { redirect } = params;
    //   if (redirect) {
    //     const redirectUrlParams = new URL(redirect);
    //     if (redirectUrlParams.origin === urlParams.origin) {
    //       redirect = redirect.substr(urlParams.origin.length);
    //       if (redirect.match(/^\/.*#/)) {
    //         redirect = redirect.substr(redirect.indexOf('#') + 1);
    //       }
    //     } else {
    //       window.location.href = redirect;
    //       return;
    //     }
    //   }

    //   handleRedirect(vaiTro);
    // },
    // *loginGoogle({ payload }, { call, put }) {
    //   const response = yield call(loginGoogle, payload);
    //   const { canLogin, state, message } = Process(response.data);
    //   if (!canLogin) {
    //     notificationAlert('error', message || 'Không thể đăng nhập');
    //     return;
    //   }
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: {
    //       status: true,
    //       ...state,
    //     },
    //   });

    //   const {
    //     token,
    //     _id,
    //     user: { vaiTro },
    //   } = state;

    //   localStorage.setItem('token', token);
    //   localStorage.setItem('_id', _id);

    //   // Login successfully
    //   reloadAuthorized();
    //   const urlParams = new URL(window.location.href);
    //   const params = getPageQuery();
    //   let { redirect } = params;
    //   if (redirect) {
    //     const redirectUrlParams = new URL(redirect);
    //     if (redirectUrlParams.origin === urlParams.origin) {
    //       redirect = redirect.substr(urlParams.origin.length);
    //       if (redirect.match(/^\/.*#/)) {
    //         redirect = redirect.substr(redirect.indexOf('#') + 1);
    //       }
    //     } else {
    //       window.location.href = redirect;
    //       return;
    //     }
    //   }

    //   handleRedirect(vaiTro);
    // },
    *fetchCurrent({ onComplete: callback }, { call, put }) {
      // lay thong tin user
      const token = localStorage.getItem('token');
      const _id = localStorage.getItem('_id');
      if (!token || !_id) {
        yield put({
          type: 'logout',
        });
        return;
      }
      try {
        const response = yield call(getId, { _id });

        const { data: user } = response.data;
        const role = getAuthority();
        const { chucNangChoPhep } = user;
        localStorage.setItem('chucNangChoPhep', chucNangChoPhep);
        yield put({
          type: 'changeState',
          payload: {
            TenTaiKhoan: user.hoTen,
            user,
            _id,
            currentUser: _.get(response, 'data', {}),
          },
        });
        yield put({
          type: 'global/initData',
          role,
        });
        handleRedirect(user.vaiTro);
        if (callback) callback();
      } catch (err) {
        const {
          response: {
            status,
            data: { error },
          },
        } = err;
        if (status === 418) {
          checkVersion(error.message);
          return;
        }

        // token hết hạn
        yield put.resolve({
          type: 'login/logout',
        });
        notificationAlert('error', 'Hết phiên đăng nhập', 'Vui lòng đăng nhập lại');
      }
    },
    *changePassword({ payload }, { call, put, select }) {
      if (payload.oldPassword === payload.newPassword) {
        notificationAlert('error', 'Mật khẩu mới không được trùng với mật khẩu cũ');
        return;
      }
      const response = yield call(changePassword, payload);
      const { success, message } = response.data;
      if (!success) {
        notificationAlert('error', 'Mật khẩu cũ  không chính xác');
        return;
      }
      notificationAlert(
        'success',
        'Đổi mật khẩu thành công',
        formatMessage({ id: 'DANG_NHAP_LAI' })
      );
      yield put({
        type: 'login/logout',
      });
    },
    *updateProfile({ payload, onComplete }, { call, put }) {
      yield call(updateProfile, payload);
      notificationAlert('success', formatMessage({ id: 'SUA_THANH_CONG' }));
      yield put({ type: 'get' });
      if (onComplete) onComplete();
      yield put({ type: 'changeState', payload: { showDrawer: false } });
    },

    *logout(_, { put, call, select }) {
      /**
       * remove chat token
       */
      try {
        yield call(logout);
      } catch (e) {
        console.log(e);
      }

      localStorage.removeItem('token');
      localStorage.removeItem('chucNangChoPhep');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setToken(payload.token);
      return {
        ...state,
        TenTaiKhoan: payload.TenTaiKhoan,
        status: payload.status,
        _id: payload._id,
        user: payload.user,
      };
    },
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
