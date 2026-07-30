<script>
        // Hàm xử lý đăng xuất cho mobile
        function dangXuatMobile() {
            if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?')) {
                sessionStorage.removeItem('currentUser');
                // Quay về trang đăng nhập ngoài thư mục gốc
                window.location.href = '../index.html';
            }
        }
    </script>
