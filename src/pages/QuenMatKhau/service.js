import Service from '@/services/BaseService';
import { ip3 } from '@/services/ip';
import axios from '@/utils/axios.js';

class ExtendedService extends Service {
  send = async payload => axios.post(`${ip3}/${this.url}/`, payload);
}

export default new ExtendedService({
  name: 'quenmatkhau',
  formData: false,
  url: 'users/forgot-password',
});
