import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await todoService.getAll();
      setTodos(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create — optimistic insert
  const createTodo = useCallback(async (data) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic = { _id: tempId, ...data, done: false, createdAt: new Date().toISOString() };

    setTodos((prev) => [optimistic, ...prev]);
    try {
      const res = await todoService.create(data);
      setTodos((prev) => prev.map((t) => (t._id === tempId ? res.data : t)));
      return { success: true };
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t._id !== tempId));
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Update — optimistic replace
  const updateTodo = useCallback(async (id, data) => {
    const prev = todos.find((t) => t._id === id);
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, ...data } : t)));
    try {
      const res = await todoService.update(id, data);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      return { success: true };
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === id ? prev : t)));
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [todos]);

  // Toggle done — optimistic flip
  const toggleDone = useCallback(async (id) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
    );
    try {
      const res = await todoService.toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
      );
      setError(err.message);
    }
  }, []);

  // Delete — optimistic remove
  const deleteTodo = useCallback(async (id) => {
    const backup = todos.find((t) => t._id === id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await todoService.delete(id);
    } catch (err) {
      if (backup) setTodos((prev) => [backup, ...prev]);
      setError(err.message);
    }
  }, [todos]);

  const pendingCount = todos.filter((t) => !t.done).length;
  const doneCount = todos.filter((t) => t.done).length;

  return {
    todos,
    loading,
    error,
    clearError,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleDone,
    deleteTodo,
    pendingCount,
    doneCount,
  };
}
