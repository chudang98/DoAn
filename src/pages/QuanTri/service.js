import Service from '@/services/BaseService';
import axios from 'axios';
import { isValue, trim } from '@/utils/utils';

class ExtendedService extends Service {
    get = async payload => axios.get(`/api/quantri`, { params: payload });

    getTreeRecord =  async payload => axios.get(`https://ftudev.aisenote.com/sotay/cocautochuc`, { params: payload });

    getSpecifitedUni = async payload => axios.get(`https://ftudev.aisenote.com/sotay/cocautochuc/${payload.id}`, { params: payload });

    add = async payload => {
        Object.keys(payload).map(key => {
          if (isValue(payload[key])) payload[key] = trim(payload[key]);
        });
        console.log("day la pay load");
        console.log(payload);
        return axios.post('https://ftudev.aisenote.com/sotay/cocautochuc',payload);
      };

    upd = async payload => {
      const { _id } = payload;
      payload._id = undefined;
      Object.keys(payload).map(key => {
        if (isValue(payload[key])) payload[key] = trim(payload[key]);
      });
      return axios.put(`/api/quantri/${_id}`, payload);
    };

    del = async payload => {
    const { _id } = payload;
    payload._id = undefined;
    return axios.delete(`/api/quantri/${_id}`, { data: payload });
  };
}

export default new ExtendedService({ name: 'quantri', formData: false, url:'quantri' });
