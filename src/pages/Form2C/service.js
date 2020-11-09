import Service from '@/services/BaseService';
import axios from 'axios';
import { ip } from '@/services/ip';

class Form2CService extends Service {
  getTinhThanh = async payload => axios.get(`${ip}/don-vi-hanh-chinh/tinh`);
  getHuyen = async payload => axios.get(`${ip}/don-vi-hanh-chinh/quan-huyen/${payload}`);
  getXa = async payload => axios.get(`${ip}/don-vi-hanh-chinh/xa-phuong/ma-quan-huyen/${payload}`);
  getDanToc = async payload => axios.get(`${ip}/dan-toc-ton-giao/dan-toc`);
  getTonGiao = async payload => axios.get(`${ip}/dan-toc-ton-giao/ton-giao`);
}

export default new Form2CService({ name: 'form2c' });
