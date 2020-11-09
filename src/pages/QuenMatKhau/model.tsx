import base from '@/utils/base';
import modelExtend from 'dva-model-extend';
import Services from '@/pages/QuenMatKhau/service';
import notificationAlert from '@/components/Notification';
import { formatMessage } from 'umi/locale';
export default modelExtend(base(Services), {
  namespace: 'quenmatkhau',
  effects: {
    *send({ payload }, { call, put }) {
      yield call(Services.send, payload);
      notificationAlert('success', formatMessage({ id: 'GUI_THANH_CONG' }));
    },
  },
});
