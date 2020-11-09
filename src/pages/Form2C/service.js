import Service from '@/services/BaseService';
import axios from 'axios';
import { ip } from '@/services/ip';

class Form2CService extends Service {
  getTinhThanh = async () => axios.get(`${ip}/don-vi-hanh-chinh/tinh`);
  getHuyen = async payload => axios.get(`${ip}/don-vi-hanh-chinh/quan-huyen/maTinh/${payload}`);
  getXa = async payload => axios.get(`${ip}/don-vi-hanh-chinh/xa-phuong/ma-quan-huyen/${payload}`);
  getDanToc = async () => axios.get(`${ip}/dan-toc-ton-giao/dan-toc`);
  getTonGiao = async () => axios.get(`${ip}/dan-toc-ton-giao/ton-giao`);
  getHangThuongBinh = async () => axios.get(`${ip}/nhan-su/danh-muc/hang-thuong-binh`);
  getGiaDinhChinhSach = async () => axios.get(`${ip}/nhan-su/danh-muc/gia-dinh-chinh-sach`);
  getLyLuanChinhTri = async () => axios.get(`${ip}/nhan-su/danh-muc/ly-luan-chinh-tri`);
  getQuanHam = async () => axios.get(`${ip}/nhan-su/danh-muc/quan-ham`);
  getTrinhDoChuyenMon = async () => axios.get(`${ip}/nhan-su/danh-muc/trinh-do-chuyen-mon`);
}

export default new Form2CService({ name: 'form2c' });
