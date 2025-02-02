// CanHoModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PhanKhu = require('./phanKhuModel');
const HinhAnhCanHo = require('./HinhAnhCanHoModel');  // Import after defining

const CanHo = sequelize.define('CanHo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ten_toa_can_ho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ten_can_ho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loai_can_ho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chu_thich: {
        type: DataTypes.STRING
    },
    tinh_trang_can_ho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loai_kinh_doanh: {
        type: DataTypes.ENUM('Thuê', 'Bán'),
        allowNull: false
    },
    ma_phan_khu: {
        type: DataTypes.INTEGER,
        references: {
            model: 'phan_khu',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    dien_tich: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gia_thu_ve: {
        type: DataTypes.DECIMAL(15, 2)
    },
    gia_ban: {
        type: DataTypes.DECIMAL(15, 2)
    },
    huong: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'can_ho',
    timestamps: false,
    underscored: true,
});

module.exports = CanHo;
