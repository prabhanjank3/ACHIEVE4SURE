var shortid = require('shortid');
module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id:{
            type: Sequelize.STRING,
            defaultValue:'TA-'+shortid.generate(),
            primaryKey: true,
            validate:{
            notEmpty:{
                msg: "Task ID cannot be empty"
            }
            }
        },
        userid:{
            type: Sequelize.STRING,
            references:{
                model: "users",
                key: "id"
              }
        },
        goalid:{
            type: Sequelize.STRING,
            references:{
                model: "goals",
                key: "id"
              }
        },
        task_title:{
            type:Sequelize.STRING
        },
        task_comments:{
            type:Sequelize.TEXT
        },
        task_description:{
            type:Sequelize.TEXT
        },
        task_startdate:{
            type:Sequelize.DATEONLY
        },
        task_closedate:{
            type:Sequelize.DATEONLY
        },
        task_state:{
            type:Sequelize.STRING
        },
        task_type:{
            type:Sequelize.STRING
        },
        isFlagged:{
            type: Sequelize.BOOLEAN
        },
        task_inProgressDate:{
            type:Sequelize.DATEONLY
        },
        task_completedDate:{
            type:Sequelize.DATEONLY
        },
        createdAt: 
        {
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            type: Sequelize.DATE
        }
    })
    return Task;
}