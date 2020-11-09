import _ from 'lodash';
import uuidv1 from 'uuid/v1';

let data = {
    treeRecord: [
      {
        title: "Hội Đồng Học Viện",
        key: '0-0',
        children: [
          {
            title: "Ban Giám Đốc",
            key: '0-0-0',
            children: [
              {
                title: "Đào tạo dài hạn",
                key: '0-0-0-0',
                children: [
                  {
                    title: "Khoa cơ bản",
                    key: '0-0-0-0-0',
                  },
                  {
                    title: "Khoa công nghệ thông tin",
                    key: '0-0-0-0-1',
                  },
                  {
                    title: "Khoa an toàn thông tin",
                    key: '0-0-0-0-2',
                  },
                  {
                    title: "Khoa viễn thông",
                    key: '0-0-0-0-3',
                  },
                  {
                    title: "Khoa điện tử",
                    key: '0-0-0-0-4',
                  },
                  {
                    title: "Khoa đa phương tiện",
                    key: '0-0-0-0-5',
                  },
                  {
                    title: "Khoa quản trị kinh doanh",
                    key: '0-0-0-0-6',
                  },
                  {
                    title: "Khoa kế toán",
                    key: '0-0-0-0-7',
                  },
                  {
                    title: "Khoa Marketing",
                    key: '0-0-0-0-8',
                  },
                  {
                    title: "Khoa điện tử",
                    key: '0-0-0-0-9',
                  }
                ]
              },
              {
                title: "Khối Phòng Ban",
                key: '0-0-0-1',
              },
              {
                title: "Bồi dưỡng ngắn hạn",
                key: '0-0-0-2',
              },
              {
                title: "Khoa học công nghệ",
                key: '0-0-0-3',
              }

            ]
          },
          {
            title: "Đảng ủy, Công Đoàn, Đoàn TN",
            key: '0-0-1',
          },
          {
            title: "Các hội đồng tư vấn",
            key: '0-0-2',
          }
        ]
      }
    ],
    danhSach: [{
      hoTen: "Nguyễn Văn Hoàng",
      chucVu: "Phó Bí thư đảng ủy phụ trách Chủ tịch Hội đồng trường PGS.TS",
      srcImage: "https://source.unsplash.com/random",
      _id: 'abc',
      dob: "28/10/1998",
      queQuan: "Ha Nam",
      diaChi: "Ha Nam",
      sdt: "0971945769", 
      email: "minhtuan2898@gmail.com"
  },
  {
      hoTen: "Nguyễn Văn Hoàng",
      chucVu: "Phó Bí thư đảng ủy phụ trách Chủ tịch Hội đồng trường PGS.TS",
      srcImage: "https://source.unsplash.com/random",
      _id: 'abcd',
      dob: "28/10/1998",
      queQuan: "Ha Nam",
      diaChi: "Ha Nam",
      sdt: "0971945769", 
      email: "minhtuan2898@gmail.com"
  },
  {
      hoTen: "Nguyễn Văn Hoàng",
      chucVu: "Phó Bí thư đảng ủy phụ trách Chủ tịch Hội đồng trường PGS.TS",
      srcImage: "https://source.unsplash.com/random",
      _id: 'abcde',
      dob: "28/10/1998",
      queQuan: "Ha Nam",
      diaChi: "Ha Nam",
      sdt: "0971945769", 
      email: "minhtuan2898@gmail.com"
  },
  {
      hoTen: "Nguyễn Văn Hoàng",
      chucVu: "Phó Bí thư đảng ủy phụ trách Chủ tịch Hội đồng trường PGS.TS",
      srcImage: "https://source.unsplash.com/random",
      _id: 'abcvca',
      dob: "28/10/1998",
      queQuan: "Ha Nam",
      diaChi: "Ha Nam",
      sdt: "0971945769", 
      email: "minhtuan2898@gmail.com"
  }]
};

export default {

    // GET
    'GET /api/quantri/khoacntt' : (req, res) => {
      res.status(200).send({
        danhSach: _.reverse(_.clone(data.danhSach)),
        total: data.danhSach.length,
        showInfor: true
      });
    },
    
    'GET /api/quantri' : (req, res) => {
      res.status(200).send({
        treeRecord: _.reverse(_.clone(data.treeRecord)),
        data: _.reverse(_.clone(data.danhSach)),
        total: data.danhSach.length,
      });
    },
    'DELETE /api/quantri/:_id': (req, res) => {
      const { _id } = req.params;
      data = data.filter(item => item._id !== _id);
      res.status(200).send({
        message: 'OK',
      });
    },
    'POST /api/quantri': (req, res) => {
      data.push({
        ...req.body,
        _id: uuidv1(),
      })
      res.status(200).send({
        message: 'OK',
      });
    },
    'PUT /api/quantri/:_id': (req, res) => {
      const { _id } = req.params;
      data = data.map(item => {
        if (item._id !== _id) { return item; }
        return {
          ...item,
          ...req.body,
        }
      })
      res.status(200).send({
        message: 'OK',
      });
    },
  }
  