import Service from '@/services/BaseService';
import axios from 'axios';
import { ip } from '@/services/ip';

class Form2CService extends Service {
  getTinhThanh = async () => axios.get(`${ip}/don-vi-hanh-chinh/tinh`);
  getHuyen = async payload => axios.get(`${ip}/don-vi-hanh-chinh/quan-huyen/maTinh/${payload}`);
  getXa = async payload => axios.get(`${ip}/don-vi-hanh-chinh/xa-phuong/ma-quan-huyen/${payload}`);
  getDanToc = async () => axios.get(`${ip}/dan-toc-ton-giao/dan-toc`);
  getTonGiao = async () => axios.get(`${ip}/dan-toc-ton-giao/ton-giao`);
}

export default new Form2CService({ name: 'form2c' });
