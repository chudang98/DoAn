import { queryNotices, putDeviceData, readedAll, readedNoti } from '@/services/api';

const initialState = {
  collapsed: false,
  notices: [],
  loadedAllNotices: false,
  notifyCount: 0,
  unreadCount: 0,
  deviceData: {},
};
export default {
  namespace: 'global',

  state: initialState,

  effects: {
    *initData({ payload }, { call, put, select }) {
      yield put({
        type: 'khoa/get',
        payload: {
          page: 1,
          limit: 1000,
          cond: {},
        },
      });
      yield put({
        type: 'monhoc/get',
      });
    },
    *putDeviceData({ payload }, { call, put, select }) {
      const response = yield call(putDeviceData, payload);
      yield put({
        type: 'changeState',
        payload: {
          deviceData: response.data,
        },
      });
    },

    *fetchNotices({ payload }, { call, put, select }) {
      // * load lần đầu tiên
      const response = yield call(queryNotices, payload);
      const { page, limit } = payload;
      const { data, unread, total } = response.data;
      yield put({
        type: 'changeState',
        payload: {
          notices: data,
          loadedAllNotices: total <= limit,
          unreadCount: unread,
          notifyCount: data.length,
        },
      });
    },
    *fetchMoreNotices({ payload }, { call, put, select }) {
      // * payload: {page, limit = 5}
      const page = parseInt((yield select(state => state.global.notifyCount)) / 5);

      const response = yield call(queryNotices, {
        page: page + 1,
        limit: 5,
      });
      const { data, total } = response.data;
      const notices = yield select(state => state.global.notices);
      notices.push(...data);
      yield put({
        type: 'changeState',
        payload: {
          notices,
          loadedAllNotices: notices.length === total,
          notifyCount: notices.length,
        },
      });
    },
    *clearNotices({ payload }, { put, select, call }) {
      yield put({
        type: 'clearNoticesReduces',
      });
      try {
        yield call(readedAll);
      } catch (e) {
        yield put({
          type: 'fetchOldNotices',
        });
      }
    },
    *changeNoticeReadState({ payload: { _id } }, { call, put, select }) {
      yield put({
        type: 'changeReadedNotices',
        payload: {
          _id,
          status: 1,
        },
      });
      try {
        yield call(readedNoti, { _id, status: 1 });
      } catch (e) {
        yield put({
          type: 'changeReadedNotices',
          payload: {
            _id,
            status: 0,
          },
        });
      }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    clearNoticesReduces(state, { payload }) {
      const { notices } = state;
      const tmp = notices.map(item => ({
        ...item,
        status: 1,
      }));
      return {
        ...state,
        notices: tmp,
        tmp: notices,
        unreadCount: 0,
        unreadCountOld: state.unreadCount,
      };
    },
    fetchOldNotices(state, { payload }) {
      return {
        ...state,
        notices: state.tmp,
        unreadCount: state.unreadCountOld,
      };
    },
    pushNotices(state, { payload }) {
      return {
        ...state,
        notices: [...state.notices, ...payload],
      };
    },
    setLoadedStatus(state, { payload }) {
      return {
        ...state,
        loadedAllNotices: payload,
      };
    },
    changeReadedNotices(state, { payload: { _id, status } }) {
      let { notices } = state;
      notices = notices.map(item => {
        if (item._id !== _id) return item;
        return {
          ...item,
          status,
        };
      });
      const add = status === 1 ? -1 : 1;
      return {
        ...state,
        notices,
        unreadCount: state.unreadCount + add,
      };
    },
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
