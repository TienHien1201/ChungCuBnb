-- Cơ sở dữ liệu: QuanLyCanHo
drop database if exists QuanLyCanHo;
CREATE DATABASE QuanLyCanHo;
USE QuanLyCanHo;

-- Bảng tài khoản người dùng
CREATE TABLE tai_khoan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    quyen ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng phân khu
CREATE TABLE phan_khu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_phan_khu VARCHAR(255) NOT NULL,
    dia_chi VARCHAR(255) NOT NULL,
    quy_mo TEXT,
    tien_ich TEXT,
    loai_hinh_san_pham TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE can_ho (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Mã căn hộ
    ten_toa_can_ho VARCHAR(255) NOT NULL, -- Tên tòa căn hộ (ví dụ: BS1513.17, BS1513.18)
    ten_can_ho VARCHAR(255) NOT NULL, -- Tên căn hộ (ví dụ: 1710)
    loai_can_ho VARCHAR(50) NOT NULL, -- Loại căn hộ (ví dụ: 2br2wc, 3br3wc, 1br plus)
    chu_thich VARCHAR(255), -- Chú thích (sơ cấp hoặc thứ cấp)
    tinh_trang_can_ho VARCHAR(255) NOT NULL, -- Tình trạng căn hộ (ví dụ: full nội thất, trống, bếp rèm)
    loai_kinh_doanh ENUM('Thuê', 'Bán') NOT NULL, -- Loại kinh doanh (thuê hoặc bán)
    ma_phan_khu INT, -- Mã phân khu (foreign key tham chiếu đến bảng PhanKhu)
    dien_tich VARCHAR(100) NOT NULL, -- Diện tích (ví dụ: 69.2m²(Tim) - 63m²(TT))
    gia_thu_ve DECIMAL(15, 2), -- Giá thuê thu về
    gia_ban DECIMAL(15, 2), -- Giá bán
    huong VARCHAR(50), -- Hướng căn hộ (ví dụ: Đông Nam)
    FOREIGN KEY (ma_phan_khu) REFERENCES phan_khu(id) ON DELETE SET NULL -- Khóa ngoại tham chiếu đến bảng PhanKhu
);


CREATE TABLE hinh_anh_can_ho (
    id INT AUTO_INCREMENT PRIMARY KEY,          
    id_can_ho INT NOT NULL,                   
    duong_dan_hinh VARCHAR(255) NOT NULL,      -- Đường dẫn ảnh (URL hoặc local path)
    FOREIGN KEY (id_can_ho) REFERENCES can_ho(id) ON DELETE CASCADE
);

-- Bảng khách hàng
CREATE TABLE khach_hang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_tai_khoan INT NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    so_dien_thoai VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    dia_chi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ma_tai_khoan) REFERENCES tai_khoan(id) ON DELETE CASCADE
);

-- Bảng giỏ hàng
CREATE TABLE lich_su_giao_dich  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_can_ho INT NOT NULL,
    id_khach_hang INT NOT NULL,
    loai_giao_dich ENUM('Mua', 'Thuê') NOT NULL, -- Loại giao dịch: Mua hoặc Thuê
    ngay_xem_canho TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngay_di_coi_canho DATE NOT NULL,
    FOREIGN KEY (id_can_ho) REFERENCES can_ho(id) ON DELETE CASCADE,
    FOREIGN KEY (id_khach_hang) REFERENCES khach_hang(id) ON DELETE CASCADE
);

-- Bảng tin tức
CREATE TABLE tin_tuc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tieu_de VARCHAR(255) NOT NULL,
    noi_dung TEXT NOT NULL,
    ngay_dang TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nguoi_dang INT,
    FOREIGN KEY (nguoi_dang) REFERENCES tai_khoan(id) ON DELETE SET NULL
);

-- Bảng yêu cầu hỗ trợ
CREATE TABLE yeu_cau_ho_tro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_khach_hang INT NOT NULL,
    noi_dung TEXT NOT NULL,
    trang_thai ENUM('Đang xử lý', 'Đã hoàn thành') DEFAULT 'Đang xử lý',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_khach_hang) REFERENCES khach_hang(id) ON DELETE CASCADE
);

CREATE TABLE danh_gia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_can_ho INT NOT NULL,
    id_khach_hang INT NOT NULL,
    diem_danh_gia TINYINT CHECK (diem_danh_gia BETWEEN 1 AND 5), -- Điểm 1-5
    noi_dung TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_can_ho) REFERENCES can_ho(id) ON DELETE CASCADE,
    FOREIGN KEY (id_khach_hang) REFERENCES khach_hang(id) ON DELETE CASCADE
);

CREATE TABLE thong_bao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_nguoi_nhan INT, -- NULL nếu gửi chung cho tất cả khách hàng
    tieu_de VARCHAR(255) NOT NULL,
    noi_dung TEXT NOT NULL,
    da_doc BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_nguoi_nhan) REFERENCES tai_khoan(id) ON DELETE CASCADE
);
USE QuanLyCanHo;

-- Thêm dữ liệu cho bảng tai_khoan
INSERT INTO tai_khoan (email, mat_khau, quyen) VALUES
('user1@example.com', 'password123', 'user'),
('user2@example.com', 'password123', 'user'),
('user3@example.com', 'password123', 'admin'),
('user4@example.com', 'password123', 'user'),
('user5@example.com', 'password123', 'user'),
('admin1@example.com', 'adminpass', 'admin'),
('admin2@example.com', 'adminpass', 'admin'),
('user6@example.com', 'password123', 'user'),
('user7@example.com', 'password123', 'user'),
('user8@example.com', 'password123', 'user');

-- Thêm dữ liệu cho bảng phan_khu
INSERT INTO phan_khu (ten_phan_khu, dia_chi, quy_mo, tien_ich, loai_hinh_san_pham) VALUES
('Khu A', '123 Đường A', '500 căn hộ', 'Hồ bơi, Gym', 'Căn hộ chung cư'),
('Khu B', '456 Đường B', '300 căn hộ', 'Siêu thị, Trường học', 'Nhà phố'),
('Khu C', '789 Đường C', '700 căn hộ', 'Công viên, Trung tâm thương mại', 'Biệt thự'),
('Khu D', '101 Đường D', '400 căn hộ', 'Trung tâm thể thao', 'Căn hộ mini'),
('Khu E', '111 Đường E', '200 căn hộ', 'Bảo vệ 24/7', 'Shophouse'),
('Khu F', '222 Đường F', '600 căn hộ', 'Bãi đỗ xe thông minh', 'Căn hộ duplex'),
('Khu G', '333 Đường G', '550 căn hộ', 'Sân chơi trẻ em', 'Penthouse'),
('Khu H', '444 Đường H', '450 căn hộ', 'Cảnh quan xanh', 'Căn hộ studio'),
('Khu I', '555 Đường I', '350 căn hộ', 'Hệ thống camera an ninh', 'Căn hộ thông minh'),
('Khu J', '666 Đường J', '800 căn hộ', 'Khu BBQ', 'Căn hộ cao cấp');

-- Thêm dữ liệu cho bảng can_ho
INSERT INTO can_ho (ten_toa_can_ho, ten_can_ho, loai_can_ho, chu_thich, tinh_trang_can_ho, loai_kinh_doanh, ma_phan_khu, dien_tich, gia_thu_ve, gia_ban, huong) VALUES
('BS1513.17', '101', '2br2wc', 'Căn góc', 'Full nội thất', 'Thuê', 1, '69.2m²(Tim) - 63m²(TT)', 10000000, 2500000000, 'Đông'),
('BS1513.18', '102', '3br3wc', '', 'Trống', 'Bán', 2, '85m²(Tim) - 78m²(TT)', 0, 3000000000, 'Tây Nam'),
('BS1513.19', '103', '1br plus', 'Sơ cấp', 'Bếp rèm', 'Thuê', 3, '55m²(Tim) - 50m²(TT)', 7000000, 1800000000, 'Bắc'),
('BS1513.20', '104', '2br2wc', '', 'Full nội thất', 'Bán', 4, '70m²(Tim) - 65m²(TT)', 0, 2800000000, 'Nam'),
('BS1513.21', '105', '3br3wc', '', 'Trống', 'Thuê', 5, '90m²(Tim) - 85m²(TT)', 12000000, 3200000000, 'Đông Bắc'),
('BS1513.22', '106', '1br', 'Thứ cấp', 'Bếp rèm', 'Bán', 6, '50m²(Tim) - 45m²(TT)', 0, 1500000000, 'Tây'),
('BS1513.23', '107', '2br2wc', '', 'Full nội thất', 'Thuê', 7, '72m²(Tim) - 68m²(TT)', 9500000, 2600000000, 'Nam'),
('BS1513.24', '108', '3br3wc', '', 'Trống', 'Bán', 8, '92m²(Tim) - 88m²(TT)', 0, 3500000000, 'Tây Bắc'),
('BS1513.25', '109', '1br plus', 'Sơ cấp', 'Bếp rèm', 'Thuê', 9, '58m²(Tim) - 52m²(TT)', 7500000, 1700000000, 'Đông Nam'),
('BS1513.26', '110', '2br2wc', '', 'Full nội thất', 'Bán', 10, '75m²(Tim) - 70m²(TT)', 0, 2900000000, 'Tây Nam'),
('BS2515.10', '111', 'stu', '', 'Full nội thất', 'Bán', 10, '40m²(Tim) - 50m²(TT)', 0, 1900000000, 'Tây Bắc');

-- Thêm dữ liệu cho bảng hinh_anh_can_ho
INSERT INTO hinh_anh_can_ho (id_can_ho, duong_dan_hinh) VALUES
(1, 'https://vinhome.com.vn/wp-content/uploads/2023/04/mat-abng.jpg'),
(1, 'https://images.placeholders.dev/350'),
(1, 'https://images.placeholders.dev/350'),
(1, 'https://images.placeholders.dev/350'),
(1, 'https://images.placeholders.dev/350'),
(2, 'https://i.pinimg.com/236x/1c/f3/98/1cf3984e15de48a2ebff863c86324835.jpg'),
(2, 'https://images.placeholders.dev/350'),
(2, 'https://images.placeholders.dev/350'),
(2, 'https://images.placeholders.dev/350'),
(3, 'https://i.pinimg.com/236x/ae/10/72/ae1072da514b4c6d3fd460b619b49a08.jpg'),
(3, 'https://images.placeholders.dev/350'),
(4, 'https://i.pinimg.com/236x/50/e9/c1/50e9c1b309abbdcbb15def6e7225676d.jpg'),
(4, 'https://images.placeholders.dev/350'),
(4, 'https://images.placeholders.dev/350'),
(5, 'https://i.pinimg.com/236x/2a/18/ad/2a18adfe306bb820835f776bc497483c.jpg'),
(5, 'https://images.placeholders.dev/350'),
(6, 'https://i.pinimg.com/236x/a3/ae/67/a3ae67725e137b71e64c3a4e3da92ddb.jpg'),
(6, 'https://images.placeholders.dev/350'),
(7, 'https://i.pinimg.com/236x/c0/e5/e5/c0e5e5e92703f3139b27c506fae66997.jpg'),
(7, 'https://i.pinimg.com/236x/c0/e5/e5/c0e5e5e92703f3139b27c506fae66997.jpg'),
(8, 'https://i.pinimg.com/236x/78/ee/84/78ee8464941b8ee96498dccbfb0bcde6.jpg'),
(8, 'https://images.placeholders.dev/350'),
(9, 'https://i.pinimg.com/236x/1c/c1/70/1cc170682cebb1cf858133e6d20d6dd5.jpg'),
(9, 'https://images.placeholders.dev/350'),
(10, 'https://i.pinimg.com/236x/ce/94/d5/ce94d56abfc81b8f946048b3058774a7.jpg'),
(10, 'https://images.placeholders.dev/350'),
(11, 'https://i.pinimg.com/236x/95/44/41/9544418361bce353ffa3e6c60ff4e2c8.jpg');



-- Thêm dữ liệu cho bảng khach_hang
INSERT INTO khach_hang (ma_tai_khoan, ho_ten, so_dien_thoai, email, dia_chi) VALUES
(1, 'Nguyễn Văn A', '0901234567', 'a@example.com', '123 Đường A'),
(2, 'Trần Thị B', '0912345678', 'b@example.com', '456 Đường B'),
(3, 'Lê Văn C', '0923456789', 'c@example.com', '789 Đường C'),
(4, 'Hoàng Thị D', '0934567890', 'd@example.com', '101 Đường D'),
(5, 'Phạm Văn E', '0945678901', 'e@example.com', '111 Đường E'),
(6, 'Đặng Thị F', '0956789012', 'f@example.com', '222 Đường F'),
(7, 'Bùi Văn G', '0967890123', 'g@example.com', '333 Đường G'),
(8, 'Ngô Thị H', '0978901234', 'h@example.com', '444 Đường H'),
(9, 'Dương Văn I', '0989012345', 'i@example.com', '555 Đường I'),
(10, 'Hà Thị J', '0990123456', 'j@example.com', '666 Đường J');

-- Thêm dữ liệu cho bảng lich_su_giao_dich
INSERT INTO lich_su_giao_dich (id_can_ho, id_khach_hang, loai_giao_dich, ngay_di_coi_canho) VALUES
(1, 1, 'Mua', '2024-01-01'),
(2, 2, 'Thuê', '2024-02-02'),
(3, 3, 'Mua', '2024-03-03'),
(4, 4, 'Thuê', '2024-04-04'),
(5, 5, 'Mua', '2024-05-05'),
(6, 6, 'Thuê', '2024-06-06'),
(7, 7, 'Mua', '2024-07-07'),
(8, 8, 'Thuê', '2024-08-08'),
(9, 9, 'Mua', '2024-09-09'),
(10, 10, 'Thuê', '2024-10-10');

