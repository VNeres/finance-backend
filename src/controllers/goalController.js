const GoalModel = require('../models/goalModel');

const GoalController = {
  getGoals: async (req, res) => {
    try {
      const goals = await GoalModel.getAllGoals();
      res.json(goals);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar metas' });
    }
  },

  addGoal: async (req, res) => {
    try {
      const { title, targetAmount, deadline } = req.body;
      if (!title || !targetAmount) {
        return res.status(400).json({ error: 'Título e valor alvo são obrigatórios' });
      }
      const result = await GoalModel.addGoal({ title, targetAmount, deadline });
      res.status(201).json({ id: result.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar meta' });
    }
  },

  updateGoalProgress: async (req, res) => {
    try {
      const { id } = req.params;
      const { contribution } = req.body;
      if (!contribution) {
        return res.status(400).json({ error: 'Contribuição obrigatória' });
      }
      await GoalModel.updateGoalProgress(id, contribution);
      res.status(200).json({ message: 'Progresso atualizado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar progresso da meta' });
    }
  },

  deleteGoal: async (req, res) => {
    try {
      const { id } = req.params;
      await GoalModel.deleteGoal(id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar meta' });
    }
  },
};

module.exports = GoalController;
