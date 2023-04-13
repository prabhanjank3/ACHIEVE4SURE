module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id:{
            type: Sequelize.STRING,
            primaryKey: true,
            validate:{
            notEmpty:{
                msg: "User ID cannot be empty"
            }
            }
        },
        firstname:{
            type:Sequelize.STRING
        },
        lastname:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        phone:{
            type:Sequelize.STRING
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
    return User;
}