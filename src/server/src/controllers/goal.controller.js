const db = require('../models/index');
const Goal = db.goals;
const Op = db.Sequelize.Op;
var shortid = require('shortid');
// Create new Goal
exports.createGoal = (req, resp) => {
    req.body['id'] = 'GO-'+Math.floor(Math.random()*100000);
    Goal.create(req.body)
    .then(data => {
        resp.status(201).send(data);
    })
    .catch(err => {
        console.log(err)
        resp.status(500).send({
        message:
            err.message || "Some error occurred while creating the Goal."
        });
    });
}

// Update Goal by id
exports.updateGoalByID = (req, resp) => {
    Goal.update(req.body, {where:{id: req.query.id}})
    .then(()=> { 
        resp.status(200).send({
            message: "Goal updated Successfully"
        })
        }).catch(err=> {
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while updating Goal."
                });
        })
}

// Delete Goal by id
exports.deleteGoalByID = (req, resp) => {
    console.log(req.query.id)
    Goal.destroy({where:{id:req.query.id}})
    .then(result => {
        if(result === 1){
            resp.status(200).send({
                message: "Goal deleted Successfully"
            })
        }else{
            resp.status(500).send({
                message:
                    "Some error occurred while deleting Goal."
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

// Get Single Goal by id
exports.getSingleGoalById = (req, resp) => {
    Goal.findOne({where:{id:req.params.id}})
    .then(data => {
        resp.status(201).send(data);
    })
    .catch(err => {
        resp.status(500).send({
        message:
            err.message || "Some error occurred while creating the Goal."
        });
    });
}


// Get Goals in duration with filter
exports.getGoalsInDuration = (req, resp) => {
    const {to, from, ...filterCriteria} = req.query;
    const condition =(to && from)? {
        Goal_startdate:{
            [Op.lte]:req.query.to
        },
        Goal_closedate:{
            [Op.gte]: req.query.from
        },
        ...filterCriteria
    }:filterCriteria;
    Goal.findAll({where:condition})
    .then(result => {
        resp.status(200).send(result);
    })
    .catch(err=> {
        resp.status(500).send({
            message:
                 "Some error occurred while finding Goals."
            });
    })
}


