//#### Imports ####
const router = require("express").Router();
const {createGoal,deleteGoalByID,getGoalsInDuration,getSingleGoalById,updateGoalByID} = require('../controllers/goal.controller');

router.get('', getGoalsInDuration);
router.get('/:id', getSingleGoalById);
router.post('/create', createGoal);
router.patch('/update', updateGoalByID);
router.delete('/delete',deleteGoalByID);

module.exports = router;