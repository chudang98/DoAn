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
    danToc: [],
    tonGiao: [],
  },
  effects: {
    *getTinhThanh({ payload }, { call, put, select }) {
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.getTinhThanh);
      
      yield put({
        type: 'changeState',
        payload: {
          tinhThanh: response.data.data
        },
      });
    },

    *getQuanHuyen({ payload }, { call, put, select }) {
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.getHuyen, currentPayload.maTinh);
      
      yield put({
        type: 'changeState',
        payload: {
          quanHuyen: response.data.data
        },
      });
    },

    *getXaPhuong({ payload}, { call, put, select }){
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.getXa, currentPayload.maHuyen);
      
      yield put({
        type: 'changeState',
        payload: {
          xaPhuong: response.data.data
        },
      });
    },

    *getDanToc({ payload }, { call, put, select}){
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.getDanToc);
      
      yield put({
        type: 'changeState',
        payload: {
          danToc: response.data.data
        },
      });
    },

    *getTonGiao({ payload }, { call, put, select}){
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.getTonGiao);
      
      yield put({
        type: 'changeState',
        payload: {
          danToc: response.data.data
        },
      });
    }
  },
});
