export default (sequelize, Sequelize) => {
    const Mc_redemptions = sequelize.define("mc_redemptions", {
        id_award: {
            type: Sequelize.INTEGER
        },
        idmask: {
            type: Sequelize.STRING(64)
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        value: {
            type: Sequelize.INTEGER
        },
        idtxt: {
            type: Sequelize.STRING(250)
        },
        json: {
            type: Sequelize.STRING(250)
        },
        block: {
            type: Sequelize.TINYINT
        },
        code_bond: {
            type: Sequelize.STRING(64)
        },
        valid_date: {
            type: Sequelize.STRING(10)
        },
    })
    return Mc_redemptions;
}