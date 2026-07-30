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
