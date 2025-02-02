const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quanlycanho', 'root', '30102004', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, 
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Kết nối tới MySQL thành công!');
  } catch (error) {
    console.error('Không thể kết nối tới MySQL:', error);
  }
}
testConnection();
module.exports = sequelize;
