function dangXuatMobile() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?')) {
        // Xóa thông tin phiên đăng nhập đã lưu
        sessionStorage.removeItem('currentUser');
        
        // Chuyển hướng về trang đăng nhập gốc (vì đang ở trong thư mục mobile/ nên cần dùng ../ để lùi ra ngoài)
        window.location.replace('../index.html');
    }
}
