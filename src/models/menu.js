import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Authorized from '@/utils/Authorized';
import { getId } from '@/services/user';
import { router } from 'umi';
import { getAuthority } from '@/utils/authority';
import { menu } from '../defaultSettings';

const { check } = Authorized;

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      // let locale = 'menu';
      // if (parentName) {
      //   locale = `${parentName}.${item.name}`;
      // } else {
      //   locale = `menu.${item.name}`;
      // }
      const locale = item.name;
      // if enableMenuLocale use item.name,
      // close menu international
      // const name = menu.disableLocal ? item.name : formatMessage({ id: item.name });
      const { name } = item;
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

const clearAuThority = authority => {
  const authorityTemp = [];
  authority.map(item => {
    if (item !== 'phongban') {
      authorityTemp.push(item);
    }
  });
  return authorityTemp;
};

const getRouter = (routes, chucNangChoPhep) =>
  routes.map(item => {
    if (item.path === '/trangchu') return item;
    // Xóa authority 'phongban' còn đọng lại trước khi xử lý
    if (item.authority) {
      item.authority = clearAuThority(item.authority);
    }
    // Check xem maChucNang có trong chucNangChoPhep hay không
    const indexCheck = chucNangChoPhep.indexOf(item.maChucNang);
    // Nếu có thì trả xét cả phần sub menu và trả về với authority có thêm 'phongban'
    // Nếu không thì giữ nguyên
    if (indexCheck >= 0) {
      if (item.routes && item.routes.length > 0) {
        item.routes = getRouter(item.routes, chucNangChoPhep);
      }
      if (item.authority) {
        return {
          ...item,
          authority: [...item.authority, 'phongban'],
        };
      }
      return item;
    }
    return item;
  });

const initialState = {
  menuData: [],
  routerData: [],
  breadcrumbNameMap: {},
};
export default {
  namespace: 'menu',

  state: initialState,

  effects: {
    *getMenuData({ payload }, { call, put }) {
      const { authority } = payload;
      let { routes } = payload;
      if (getAuthority()[0] === 'phongban') {
        const response = yield call(getId);
        const {
          data: { chucNangChoPhep },
        } = response.data;
        routes = getRouter(routes, chucNangChoPhep);
      }
      const originalMenuData = memoizeOneFormatter(routes, authority);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routerData: routes },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
