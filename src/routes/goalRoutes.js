const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/', goalController.getGoals);
router.post('/', goalController.addGoal);
router.patch('/:id', goalController.updateGoalProgress);
router.delete('/:id', goalController.deleteGoal);

module.exports = router;
