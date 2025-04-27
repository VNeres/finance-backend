const db = require('../db');

const GoalModel = {
  getAllGoals: () => {
    const stmt = db.prepare('SELECT * FROM goals');
    return stmt.all(); // <- all() já retorna o array pronto
  },

  addGoal: ({ title, targetAmount, deadline }) => {
    const stmt = db.prepare('INSERT INTO goals (title, targetAmount, currentAmount, deadline) VALUES (?, ?, 0, ?)');
    const info = stmt.run(title, targetAmount, deadline);
    return { id: info.lastInsertRowid }; // <- diferente do sqlite3 normal
  },

  updateGoalProgress: (id, contribution) => {
    const stmt = db.prepare('UPDATE goals SET currentAmount = currentAmount + ? WHERE id = ?');
    stmt.run(contribution, id);
  },

  deleteGoal: (id) => {
    const stmt = db.prepare('DELETE FROM goals WHERE id = ?');
    stmt.run(id);
  },
};

module.exports = GoalModel;
