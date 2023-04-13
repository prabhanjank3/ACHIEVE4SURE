const router = require("express").Router();
const {getDashboardData, getDashboardDailyData}  = require('../controllers/dashboard.controller');

router.get('',getDashboardData);
router.get('/daily',getDashboardDailyData)
module.exports=router;