import { queryBasicProfile, queryAdvancedProfile } from '@/services/api';

const initialState = {
  basicGoods: [],
  advancedOperation1: [],
  advancedOperation2: [],
  advancedOperation3: [],
};
export default {
  namespace: 'profile',

  state: initialState,

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryBasicProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
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
