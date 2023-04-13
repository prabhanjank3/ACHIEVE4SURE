const db = require('../models/index');
const Task = db.tasks;
const Attendence = db.attenndence;
const Op = db.Sequelize.Op;

const getDiffInDays = (d1,d2) => {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10); 
    return diffDays+1;
} 
exports.getAttendencePercentage = (req, resp) => 
{
    Task.findAll({attributes:['task_inProgressDate', 'task_closedate'],where:{id:req.params.taskid},
        include:[
            {
                model: Attendence,
                attributes:['id'],
                where:{isCompleted:true},
                required:true
            }
        ]}
        )
    .then(data => {
        let res = {
         totalDays : (data.length)?getDiffInDays(data[0].task_inProgressDate,(data[0].task_closedate < new Date())?data[0].task_closedate:new Date()):1,
         completedDays : (data.length)?data[0].attendences.length:0
        }
        resp.status(201).send(res);
    })
    .catch(err => {
        resp.status(500).send({
        message:
            err.message || "Some error occurred while fetching data."
        });
    });
}