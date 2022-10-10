const express = require('express');
const router = express.Router();
const { promisePool } = require('../src/db');

router.route('/').get(async (req, res) => {
  const { keyword = '' } = req.query;

  const query = `
  select
    g.*,
    s.name as stateName,
    c.name as cityName
  from
    gym g
    inner join state s on g.stateId = s.id
    inner join city c on g.cityId = c.id and g.stateId = c.stateId
  where
    g.name like ?
  `;

  const [rows] = await promisePool.query(query, [`%${keyword}%`]);

  res.json({ data: rows });
});

module.exports = router;
