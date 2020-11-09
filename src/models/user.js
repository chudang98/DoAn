// Base feature
// Không chỉnh sửa ở file này
// Nếu muốn thì sửa ở local sau đó báo cho
// maintainer để push lên base
import _ from 'lodash';
import { getId } from '@/services/user';
import notificationAlert from '@/components/Notification';

const initialState = {
  list: [],
  currentUser: {},
};
export default {
  namespace: 'user',

  state: initialState,

  effects: {
    *fetchCurrent({ onComplete: callback }, { call, put }) {
      // lay thong tin user
      let response;
      const token = localStorage.getItem('token');
      const _id = localStorage.getItem('_id');
      if (!token || !_id) {
        yield put.resolve({
          type: 'login/logout',
        });
        return;
      }
      try {
        response = yield call(getId, { _id });
        const { data: user } = response.data;

        yield put({
          type: 'login/changeState',
          payload: {
            TenTaiKhoan: user.hoTen,
            user,
            _id,
          },
        });
        yield put({
          type: 'changeState',
          payload: {
            currentUser: _.get(response, 'data', {}),
          },
        });
        if (
          _.get(response, 'data.data.vaiTro', undefined) === 0 &&
          typeof callback === 'function'
        ) {
          callback();
        }
      } catch (err) {
        // token hết hạn
        yield put.resolve({
          type: 'login/logout',
        });
        notificationAlert('error', 'Hết phiên đăng nhập', 'Vui lòng đăng nhập lại');
      }
    },

    reducers: {
      changeState(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
      save(state, action) {
        return {
          ...state,
          list: action.payload,
        };
      },
      saveCurrentUser(state, action) {
        return {
          ...state,
          currentUser: action.payload || {},
        };
      },
      changeNotifyCount(state, action) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            notifyCount: action.payload.totalCount,
            unreadCount: action.payload.unreadCount,
          },
        };
      },
    },
  },
};
