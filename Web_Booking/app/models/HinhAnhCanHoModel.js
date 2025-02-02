    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/db');

    const HinhAnhCanHo = sequelize.define('HinhAnhCanHo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_can_ho: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'can_ho',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        duong_dan_hinh: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'hinh_anh_can_ho',
        timestamps: false,
        underscored: true,
    });

    module.exports = HinhAnhCanHo;
