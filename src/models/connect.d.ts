export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    vaitroquantri: boolean;
    modul: boolean;
    phanquyen: boolean;
    login: boolean;
    chucnangquantri: boolean;
    khaosatgvsv: boolean;
    xemtintuc: boolean;
  };
}

export interface ConnectState {
  vaitroquantri: IVaiTroQuanTriModelState;
  modul: IModulModelState;
  phanquyen: IPhanQuyenModelState;
  loading: Loading;
  login: ILoginModelState;
  chucnangquantri: IChucNangQuanTriModelState;
  khaosatgvsv: IKhaoSatModelState;
  xemtintuc: IXemTinTucModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
