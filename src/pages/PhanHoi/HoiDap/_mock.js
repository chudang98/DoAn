import _ from 'lodash';
import uuidv1 from 'uuid/v1';

let data = [
  {
    hoTen: 'User 1',
    _id: 'abc'
  },
  {
    hoTen: 'User 2',
    _id: 'abcd'
  },
  {
    hoTen: 'User 3',
    _id: 'abcde'
  },
  {
    hoTen: 'User 4',
    _id: 'abcvca'
  },
]

export default {
  // GET
  'GET /api/hoidap': (req, res) => {
    res.status(200).send({
      data: _.reverse(_.clone(data)),
      total: data.length,
    });
  },
  'DELETE /api/hoidap/:_id': (req, res) => {
    const { _id } = req.params;
    data = data.filter(item => item._id !== _id);
    res.status(200).send({
      message: 'OK'
    });
  },
  'POST /api/hoidap': (req, res) => {
    data.push({
      ...req.body,
      _id: uuidv1()
    })
    res.status(200).send({
      message: 'OK'
    });
  },
  'PUT /api/hoidap/:_id': (req, res) => {
    const { _id } = req.params;
    data = data.map(item => {
      if (item._id !== _id) { return item; }
      return {
        ...item,
        ...req.body,
      }
    })
    res.status(200).send({
      message: 'OK'
    });
  },
}