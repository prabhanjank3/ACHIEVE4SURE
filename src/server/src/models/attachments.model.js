module.exports = (sequelize, Sequelize) => {
    const Attachment = sequelize.define("attachment", {
        id:{
            type: Sequelize.STRING,
            primaryKey: true,
        },
        taskid:{
            type: Sequelize.STRING,
            references:{
                model: "tasks",
                key: "id"
              }
        },
        userid:{
            type: Sequelize.STRING,
            allowNull:true,
            references:{
                model: "users",
                key: "id"
              }
        },
        name:{
            type: Sequelize.STRING,
        },
        path:{
            type: Sequelize.STRING,
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
    return Attachment;
}