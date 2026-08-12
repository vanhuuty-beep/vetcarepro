function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        // Thu phóng hoặc ẩn hiện sidebar mượt mà
        sidebar.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-collapsed');
    }
}

function formatMaKhachHang(id) {
    return 'KH' + String(id).padStart(4, '0');
}

function formatMaThuCung(id) {
    return 'TC' + String(id).padStart(4, '0');
}

function formatMaKham(id) {
    return 'KB' + String(id).padStart(4, '0');
}

function formatTien(value) {
    if (value == null) return "0 đ";
    return Number(value).toLocaleString('vi-VN') + " đ";
}
function dangXuat() {
    // 1. Hiển thị bảng hỏi xác nhận (tùy chọn)
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?')) {
        
        // 2. Xóa thông tin phiên đăng nhập đã lưu trong trình duyệt
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('currentUser'); // Nếu bạn có dùng localStorage
        
        // 3. Chuyển hướng người dùng quay trở lại trang đăng nhập (index.html)
        window.location.href = 'index.html';
    }
}
