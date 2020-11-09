import base from '@/utils/base';
import modelExtend from 'dva-model-extend';
import Services from './service';
import { formatMessage } from 'umi/locale';
export default modelExtend(base(Services), {
  namespace: 'randomuser',
  state: {
    record: {},

  },
  effects: {
    *getUser({ payload }, { call, put }) {
      const response = yield call(Services.getUser, payload);
      yield put({ type: 'setRecord', payload: response.data });
      
    },
  },
  reducers: {
    setRecord(state, action) {
      return {
        ...state,
        record: action.payload,
      };
    }
  }
  
});
