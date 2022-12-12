module.exports = (sequelize, Sequelize) => {
    const Mc_allies = sequelize.define("mc_allies", {
        name: {
            type: Sequelize.STRING(50),
        },
        description: {
            type: Sequelize.STRING(150),
        },
        image: {
            type: Sequelize.STRING(150)
        },
        terms: {
            type: Sequelize.STRING(150)
        },
    })
    return Mc_allies;
}