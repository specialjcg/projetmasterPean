const express = require('express');
const router = express.Router();

const Product = require('../models/product');

/* GET /api/todos */
router.get('/', async (req, res) => {
  try {
    const list = await Product.find(req.query);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* POST /api/todos */
router.post('/', async (req, res) => {
  try {
    const todo = await Product.create(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT /api/todos/:id */
/* PUT /api/todos */
router.put('/:id', async (req, res) => {
  try {
    const options = { new: true };
    const todo = await Product.findByIdAndUpdate(req.params.id, req.body, options);
    res.json(todo);
  } catch (error) {
    res.json(500, { error });
  }
});


/* DELETE /api/todos/:id */
/* DELETE /api/todos */
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Product.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});


// Beaware: it can delete all data from db if body is empty
/* DELETE /api/todos */
router.delete('/', async (req, res) => {
  try {
    const todo = await Product.deleteMany(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
