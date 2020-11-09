import base from '@/utils/base';
import modelExtend from 'dva-model-extend';
import Services from '@/pages/MonHoc/service';

export default modelExtend(base(Services), {
    namespace: 'monhoc',
})
