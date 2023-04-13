require('dotenv').config();
const ENVIRONMENT = process.env.ENVIRONMENT || "prod"
const dbConfig = require("../config/db.config.js")[ENVIRONMENT];
const Sequelize = require("sequelize");

//### DB Configuration ###
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  //### Models ###
  db.tasks = require('./task.model')(sequelize, Sequelize);
  db.goals = require('./goal.model')(sequelize, Sequelize);
  db.attenndence = require('./attendence.model')(sequelize, Sequelize);
  db.users = require('./users.model')(sequelize, Sequelize);
  db.session = require('./activeSession.model')(sequelize, Sequelize);
  db.attachment = require('./attachments.model')(sequelize, Sequelize);
  //#### Associations ####

  db.goals.hasMany(db.tasks, {foreignKey:'goalid'});
  db.tasks.belongsTo(db.goals);

  db.tasks.hasMany(db.attenndence, {foreignKey:'taskid'});
  db.attenndence.belongsTo(db.tasks);

  db.tasks.hasMany(db.attachment, {foreignKey:'taskid'});
  db.attachment.belongsTo(db.tasks);
  
  db.users.hasMany(db.goals, {foreignKey:'userid'})
  db.goals.belongsTo(db.users);

  db.users.hasMany(db.tasks, {foreignKey:'userid'})
  db.tasks.belongsTo(db.users);

  module.exports = db;