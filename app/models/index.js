const config = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        define: {
            timestamps: false
        },
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize)
db.mc_login = require("./mc_login.model.js")(sequelize, Sequelize)
db.mc_tracing = require("./mc_tracing.model.js")(sequelize, Sequelize)
db.mc_codes = require("./mc_codes.model.js")(sequelize, Sequelize)
db.mc_allies = require("./mc_allies.model.js")(sequelize, Sequelize)
db.mc_awards = require("./mc_awards.model.js")(sequelize, Sequelize)

module.exports = db