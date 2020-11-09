import _ from 'lodash';
import uuidv1 from 'uuid/v1';

let data = [
  {
    hoTen: 'Lan Anh',
    maSv:'B17DCAT005',
    username:'lakillah',
    password:'123',
    _id: 'abc',
  },
  {
    hoTen: 'Xuan An',
    maSv:'B17DCAT001',
    username:'xuanan',
    password:'456',
    _id: 'abcd',
  },
  {
    hoTen: 'Tuan Anh',
    maSv:'B17DCAT002',
    username:'tuananh',
    password:'123456',
    _id: 'abcde',
  },
  {
    hoTen: 'Xuan Duy',
    maSv:'B17DCAT003',
    username:'xuanduy',
    password:'123987',
    _id: 'abcvca',
  },
]

export default {
  // GET
  'GET /api/example' : (req, res) => {
    res.status(200).send({
      data: _.reverse(_.clone(data)),
      total: data.length,
    });
  },
  'DELETE /api/example/:_id': (req, res) => {
    const { _id } = req.params;
    data = data.filter(item => item._id !== _id);
    res.status(200).send({
      message: 'OK',
    });
  },
  'POST /api/example': (req, res) => {
    data.push({
      ...req.body,
      _id: uuidv1(),
    })
    res.status(200).send({
      message: 'OK',
    });
  },
  'PUT /api/example/:_id': (req, res) => {
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
