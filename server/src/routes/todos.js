const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ success: true, data: todos, count: todos.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch todos', error: error.message });
  }
});

// POST /api/todos - Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const todo = new Todo({ title: title.trim(), description: description?.trim() || '' });
    const savedTodo = await todo.save();

    res.status(201).json({ success: true, data: savedTodo, message: 'Todo created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Failed to create todo', error: error.message });
  }
});

// PUT /api/todos/:id - Update title and/or description
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: title.trim(), description: description?.trim() || '' },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.json({ success: true, data: todo, message: 'Todo updated successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid todo ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Failed to update todo', error: error.message });
  }
});

// PATCH /api/todos/:id/done - Toggle done status
router.patch('/:id/done', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    todo.done = !todo.done;
    const updatedTodo = await todo.save();

    res.json({ success: true, data: updatedTodo, message: `Todo marked as ${updatedTodo.done ? 'done' : 'undone'}` });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid todo ID' });
    }
    res.status(500).json({ success: false, message: 'Failed to toggle todo status', error: error.message });
  }
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.json({ success: true, message: 'Todo deleted successfully', data: todo });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid todo ID' });
    }
    res.status(500).json({ success: false, message: 'Failed to delete todo', error: error.message });
  }
});

module.exports = router;
