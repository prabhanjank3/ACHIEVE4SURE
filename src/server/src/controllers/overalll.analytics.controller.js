const db = require('../models/index');
const sequelize = require('sequelize')
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.getRegularTaskCompletionReport = (req, resp) => {
    const completedInTimePromise = Task.findAll({where:{
        task_type:"Regular",
        task_completedDate:{
            [Op.ne]:null
        },
        task_closedate:{
            [Op.gte]:sequelize.col('task_completedDate')
        },
    }})
    const totalTasksCrossedDeadlinePromise = Task.findAll({where:{
        task_type:"Regular",
        
        task_completedDate:{
            [Op.ne]:null
        }
    }})
    Promise.all([completedInTimePromise,totalTasksCrossedDeadlinePromise])
    .then(data => {
        resp.send({
        total:data[1].length,
        completedInTime:data[0].length
    })})
}