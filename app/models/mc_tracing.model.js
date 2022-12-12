module.exports = (sequelize, Sequelize) => {
    const Mc_tracing = sequelize.define("mc_tracing", {
        idmask: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        amount_1: {
            type: Sequelize.INTEGER
        },
        winner_1: {
            type: Sequelize.INTEGER
        },
        date_update: {
            type: Sequelize.STRING(10)
        },
    })
    return Mc_tracing;
}