var shortid = require('shortid');
module.exports = (sequelize, Sequelize) => {
    const Attendence = sequelize.define("attendence", {
        id:{
            type: Sequelize.STRING,
            primaryKey: true,
        },
        userid:{
            type: Sequelize.STRING,
            references:{
                model: "users",
                key: "id"
              }
        },
        taskid:{
            type: Sequelize.STRING,
            references:{
                model: "tasks",
                key: "id"
              }
        },
        date:{
            type:Sequelize.DATEONLY,
            defaultValue: Sequelize.fn('now'),
            allowNull:true
        },
        isCompleted:{
            type:Sequelize.BOOLEAN
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
    return Attendence;
}