import data from '@/utils/data';

export function Process(res) {
  // must return: canLogin, state: {token, _id, TenTaiKhoan}
  const {
    user: { hoTen, vaiTro, _id },
    accessToken: token,
  } = res;
  let currentAuthority;
  if (vaiTro === 6) {
    currentAuthority = vaiTro?.tenPhongBan;
  }
  currentAuthority = data.role[vaiTro];

  if (!currentAuthority || !currentAuthority.length) return { canLogin: false };
  return {
    canLogin: true,
    state: {
      TenTaiKhoan: hoTen,
      _id,
      token,
      user: res.user,
      currentAuthority,
    },
  };
}
