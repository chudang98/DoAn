import { formatMessage } from 'umi/locale';

import notificationAlert, { success, error } from '@/components/Notification';
// import { getKiemNhiem } from '@/services/kiemnhiem';
const initialState = {};
export default {
  namespace: 'api',

  state: initialState,

  effects: {
    *xuLy({ payload }, { call, put }) {},
  },

  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
