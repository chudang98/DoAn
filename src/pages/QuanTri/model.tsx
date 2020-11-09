import base, { IBase } from '@/utils/base';
import _ from 'lodash';
import modelExtend from 'dva-model-extend';
import Services from '@/pages/QuanTri/service';

export interface IQuanTriState extends IBase {
  isFormEmploee: boolean;
  isShowInfor: boolean;
  checkedRecord: {};
  dataTree: any[];
  treeRecord: any[];
}

export default modelExtend(base(Services), {
  namespace: 'quantri',
  state: {
    isFormEmploee: true,
    isShowInfor: false,
    checkedRecord: {},
    dataTree: [],
    treeRecord: [],
  },
  effects: {
    *getTreeAndDanhSach({ payload }, { call, put, select }) {
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      // const responseDanhSach = yield call(Services.getDanhSach, currentPayload);
      const response = yield call(Services.get, currentPayload);
      const responseTree = yield call(Services.getTreeRecord, currentPayload);
      const getedTree = (data: any[]) => {
        let tree = [];
        let key = '0-';
        data.forEach((value, index) => {
          let treeNode = {
            title: value.tenDonVi,
            key: key + index,
          };
          tree.push(treeNode);
        });
        return tree;
      };
      console.log('day la response ');
      console.log(responseTree);
      yield put({
        type: 'changeState',
        payload: {
          checkedRecord: responseTree.data.data[0],
          dataTree: responseTree.data.data,
          treeRecord: getedTree(responseTree.data.data),
          danhSach: _.get(response, 'data.data', []),
          paging: currentPayload,
          total: _.get(response, 'data.total', 0),
        },
      });
    },
    *getSpecifitedUni({ payload }, { call, put, select }) {
      let currentPayload = { ...payload };
      if (!payload) {
        const modelName = Services.name;
        currentPayload = yield select(state => state[modelName].paging);
      }
      const response = yield call(Services.getSpecifitedUni, currentPayload);
      console.log('log chi tiet ');
      console.log(response);
      yield put({
        type: 'changeState',
        payload: {
          checkedRecord: response.data.data,
        },
      });
    },
  },
});
