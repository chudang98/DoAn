import Service from '@/services/BaseService';
import axios from 'axios';
import { isValue, trim } from '@/utils/utils';

class ExtendedService extends Service {
  get = async payload => axios.get(`/api/example`, { params: payload });

  add = async payload => {
    Object.keys(payload).map(key => {
      if (isValue(payload[key])) payload[key] = trim(payload[key]);
    });
    return axios.post('https://ftudev.aisenote.com/chuc-vu', payload);
  };

  upd = async payload => {
    const { _id } = payload;
    payload._id = undefined;
    Object.keys(payload).map(key => {
      if (isValue(payload[key])) payload[key] = trim(payload[key]);
    });
    return axios.put(`/api/example/${_id}`, payload);
  };

  del = async payload => {
    const { _id } = payload;
    payload._id = undefined;
    return axios.delete(`/api/example/${_id}`, { data: payload });
  };
}

export default new ExtendedService({ name: 'example', formData: false, url: 'example' });
