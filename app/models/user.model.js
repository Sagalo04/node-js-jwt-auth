module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("mc_users", {
        idmask: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        document: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.STRING
        },
        goal_amount_1: {
            type: Sequelize.STRING
        },
        award_1: {
            type: Sequelize.STRING
        },

    })

    return User;
}
