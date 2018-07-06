module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tel: {
            type: DataTypes.STRING(14),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
    }, {
        tableName: 'user',
        timestamps: false,
        freezeTableName: true,
    });
};