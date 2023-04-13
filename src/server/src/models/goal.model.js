var shortid = require('shortid');
module.exports = (sequelize, Sequelize) => {
    const Goal = sequelize.define("goal", {
        id:{
            type: Sequelize.STRING,
            defaultValue:'GO-'+shortid.generate(),
            primaryKey: true,
            validate:{
            notEmpty:{
                msg: "Goal ID cannot be empty"
            }
        }
        },
        userid:{
            type: Sequelize.STRING
        },
        goal_title:{
            type:Sequelize.STRING
        },
        goal_description:{
            type:Sequelize.TEXT
        },
        goal_startdate:{
            type:Sequelize.DATEONLY,
            defaultValue:new Date()
        },
        goal_closedate:{
            type:Sequelize.DATEONLY,
            defaultValue:new Date()
        },
        goal_objective:{
            type:Sequelize.STRING
        },
        goal_comments:{
            type:Sequelize.TEXT
        },
        createdAt: {
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
    return Goal;
}