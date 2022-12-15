import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import user from "./user.model"
import mc_login from "./mc_login.model"
import mc_tracing from "./mc_tracing.model"
import mc_codes from "./mc_codes.model"
import mc_awards from "./mc_awards.model"
import mc_allies from "./mc_allies.model"

import Sequelize from "sequelize";

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: _dialect,
        operatorAliases: false,
        define: {
            timestamps: false
        },
        pool: {
            max: _pool.max,
            min: _pool.min,
            acquire: _pool.acquire,
            idle: _pool.idle
        }
    }
)

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize)
db.mc_login = mc_login(sequelize, Sequelize)
db.mc_tracing = mc_tracing(sequelize, Sequelize)
db.mc_codes = mc_codes(sequelize, Sequelize)
db.mc_allies = mc_allies(sequelize, Sequelize)
db.mc_awards = mc_awards(sequelize, Sequelize)

export default db