import _ from 'lodash';
import uuidv1 from 'uuid/v1';

let data = [
  {
    email: 'User1@gmail.com',
    _id: 'abc',
  },
  {
    email: 'User2@gmail.com',
    _id: 'abcd',
  },
  {
    email: 'User3@gmail.com',
    _id: 'abcde',
  },
  {
    email: 'User4@gmail.com',
    _id: 'abcvca',
  },
];

export default {
  // GET
  'GET /api/forgot-passwork': (req, res) => {
    res.status(200).send({
      data: _.reverse(_.clone(data)),
      total: data.length,
    });
  },
  'DELETE /api/forgot-passwork/:_id': (req, res) => {
    const { _id } = req.params;
    data = data.filter(item => item._id !== _id);
    res.status(200).send({
      message: 'OK',
    });
  },
  'POST /api/forgot-passwork': (req, res) => {
    data.push({
      ...req.body,
      _id: uuidv1(),
    });
    res.status(200).send({
      message: 'OK',
    });
  },
  'PUT /api/forgot-passwork/:_id': (req, res) => {
    const { _id } = req.params;
    data = data.map(item => {
      if (item._id !== _id) {
        return item;
      }
      return {
        ...item,
        ...req.body,
      };
    });
    res.status(200).send({
      message: 'OK',
    });
  },
};
