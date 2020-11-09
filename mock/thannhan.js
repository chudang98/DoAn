export default {
  'GET /thannhan': (req, res) => {
    res.status(200).send({
      status: true,
      data: [
        {
          _id: '1',
          hoTen: 'Ngô Bá Khá',
          gioiTinh: 0,
          nguyenQuan: 'Văn Giang, Hưng Yên',
          hoKhauThuongTru: 'Bảo Lộc',
        },
        {
          _id: '2',
          hoTen: 'Đào Quốc Đạt',
          gioiTinh: 0,
          nguyenQuan: 'Văn Giang, Hưng Yên',
          hoKhauThuongTru: 'Bảo Lộc',
        },
      ],
    });
  },
};
