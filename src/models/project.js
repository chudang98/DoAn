import { queryProjectNotice } from '@/services/api';

const initialState = {
  notice: [],
};
export default {
  namespace: 'project',

  state: initialState,

  effects: {
    *fetchNotice(_, { call, put }) {
      // const response = yield call(queryProjectNotice);
      const response = [];
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
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
