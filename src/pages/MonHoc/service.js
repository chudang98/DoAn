import Service from '@/services/BaseService';
import axios from 'axios';


class ExtendedService extends Service {
    get = async payload => axios.get(`/api/monhoc`, { params: payload });
}

export default new ExtendedService({ name: 'monhoc', formData: false, url:'monhoc' });
