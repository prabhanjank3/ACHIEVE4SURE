//#### Imports ####
const router = require("express").Router();
const { createTask, updateTaskByID, deleteTaskByID,getSingleTaskById, getTasksInDuration} = require('../controllers/task.controller');

router.get('', getTasksInDuration);
router.get('/:id', getSingleTaskById);
router.post('/create', createTask);
router.patch('/update', updateTaskByID);
router.delete('/delete',deleteTaskByID);


module.exports = router;