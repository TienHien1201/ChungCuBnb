const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import thư viện cors
const sequelize = require('./app/config/db'); // Import Sequelize connection
const app = express();
const taiKhoanRoute = require('./app/routes/taiKhoanRoute');
const phanKhuRoute = require('./app/routes/phanKhuRoute');
const canHoRoute = require('./app/routes/canHoRoute');
const hinhAnhCanHoRoute = require('./app/routes/hinhAnhCanHoRoute');

// Cấu hình dotenv
dotenv.config();

// Cấu hình body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình CORS
app.use(cors()); // Dùng cors để cho phép các yêu cầu từ các domain khác

// Route thử nghiệm
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Kiểm tra kết nối cơ sở dữ liệu (đã được thực hiện trong db.js)
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

app.use('/api', taiKhoanRoute);
app.use('/api', phanKhuRoute);
app.use('/api', canHoRoute);
app.use('/api', hinhAnhCanHoRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
