const sequelize = require('../config/db');

const CanHo = require('./canHoModel');
const PhanKhu = require('./phanKhuModel');
const HinhAnhCanHo = require('./HinhAnhCanHoModel');

CanHo.belongsTo(PhanKhu, { foreignKey: 'ma_phan_khu', as: 'phan_khu' });
PhanKhu.hasMany(CanHo, { foreignKey: 'ma_phan_khu', as: 'can_ho' });
CanHo.hasMany(HinhAnhCanHo, { foreignKey: 'id_can_ho', as: 'hinh_anh' });
HinhAnhCanHo.belongsTo(CanHo, { foreignKey: 'id_can_ho', as: 'can_ho' })

module.exports = {
    sequelize,
    CanHo,
    PhanKhu,
    HinhAnhCanHo
};
