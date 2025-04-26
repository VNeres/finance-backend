const db = require('../db');

const getCategories = (req, res) => {
  const stmt = db.prepare('SELECT * FROM categories');
  const categories = stmt.all();
  res.json(categories);
};

const addCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Nome da categoria é obrigatório' });
  }
  const stmt = db.prepare('INSERT INTO categories (name) VALUES (?)');
  const info = stmt.run(name);
  res.json({ id: info.lastInsertRowid, name });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
  stmt.run(id);
  res.json({ message: 'Categoria excluída com sucesso' });
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
};
