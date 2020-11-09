export default {
  'GET /nguoicocong': (req, res) => {
    res.status(200).send({
      status: true,
      data: [
        {
          _id: '1',
          hoTen: 'Nguyễn Đức Nghĩa',
          gioiTinh: 0,
          nguyenQuan: 'Văn Giang, Hưng Yên',
          hoKhauThuongTru: 'Bảo Lộc',
        },
        {
          _id: '2',
          hoTen: 'Nguyễn Đức Nghĩa',
          gioiTinh: 0,
          nguyenQuan: 'Văn Giang, Hưng Yên',
          hoKhauThuongTru: 'Bảo Lộc',
        },
      ],
    });
  },
};
