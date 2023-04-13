module.exports = (sequelize, Sequelize) => {
    const ActiveSession = sequelize.define("session", {
        id:{
            type: Sequelize.STRING,
            primaryKey: true,
        },
        token:{
            type: Sequelize.STRING,
        },
        userid:{
            type: Sequelize.STRING,
            references:{
                model: "users",
                key: "id"
            }
        },
        date:{
            type:Sequelize.DATEONLY,
            defaultValue: Sequelize.fn('now'),
            allowNull:true
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
    return ActiveSession;
}