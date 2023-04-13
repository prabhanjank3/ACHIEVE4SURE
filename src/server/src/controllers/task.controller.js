const db = require('../models/index');
const Task = db.tasks;
const Op = db.Sequelize.Op;
var shortid = require('shortid');
// Create new task
exports.createTask = (req, resp) => {
    req.body['id'] = 'TA'+Math.floor(Math.random()*100000);
    Task.create(req.body)
    .then(data => {
        resp.status(201).send(data);
    })
    .catch(err => {
        console.log(err.errors)
        resp.status(500).send(err);
    });
}

// Update task by id
exports.updateTaskByID = (req, resp) => {
    console.log(req.body)
    if(req.body.hasOwnProperty('task_state') && req.body['task_state'] == "2")
    {
        req.body['task_inProgressDate'] = new Date();
    }
    else if(req.body.hasOwnProperty('task_state') && req.body['task_state'] == "3")
    {
        req.body['task_completedDate'] = new Date();
    }
    Task.update(req.body, {where:{id: req.query.id}})
    .then(()=> { 
        resp.status(200).send({
            message: "Task updated Successfully"
        })
        }).catch(err=> {
            console.log(err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while updating task."
                });
        })
}

// Delete task by id
exports.deleteTaskByID = (req, resp) => {
    Task.destroy({where:{id:req.query.id}})
    .then(result => {
        if(result === 1){
            resp.status(200).send({
                message: "Task deleted Successfully"
            })
        }else{
            resp.status(500).send({
                message:
                    "Some error occurred while deleting task."
                });
        }
    })
    .catch(err=> {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting batch."
            });
    })
}

// Get Single task by id
exports.getSingleTaskById = (req, resp) => {
    Task.findOne({where:{id:req.params.id}})
    .then(data => {
        resp.status(201).send(data);
    })
    .catch(err => {
        resp.status(500).send({
        message:
            err.message || "Some error occurred while creating the Task."
        });
    });
}


// Get tasks in duration with filter
exports.getTasksInDuration = (req, resp) => {
    const {to, from, ...filterCriteria} = req.query;
    const condition =(to && from)? {
        task_startdate:{
            [Op.lte]:req.query.to
        },
        task_closedate:{
            [Op.gte]: req.query.from
        },
        ...filterCriteria
    }:filterCriteria;
    Task.findAll({where:condition})
    .then(result => {
        resp.status(200).send(result);
    })
    .catch(err=> {
        resp.status(500).send({
            message:
                 "Some error occurred while finding tasks."
            });
    })
}
