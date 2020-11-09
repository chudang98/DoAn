export default [
  {
    path: '/quenmatkhau',
    component: './QuenMatKhau',
  },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './User/Login',
        hideInMenu: true,
      },
      {
        path: '/user/register',
        name: 'register',
        component: './User/Register',
        hideInMenu: true,
      },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/slink/admin/Example',
      },
      {
        name: 'S-LINK',
        path: '/slink',
        icon: 'cluster',
        authority: ['admin', 'teacher', 'student'],
        routes: [
          {
            path: '/slink/admin/Example',
            name: 'Example',
            icon: 'question',
            authority: ['admin'],
            maChucNang: 'PHAN_HOI',
            component: './Example',
          },
          // {
          //   path: '/slink/admin/RandomUser',
          //   name: 'RandomUser',
          //   icon: 'question',
          //   authority: ['admin'],
          //   // maChucNang: 'PHAN_HOI',
          //   component: './RandomUser',
          // },
          // {
          //   path: '/slink/admin/MonHoc',
          //   name: "MonHoc",
          //   icon: 'question',
          //   authority: ['admin'],
          //   // maChucNang: 'PHAN_HOI',
          //   component: './MonHoc',
          // },
          {
            path: '/slink/admin/QuanTri',
            name: 'QuanTri',
            icon: 'question',
            authority: ['admin'],
            // maChucNang: 'PHAN_HOI',
            component: './QuanTri',
          },
          {
            path: '/slink/admin/ThongTin',
            name: 'Thong Tin',
            icon: 'question',
            authority: ['admin'],
            // maChucNang: 'PHAN_HOI',
            component: './ThongTin',
            hideInMenu: true,
          },
          {
            path: '/slink/admin/ChucVu',
            name: 'ChucVu',
            icon: 'question',
            authority: ['admin'],

            component: './ChucVu',
          },
          {
            path: './admin/Form2C',
            name: 'Form2C',
            icon: 'question',
            authority: ['admin'],
            maChucNang: 'FORM2C',
            component: './Form2C',
          },
        ],
      },
      {
        hideInMenu: true,
        name: 'user',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'profile',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/editProfile',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
              {
                path: '/account/center/changePassword',
                component: './Account/Center/ChangePassword',
              },
              {
                path: '/account/center/editProfile',
                component: './Account/Center/EditProfile',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'setting',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
