const router = require("express").Router();
const {getAttendencePercentage} = require('../../controllers/task.analytics.controller');
const {getRegularTaskCompletionReport} = require('../../controllers/overalll.analytics.controller')
router.get('/attpercent/:taskid', getAttendencePercentage);
router.get('/taskcompletionreport', getRegularTaskCompletionReport)
module.exports = router;