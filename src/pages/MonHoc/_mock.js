import _ from 'lodash';
import uuidv1 from 'uuid/v1';

let data = [
  {
    tenMon: 'Lap Trinh Hương Doi Tương',
    maMon:'B17DCAT005',
    _id: 'abc',
  },
  {
    tenMon: 'Toan Cao Cap',
    maMon:'B17DCAT001',
    _id: 'abcd',
  },
  {
    tenMon: 'Toan Hoc Co So',
    maMon:'B17DCAT002',
    _id: 'abcde',
  },
  {
    tenMon: 'Lap Trinh Nang Cao',
    maMon:'B17DCAT003',
    _id: 'abcvca',
  },
]

export default {
  // GET
  'GET /api/monhoc': (req, res) => {
    res.status(200).send({
      data: _.reverse(_.clone(data)),
      total: data.length,
    });
  },
  'DELETE /api/monhoc/:_id': (req, res) => {
    const { _id } = req.params;
    data = data.filter(item => item._id !== _id);
    res.status(200).send({
      message: 'OK',
    });
  },
  'POST /api/monhoc': (req, res) => {
    data.push({
      ...req.body,
      _id: uuidv1(),
    })
    res.status(200).send({
      message: 'OK',
    });
  },
  'PUT /api/monhoc/:_id': (req, res) => {
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