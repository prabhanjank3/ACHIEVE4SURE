const db = require('../models/index');
const Attendence = db.attenndence;
const Task = db.tasks
const Op = db.Sequelize.Op;
var shortid = require('shortid');

// Mark new attendence
exports.markAttendence = (req, resp) => {
    if(!('id' in req.body))
    {
        req.body['id'] = 'AT-'+shortid.generate();
    }
    Attendence.upsert(req.body,{raw:true})
    .then((res) => {
            resp.status(201).send({message:'Saved Successfully!'});
    })
    .catch(err => {
        resp.status(500).send({
        message:
            err.message || "Some error occurred while marking."
        });
    });
}

// Get today's attendence Records
exports.getAttendenceOn = (req, resp) => {
    Attendence.findAll({where:{date:req.query.date}})
    .then((result) => {
        resp.status(201).send(result);
    })
    .catch(err => {
        resp.status(500).send({
        message:
            err.message || "Some error occurred while marking."
        });
    });
}
const getDurationCondition = (itemName, from, to) => {
    return {
        [itemName+'_startdate']:{
            [Op.lte]:to
        },
        [itemName+'_closedate']:{
            [Op.gte]: from
        }
    }
}
// Get Attendence records in duration
exports.getAttendenceInDuration = (req, resp) => {
    const {to, from, ...filterCriteria} = req.query;
    const condition =(to && from)? {
        date:{
            [Op.lte]:to,
            [Op.gte]:from
        },
        ...filterCriteria
    }:filterCriteria;
    Task.findAll({where:{...getDurationCondition('task', from, to),...filterCriteria},
        include:[
            {
                model: Attendence,
                where:condition,
                required:true
            }
        ]}
        )
    .then(result => {
        let temp = {};
        result.map(tsk => {
            if(!(tsk['id'] in temp) )
            {
                temp[tsk['id']] = {'title':tsk['task_title'], 'id':tsk['id']};  
            }
            tsk['attendences'].forEach(att => {
                temp[tsk['id']] = {...temp[tsk['id']],[att['date']]:att['isCompleted']}
            })
        })
        resp.status(200).send((Object.values(temp)));
        // resp.status(200).send(result)
    })
    .catch(err=> {
        console.log(err)
        resp.status(500).send({
            message:
                 "Unknown error occured!"
            });
        
    })
}
