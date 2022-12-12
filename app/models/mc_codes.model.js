module.exports = (sequelize, Sequelize) => {
    const Mc_codes = sequelize.define("mc_codes", {
        idmask: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING(10),
        },
        code_hash: {
            type: Sequelize.STRING(64)
        },
    })
    return Mc_codes;
}