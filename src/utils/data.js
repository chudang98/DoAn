const data = {
  trangThai: ['Đang làm việc', 'Chuyển trường', 'Nghỉ hưu'],
  loaiDonVi: ['Phòng ban', 'Khoa/Bộ môn'],
  quanHe: ['Bố', 'Mẹ', 'Người đỡ đầu'],
  gioiTinh: ['Nam', 'Nữ'],
  inactive: ['Đã kích hoạt', 'Chưa kích hoạt'],
  dangTai: ['Không đăng tải', 'Đăng tải'],
  loaiCauHoi: ['Chọn một đáp án', 'Chọn nhiều đáp án'],
  vaiTro: ['Sinh viên', 'Giáo viên', 'Phụ huynh', 'Admin', '', 'Phòng ban'],
  role: [['student'], ['teacher'], [], ['admin'], [], ['phongban'], ['phongdaotao']],
  // path: ['/khaibao', '/TrangChu', '/dashboard', '/dashboard'],
  daDoc: ['Chưa đọc', 'Đã đọc'],
  validated: ['Chưa kích hoạt', 'Đã kích hoạt'],
  trangThaiSucKhoe: ['Sốt', 'Ho', 'Khó Thở', 'Dấu hiệu khác'],
  tiepXuc: [
    'Có tiếp xúc với trường hợp bệnh hoặc nghi ngờ mắc bệnh COVID-19',
    'Có đi từ vùng dịch COVID-19',
    'Có tiếp xúc với các trường hợp đi từ vùng dịch COVID-19',
  ],
  hinhThucCachLy: ['Tại nhà', 'Tập trung'],
  sot: ['Có', 'Không'],
  loaiBangDiem: ['Toàn khóa', 'Năm học', 'Kỳ học'],
  trangThaiCachLy: ['Không bị cách ly', 'Đang bị cách ly', 'Đã kết thúc cách ly'],
  version: 'v1.0',
};

export const dataObj = {
  trangThai: {
    CHUA_TIEP_NHAN: 'Chưa tiếp nhận',
    DA_TIEP_NHAN: 'Đã tiếp nhận',
    DA_XU_LY: 'Đã xử lý',
    KHONG_XU_LY: 'Không xử lý',
  },
};

export default data;

export const chucNangQuanTri = {
  THONG_TIN_KY_HOC_SINH_VIEN: {
    APISuDung: [],
    ten: 'Danh sach thong tin sinh vien theo ky hoc',
    ma: 'THONG_TIN_KY_HOC_SINH_VIEN',
    maChucNangCha: 'THONG_TIN_KY_HOC',
  },
  THONG_TIN_KY_HOC_GIANG_VIEN: {
    APISuDung: [],
    ten: 'Danh sach thong tin giang vien theo ky hoc',
    ma: 'THONG_TIN_KY_HOC_GIANG_VIEN',
    maChucNangCha: 'THONG_TIN_KY_HOC',
  },
  THONG_TIN_KY_HOC: {
    APISuDung: [],
    ten: 'Thong tin ky hoc',
    ma: 'THONG_TIN_KY_HOC',
    maChucNangCha: null,
  },
};
