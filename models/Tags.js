module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tags", {
        tagName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    
    return Tags;
}