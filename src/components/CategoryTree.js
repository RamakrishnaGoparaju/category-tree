import React, { useEffect, useState } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../services/api';

const CategoryTree = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories(token);
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, [token]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const category = { name, parentId: parentId || null };
      const { data } = await addCategory(category, token);
      setCategories([...categories, data]);
      setName('');
      setParentId('');
    } catch (error) {
      console.error('Failed to add category', error);
    }
  };

  const handleUpdateCategory = async (id, updatedName) => {
    try {
      const updatedCategory = await updateCategory(id, { name: updatedName }, token);
      setCategories(categories.map(cat => cat._id === id ? updatedCategory.data : cat));
    } catch (error) {
      console.error('Failed to update category', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id, token);
      setCategories(categories.filter(cat => cat._id !== id));
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };

  const renderTree = (parentId = null) => {
    const filteredCategories = categories.filter(cat => cat.parentId === parentId);
    if (!filteredCategories.length) return null;

    return (
      <ul>
        {filteredCategories.map(cat => (
          <li key={cat._id}>
            {cat.name}
            <button onClick={() => handleUpdateCategory(cat._id, prompt('New name', cat.name))}>Edit</button>
            <button onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
            {renderTree(cat._id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <form onSubmit={handleAddCategory}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" required />
        <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
          <option value="">No Parent</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <button type="submit">Add Category</button>
      </form>
      {renderTree()}
    </div>
  );
};

export default CategoryTree;
