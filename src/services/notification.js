import _ from 'lodash';
import axios from '@/utils/axios.js';
import { ip as ip3 } from './ip';
import Service from './BaseService';

class ExtendedService extends Service {
  send = async payload => {
    let { url, ...rest } = payload;
    url = `${ip3}/${this.url}/${url}`;
    console.log(url, 'url send');
    return axios.post(url, rest);
  };

  getById = async payload => {
    const { _id, page, limit } = payload;
    return axios.get(`${ip3}/notifications/${_id}`, { params: { page, limit } });
  }

  del = async payload => {
    const { _id } = payload;
    payload._id = undefined;
    return axios.delete(`${ip3}/${this.url}/${_id}`, { data: payload });
  }

  get = async payload => axios.get(`${ip3}/${this.url}/`, { params: payload })

  add = async payload => {
    if (this.formData) {
      const form = new FormData();
      Object.keys(payload).map(key => {
        if (isValue(payload[key])) form.set(key, trim(payload[key]));
      });
      return axios.post(`${ip3}/${this.url}/`, form);
    }
    Object.keys(payload).map(key => {
      if (isValue(payload[key])) payload[key] = trim(payload[key]);
    });
    return axios.post(`${ip3}/${this.url}/`, payload);
  }

  upd = async payload => {
    if (this.formData) {
      const form = new FormData();
      const { _id } = payload;
      payload._id = undefined;
      Object.keys(payload).map(key => {
        if (isValue(payload[key])) form.set(key, trim(payload[key]));
      });
      return axios.put(`${ip3}/${this.url}/${_id}`, form);
    }
    const { _id } = payload;
    payload._id = undefined;
    Object.keys(payload).map(key => {
      if (isValue(payload[key])) payload[key] = trim(payload[key]);
    });
    return axios.put(`${ip3}/${this.url}/${_id}`, payload);
  }
}

export default new ExtendedService({ name: 'notification', formData: false, url: 'notifications' });
