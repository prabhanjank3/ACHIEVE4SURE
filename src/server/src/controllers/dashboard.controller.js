const db = require('../models/index')
const Task = db.tasks;
const Goal = db.goals;
const Op = db.Sequelize.Op;

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
const getDateInFormat = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    var formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate;
}
exports.getDashboardData = (req, resp) => {
    const {userid, to, from} = req.query;
    const extraCondition = (new Date(from) < new Date())?
    {
        task_closedate:
        {
            [Op.lt]: from
        },
        task_state:
        {
            [Op.ne]:'4'
        }
    }:
    {}
    const today = new Date();
    Goal.findAll({
        where:{...getDurationCondition('goal', from, to),userid:userid},
        include:[
            {
                model: Task,
                where:{
                    [Op.or]:[
                        getDurationCondition('task', from, to),
                        {
                            ...extraCondition
                        }
                    ],
                },
                required:false
            }
        ],
        
    })
    .then((result) => {
        resp.send(result)
    })
    .catch(err => {
        console.log(err.message)
        resp.status(500).send({message: err.message})
    });
}
exports.getDashboardDailyData = async (req, resp) => {
    const {userid, to, from, date} = req.query;
    const result = await db.sequelize.query(`
    SELECT attendence.id as attid, date,"isCompleted" as defaultValue, taskiid.id as id, taskiid.title from (select * from public.attendences where date='${date}') as attendence  RIGHT OUTER JOIN(
        SELECT public.tasks.id, public.tasks.task_title as title  
            FROM public.tasks, public.goals where task_type='Daily' and task_state > '1' and public.goals."userid"='${userid}' and "goalid"=public.goals.id and task_startdate <= '${to}' and task_closedate >= '${from}') as taskiid
        ON attendence.taskid=taskiid.id ;
    `)
    .catch(err => {
        resp.status(500).send({message: err.message})
    });
    
    resp.status(200).send(result[0])
}
