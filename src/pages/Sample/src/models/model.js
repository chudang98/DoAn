import modelExtend from 'dva-model-extend';
import Services from '@/services/PAGE_NAME_UPPER_CAMEL_CASE';
import base from '@/utils/base';

export default modelExtend(base(Services), {
    namespace: 'PAGE_NAME',
})
