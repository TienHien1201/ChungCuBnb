const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TaiKhoan = sequelize.define('TaiKhoan', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mat_khau: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quyen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    field: 'created_at',  
  },
}, {
  tableName: 'tai_khoan', 
  timestamps: false,      
  createdAt: 'created_at',
  underscored: true,      
});

module.exports = TaiKhoan;
