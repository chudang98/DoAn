import PropTypes from 'prop-types';
import axios from '@/utils/axios.js';
import { ip3, ip } from './ip';
import { isValue, trim } from '../utils/utils';

class Services {
  constructor({ name, formData, url }) {
    this.name = name;
    this.formData = formData;
    this.url = url || name;
  }

  del = async payload => {
    const { _id } = payload;
    payload._id = undefined;
    return axios.delete(`${ip3}/${this.url}/${_id}`, { data: payload });
  };

  get = async payload =>
  {
    debugger
    axios.get(`${ip3}/${this.url}/`, { params: payload });
  } 

  add = async payload => {
    if (this.formData) {
      const form = new FormData();
      Object.keys(payload).map(key => {
        if (isValue(payload[key])) {
          if (Array.isArray(payload[key])) {
            for (let i = 0; i < payload[key].length; i += 1) {
              form.append(key, payload[key][i]);
            }
            return;
          }
          form.set(key, trim(payload[key]));
        }
      });
      return axios.post(`${ip3}/${this.url}/`, form);
    }
    Object.keys(payload).map(key => {
      if (isValue(payload[key])) payload[key] = trim(payload[key]);
    });
    return axios.post(`${ip3}/${this.url}/`, payload);
  };

  upd = async payload => {
    if (this.formData) {
      const form = new FormData();
      const { _id } = payload;
      payload._id = undefined;
      Object.keys(payload).map(key => {
        if (isValue(payload[key])) {
          if (Array.isArray(payload[key])) {
            for (let i = 0; i < payload[key].length; i += 1) {
              form.append(key, payload[key][i]);
            }
            return;
          }
          form.set(key, trim(payload[key]));
        }
      });
      return axios.put(`${ip3}/${this.url}/${_id}`, form);
    }
    const { _id } = payload;
    payload._id = undefined;
    Object.keys(payload).map(key => {
      if (isValue(payload[key])) payload[key] = trim(payload[key]);
    });
    return axios.put(`${ip3}/${this.url}/${_id}`, payload);
  };
}

export async function uploadFile(file) {
  const form = new FormData();
  form.append('uploadAnh', file);
  return axios.post(`${ip}/upload-anh/`, form);
}

export default Services;
