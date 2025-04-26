const db = require('../database');

exports.getAllTransactions = (req, res) => {
  const transactions = db.prepare('SELECT * FROM transactions').all();
  res.json(transactions);
};

exports.createTransaction = (req, res) => {
  const { title, amount, type, category, date } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO transactions (title, amount, type, category, date)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const info = stmt.run(title, amount, type, category, date);

  const newTransaction = {
    id: info.lastInsertRowid,
    title,
    amount,
    type,
    category,
    date
  };

  res.status(201).json(newTransaction);
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
  const info = stmt.run(id);

  if (info.changes > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Transação não encontrada' });
  }
};