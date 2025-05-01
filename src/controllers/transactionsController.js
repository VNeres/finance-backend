const db = require('../database');

exports.getAllTransactions = (req, res) => {
  const transactions = db.prepare('SELECT * FROM transactions').all();

  const normalized = transactions.map(t => ({
    ...t,
    isCreditCard: !!t.isCreditCard,
  }));

  res.json(normalized);
};

exports.createTransaction = (req, res) => {
  const { title, amount, type, category, date, isCreditCard } = req.body;

  const stmt = db.prepare(`
    INSERT INTO transactions (title, amount, type, category, date, isCreditCard)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(title, amount, type, category, date, isCreditCard ? 1 : 0);

  const newTransaction = {
    id: info.lastInsertRowid,
    title,
    amount,
    type,
    category,
    date,
    isCreditCard: !!isCreditCard,
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