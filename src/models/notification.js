import modelExtend from 'dva-model-extend';
import { formatMessage } from 'umi/locale';
import _ from 'lodash';
import Services from '@/services/notification';
import base from '../utils/base';

import notificationAlert from '@/components/Notification';

export default modelExtend(base(Services), {
  state: {
    // Su dung cho modal
    visible: false,
    danhSachGui: [],
    totalModal: 0,
    pagingModal: {
      page: 1,
      limit: 10,
    }
  },
  namespace: 'notification',
  effects: {
    *send({ payload }, { call, put }) {
      try {
        yield call(Services.send, payload);
        notificationAlert('success', formatMessage({ id: 'THEM_THANH_CONG' }));
        yield put({ type: 'get' });
        yield put({ type: 'changeState', payload: { showDrawer: false } });
      } catch (error) {
        notificationAlert('error', "Gửi thông báo không thành công", "Danh sách người nhận trống");
      }
    },

    *sendThongBaoTheoIdLop({ payload }, { call, put }) {
      yield call(Services.sendThongBaoTheoIdLop, payload);
      notificationAlert('success', formatMessage({ id: 'THEM_THANH_CONG' }));
      yield put({ type: 'get' });
      yield put({ type: 'changeState', payload: { showDrawer: false } });
    },

    *sendThongBaoTheoIdNhom({ payload }, { call, put }) {
      yield call(Services.sendThongBaoTheoIdNhom, payload);
      notificationAlert('success', formatMessage({ id: 'THEM_THANH_CONG' }));
      yield put({ type: 'get' });
      yield put({ type: 'changeState', payload: { showDrawer: false } });
    },

    *getById({ payload }, { call, put }) {
      const { page, limit } = payload;
      const response = yield call(Services.getById, payload);
      yield put({
        type: 'changeState',
        payload: {
          danhSachGui: _.get(response, 'data.data', []),
          pagingModal: {
            page,
            limit,
          },
          totalModal: _.get(response, 'data.total', 0),
        }
      })
    }
  },
});
