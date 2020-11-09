import notificationAlert from '@/components/Notification';
import fetch from 'dva/fetch';
import { createLogger } from 'redux-logger';
import { checkVersion } from '@/models/login';

export const dva = {
  config: {
    onError(err, dispatch) {
      err.preventDefault();
      const { response, request } = err;
      if (!request) {
        notificationAlert('error', 'Gặp lỗi trong quá trình thực hiện');
        console.log(err);
        return;
      }
      if (!response) {
        notificationAlert('error', 'Không thể kết nối', 'Vui lòng kiểm tra đường truyền');
        return;
      }
      const {
        data: { message: msg, error },
        status,
      } = response;
      switch (status) {
        case 400:
          notificationAlert('error', 'Bad request');
          break;

        case 401:
          notificationAlert('error', 'Token quá hạn, vui lòng đăng nhập lại');
          dispatch({
            type: 'login/logout',
          });
          break;

        case 403:
          notificationAlert('error', 'Truy vấn không được phép');
          break;

        case 404:
          notificationAlert('error', 'Server không tìm thấy dữ liệu', msg || error.message);
          break;
        case 405:
          notificationAlert('error', 'Truy vấn không được phép', msg || error.message);
          break;

        case 409:
          notificationAlert('error', 'Dữ liệu chưa đúng', msg || error.message);
          break;

        case 418:
          checkVersion(error.message);
          break;

        case 500:
          notificationAlert('error', 'Server gặp lỗi', msg || error.message);
          break;

        default:
          break;
      }
    },
    onAction: createLogger(),
    /**
     * Khi logout Xóa hết state redux di
     */
    onReducer: reducer => (state, action) => {
      const newState = reducer(state, action);
      return { ...newState, routing: newState.routing };
    },
  },
};

let authRoutes = {};

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if (element.path === authKey) {
      if (!element.authority) element.authority = []; // eslint-disable-line
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

export function patchRoutes(routes) {
  Object.keys(authRoutes).map(authKey =>
    ergodicRoutes(routes, authKey, authRoutes[authKey].authority),
  );
  window.g_routes = routes;
}

export function render(oldRender) {
  fetch('/api/auth_routes')
    .then(res => res.json())
    .then(
      ret => {
        authRoutes = ret;
        oldRender();
      },
      () => {
        oldRender();
      },
    );
}
