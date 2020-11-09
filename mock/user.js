export default {
  // login
  'POST /api/user/login/': (req, res) => {
    const { username, password } = req.body;
    const data = {
      user: {
        username: 'huy',
        hoTen: 'QuangHuy',
        vaiTro: 3,
        _id: '123456'
      },
      token: 'abac',
    };
    if (username === 'admin' && password === 'admin') res.status(200).send({
      data
    });
    else res.status(500).send({
      message: 'User not found'
    })
  },
  // get by id
  'GET /api/user/:id': (req, res) => {
    const { id } = req.params;
    const data = {
      user: {
        username: 'huy',
        hoTen: 'QuangHuy',
        vaiTro: 3,
        _id: '123456'
      },
      token: 'abac',
    };
    res.status(200).send({
      data
    });
  },
  'POST /user/login': (req, res) => {
    res.send({
      authenticated: true,
      time: '2020-01-06T02:44:07.278Z',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhZmMzNmE0YzU5ODAwM2VmNjljYjMiLCJ0b2tlbiI6eyJvbmVTaWduYWwiOiIiLCJsYXN0TG9naW4iOjE1NzgyNzg2NDcyNzR9LCJpYXQiOjE1NzgyNzg2NDd9.4XsH7L204EBtSj62aaMiLfjtp8HYjsNcM0itrW-4l0o',
      user: {
        token: { lastLogin: 1578278647274 },
        _id: '5e0afc36a4c598003ef69cb3',
        vaiTro: 2,
        hoTen: 'Admin',
        lop: '2019_7A08',
        quanHe: 3,
        nguoiLienLac: true,
        ngaySinh: '2019-12-31T07:43:36.615Z',
        gioiTinh: 0,
        soCMTCCCD: '',
        email: '',
        soDienThoai: '',
        diaChiHienNay: '',
        idHocSinh: '5e083f93eae7501642c7f69e',
        username: 'tuandat98',
        createdAt: '2019-12-31T07:43:50.611Z',
        updatedAt: '2020-01-06T02:44:07.275Z',
        __v: 0,
      },
    });
  },

  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
