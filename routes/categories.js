const router = require('express').Router();
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

// Get all categories
router.get('/', verifyToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a new category
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const category = new Category({ name, parentId });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a category
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name, parentId }, { new: true });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a category
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
    