function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
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
// Nếu màn hình nhỏ hơn 768px (điện thoại) và không phải đang ở trang mobile-menu
    if (window.innerWidth <= 768 && !window.location.href.includes('mobile-menu.html')) {
        // Tùy chọn: Bạn có thể thêm nút chuyển đổi hoặc tự động tối ưu hiển thị
    }
