// server.js
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// 1. CẤU HÌNH MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// 2. CẤU HÌNH KẾT NỐI SQL SERVER
const dbConfig = {
    user: 'sa',             // Tên đăng nhập SQL Server của bạn (thường là 'sa')
    password: '123456', // Mật khẩu SQL Server của bạn
    server: 'localhost',    // Hoặc tên server instance (VD: 'DESKTOP-XYZ\\SQLEXPRESS')
    database: 'NFTMembershipDB',
    options: {
        encrypt: true, // Dùng cho Azure, nếu chạy local đôi khi cần set false
        trustServerCertificate: true // Bắt buộc true nếu chạy localhost dev
    }
};

// 3. KẾT NỐI DATABASE
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('✅ Đã kết nối tới SQL Server');
    }
}).catch(err => {
    console.error('❌ Lỗi kết nối SQL Server:', err);
});

// 4. API ĐĂNG KÝ
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, walletAddress, hasNFT } = req.body;

        // Tạo pool kết nối mới cho request này
        const pool = await sql.connect(dbConfig);

        // a. Kiểm tra xem Email hoặc Wallet đã tồn tại chưa
        const checkResult = await pool.request()
            .input('Email', sql.VarChar, email)
            .input('Wallet', sql.VarChar, walletAddress)
            .query('SELECT COUNT(*) as count FROM Users WHERE Email = @Email OR WalletAddress = @Wallet');

        if (checkResult.recordset[0].count > 0) {
            return res.status(400).json({ message: 'Email hoặc Ví này đã được đăng ký trong hệ thống!' });
        }

        // b. Thêm User mới
        // Chuyển đổi hasNFT từ boolean (true/false) sang bit (1/0)
        const bitHasNFT = hasNFT ? 1 : 0;

        await pool.request()
            .input('FullName', sql.NVarChar, fullName)
            .input('Email', sql.VarChar, email)
            .input('WalletAddress', sql.VarChar, walletAddress)
            .input('HasNFT', sql.Bit, bitHasNFT)
            .query(`
                INSERT INTO Users (FullName, Email, WalletAddress, HasNFT)
                VALUES (@FullName, @Email, @WalletAddress, @HasNFT)
            `);

        res.status(201).json({ message: 'Đăng ký thành công!' });

    } catch (error) {
        console.error('Lỗi Server:', error);
        res.status(500).json({ message: 'Lỗi server khi lưu dữ liệu.' });
    }
});

// 5. CHẠY SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});