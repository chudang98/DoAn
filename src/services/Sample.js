import _ from 'lodash';
import axios from '@/utils/axios.js';
import { ip3 } from './ip';
import Service from './BaseService';

class DonViService extends Service {}

export default new DonViService({ name: 'hocsinh', formData: true });
