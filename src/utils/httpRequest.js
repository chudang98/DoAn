// import { func } from "prop-types";
import { getToken } from '@/utils/Authorized';
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/prefer-default-export
export async function post(url, json) {
  let formBody = [];
  for (const property in json) {
    if (Object.prototype.hasOwnProperty.call(json, property)) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(json[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
  }
  formBody = formBody.join('&');
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  });
  const result = fetch(myRequest)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      throw new Error(response);
      // return false;
    })
    .then(response => response);
  return result;
}

export async function PostAppJson(url, json) {
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify(json),
  });
  const result = fetch(myRequest)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      throw new Error(response);
      // return 'err';
      // return Promise.reject(new Error('err status != 200'));
    })
    .then(response => response);
  return result;
}
