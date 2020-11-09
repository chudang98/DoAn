const fakeNotices = [
];

const getNotices = (req, res) => {
  if (req.query && req.query.type) {
    const startFrom = parseInt(req.query.lastItemId, 10) + 1;
    const result = fakeNotices
      .filter(({ type }) => type === req.query.type)
      .map((notice, index) => ({
        ...notice,
        id: `0000000${startFrom + index}`,
      }));
    return res.json(startFrom > 24 ? result.concat(null) : result);
  }
  return res.json(fakeNotices);
};

export default {
  'GET /api/notices': getNotices,
};
