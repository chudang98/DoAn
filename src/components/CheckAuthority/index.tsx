import React, { ReactNode } from 'react';
import { getAuthority } from '@/utils/authority';

interface Props {
  maChucNang: string;
  children: ReactNode;
}

export const checkAllow = (maChucNang: string) => {
  const authority = getAuthority();
  if (authority[0] !== 'phongban') return true;
  const chucNangChoPhep = localStorage.getItem('chucNangChoPhep');
  if (!chucNangChoPhep || chucNangChoPhep.length === 0) return false;
  const indexExist = chucNangChoPhep.indexOf(maChucNang);
  if (indexExist >= 0) return true;
  return false;
};

const CheckAuthority: React.FC<Props> = ({ maChucNang, children }) => {
  const allow = checkAllow(maChucNang);
  return allow ? <div>{children}</div> : <></>;
};

export default CheckAuthority;
