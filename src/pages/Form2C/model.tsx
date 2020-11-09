import base, { IBase } from '@/utils/base';
import modelExtend from 'dva-model-extend';
import Services from '@/pages/Form2C/service';

export interface IForm2CState extends IBase {
  showDrawer,
  tinhThanh,
}

export default modelExtend(base(Services), {
  namespace: 'form2c',
  state: {
    showDrawer: true,
    tinhThanh: [],
  },
  effects: {
    *getTinhThanh({ payload }, { call, put, select }) {
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.getTinhThanh, currentPayload);
      
      yield put({
        type: 'changeState',
        payload: {
          tinhThanh: response.data.data
        },
      });
    },
  },
});
