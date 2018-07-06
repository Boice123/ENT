module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Admin', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        adminname: {
            type: DataTypes.STRING(14),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        addtime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        lasttime: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        tableName: 'admins',
        timestamps: false,
        freezeTableName: true,
    });
};