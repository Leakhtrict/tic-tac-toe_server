module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define("Games", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Games;
}