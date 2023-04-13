//#### Imports ####
const router = require("express").Router();
const {markAttendence, getAttendenceOn, getAttendenceInDuration } = require('../controllers/attendence.controller');

router.get('/on', getAttendenceOn);
router.put('/', markAttendence);
router.get('/duration', getAttendenceInDuration);


module.exports = router;