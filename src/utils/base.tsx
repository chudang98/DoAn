import _ from 'lodash';
import { formatMessage } from 'umi/locale';
import notificationAlert from '@/components/Notification';

export interface IBase {
  filterInfo?: object;
  showDrawer?: boolean;
  paging?: {
    page: number;
    limit: number;
    cond: object;
  };
  total?: number;
  danhSach?: any[];
  edit?: boolean;
  record?: { _id?: string };
  isTouched?: boolean;
}

const initialState: IBase = {
  danhSach: [],
  edit: false,
  record: {},
  showDrawer: false,
  paging: {
    page: 1,
    limit: 10,
    cond: {},
  },
  filterInfo: {},
  total: 0,
  isTouched: false,
};

const model = Services => ({
  state: initialState,
  effects: {
    *get({ payload }, { call, put, select }) {
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.get, currentPayload);
      yield put({
        type: 'changeState',
        payload: {
          danhSach: _.get(response, 'data.data', []),
          paging: currentPayload,
          total: _.get(response, 'data.total', 0),
        },
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(Services.add, payload);
      console.log("respse la day");
      console.log(response);
      
      notificationAlert('success', formatMessage({ id: 'THEM_THANH_CONG' }));
      yield put({ type: 'get' });
      yield put({ type: 'changeState', payload: { showDrawer: false } });
    },
    *del({ payload }, { call, put, select }) {
      const {
        paging: { page, limit, cond },
        total,
      } = yield select(state => state[Services.name]);
      const currentPage =
        total % limit == 1 && page == Math.ceil(total / limit) && page > 1 ? page - 1 : page;
      yield call(Services.del, payload);
      notificationAlert('success', formatMessage({ id: 'XOA_THANH_CONG' }));
      yield put({ type: 'get', payload: { page: currentPage, limit, cond } });
    },
    *upd({ payload }, { call, put }) {
      yield call(Services.upd, payload);
      notificationAlert('success', formatMessage({ id: 'SUA_THANH_CONG' }));
      yield put({ type: 'get' });
      yield put({ type: 'changeState', payload: { showDrawer: false } });
    },
  },
  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export default model;
