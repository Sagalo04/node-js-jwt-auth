module.exports = (sequelize, Sequelize) => {
    const Mc_awards = sequelize.define("mc_awards", {
        name: {
            type: Sequelize.STRING(50),
        },
        s20: {
            type: Sequelize.INTEGER,
        },
        s50: {
            type: Sequelize.INTEGER,
        },
        s80: {
            type: Sequelize.INTEGER,
        },
        s150: {
            type: Sequelize.INTEGER,
        },
        s200: {
            type: Sequelize.INTEGER,
        },
        s350: {
            type: Sequelize.INTEGER,
        },
        s500: {
            type: Sequelize.INTEGER,
        },
        id_brand_quantum: {
            type: Sequelize.INTEGER
        },
        id_product_quantum: {
            type: Sequelize.INTEGER
        },
        leal_coins: {
            type: Sequelize.TINYINT
        },
        logo_image: {
            type: Sequelize.STRING(150)
        },
        image: {
            type: Sequelize.STRING(150)
        },
        value: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING(150)
        },
    })
    return Mc_awards;
}