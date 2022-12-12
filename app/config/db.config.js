module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "testdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

// -- UAT mysql --host=mastercard-uat.cjlezcao9fxm.us-east-1.rds.amazonaws.com --user=adminuat -p password: ChefIsobar2021.