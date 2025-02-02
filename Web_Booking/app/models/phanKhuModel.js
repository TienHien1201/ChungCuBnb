const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PhanKhu = sequelize.define('PhanKhu', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ten_phan_khu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dia_chi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quy_mo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tien_ich: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    loai_hinh_san_pham: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at', 
    }
}, {
    tableName: 'phan_khu',
    timestamps: false,
    createdAt: 'created_at',
    underscored: true,      
});


module.exports = PhanKhu;
