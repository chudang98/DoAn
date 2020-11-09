import Service from '@/services/BaseService';
import axios from '@/utils/axios.js';

class ExtendedService extends Service {
  getUser = async payload => axios.get('https://randomuser.me/api/', payload);
  
}

export default new ExtendedService({
  name: 'randomuser',
  formData: false,
//   url: 'users/forgot-password',
});
