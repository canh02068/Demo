// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getSPAll = (req, res) => {
    db.query('select*from sanpham', (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else {
            res.status(200).json({ data: results });
        }
    });
};

exports.getLoaispById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM loaihang WHERE LoaiHangID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createLoaisp = (req, res) => {
    const { LoaiHangID, TenLH } = req.body;

    db.query(
        'INSERT INTO loaihang (LoaiHangID, TenLH) VALUES (?, ?)', [LoaiHangID, TenLH],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.json({ message: 'Loại sản phẩm đã được thêm thành công hehehehe' });
            }
        }
    );
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updateLoaisp = (req, res) => {
    const { id } = req.params;
    const { TenLH } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE loaihang SET TenLH = ? WHERE LoaiHangID = ?', [TenLH, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy loại sản phẩm để cập nhật');
            } else {
                res.json({ message: 'Loại sản phẩm đã được cập nhật thành công' });
            }
        }
    );
};

// Xóa một loại sản phẩm bằng ID
exports.deleteLoaisp = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM loaihang WHERE LoaiHangID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm để xóa');
        } else {
            res.json({ message: 'Loại sản phẩm đã được xóa thành công' });
        }
    });
};