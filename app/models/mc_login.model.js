export default (sequelize, Sequelize) => {
    const Mc_login = sequelize.define("mc_login", {
        idmask: {
            type: Sequelize.STRING(64)
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        type: {
            type: Sequelize.TINYINT
        },
        ip: {
            type: Sequelize.STRING(20)
        },
    })
    return Mc_login;
}
