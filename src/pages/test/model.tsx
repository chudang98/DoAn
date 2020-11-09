import base from '@/utils/base';
import modelExtend from 'dva-model-extend';
import Services from './service';

export default modelExtend(base(Services), {
    namespace: 'test',
})
