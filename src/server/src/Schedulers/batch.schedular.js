const db = require("../models")
const Op = db.Sequelize.Op
const Batch = db.batches

//Get All Active Batches whose batch start time is less than Threshold
//where threshold is 5min 
exports.getAllActiveBatchesLessThanTimeThreshold = async(req, res)=>{
  //Get Current Date
  var today = new Date(new Date() + 5);
    
  //Convert date format to yyyy-mm-dd
  var date = today.getFullYear()+'-'+ (today.getMonth() + 1) +'-'+today.getDate();

  const startHours = today.getHours()
  const startMinutes = today.getMinutes()

  
  today.setMinutes( today.getMinutes() + 5);
  const endHours = today.getHours()
  const endMinutes = today.getMinutes()

  //Condition for sequelize to get all active batches
  const condition = {
    batchstartdate: {
            [Op.lte]: date
        },
        [Op.and]: [
            {
              batchenddate: {
                  [Op.gte]: date 
              },
              batchstarttime: {
                [Op.between]: [`${startHours}:${startMinutes}:00`, `${endHours}:${endMinutes}:00`]
              }
            }
        ]      
    };
  
    const batches = await Batch
                    .findAll({
                        attributes: ['batchstarttime', 'instructorid', 'batchmeetlink', 'title'], 
                        where: condition, 
                        order: ["batchstarttime"]
                    }).catch(err=> {
                      res.status(500).send({
                            message:
                                "Some error occurred while finding active Batches."
                            });
                    })

    res.status(200).send(batches)
}