import axios from '@/utils/axios.js';
import { ip, ip3 } from './ip';
import { isValue, trim } from '@/utils/utils';

export async function login({ username, password }) {
  return axios.post(`${ip}/auth/login`, { username, password });
}

export async function logout() {
  return axios.post(`${ip}/auth/logout`);
}

export async function register(payload) {
  const form = new FormData();
  Object.keys(payload).map(key => {
    if (isValue(payload[key])) {
      form.set(key, trim(payload[key]));
    }
  });
  return axios.post(`${ip}/users/register`, form);
}

export async function getId() {
  // get profile
  return axios.get(`${ip3}/users/my/profile`);
}

export async function changePassword({ oldPassword, newPassword }) {
  // get profile
  return axios.post(`${ip3}/users/my/change-password`, { oldPassword, newPassword });
}

export async function forgotPassword(payload) {
  return axios.post(`${ip3}/users/forgot-password`, payload);
}

export async function updateProfile(payload) {
  const form = new FormData();
  Object.keys(payload).map(key => {
    if (isValue(payload[key])) {
      form.set(key, trim(payload[key]));
    }
  });
  return axios.put(`${ip3}/users/my/profile`, form);
}
