import queryError from '@/services/error';

const initialState = {
  error: '',
  isloading: false,
};
export default {
  namespace: 'error',

  state: initialState,

  effects: {
    *query({ payload }, { call, put }) {
      yield call(queryError, payload.code);
      yield put({
        type: 'trigger',
        payload: payload.code,
      });
    },
  },

  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    trigger(state, action) {
      return {
        error: action.payload,
      };
    },
  },
};
