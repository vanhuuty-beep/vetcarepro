document.addEventListener("DOMContentLoaded", function() {
    // 0. Tự động chuyển trang mobile-menu nếu là điện thoại và không ở trang menu sẵn
    if (window.innerWidth <= 768) {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('mobile-menu.html') && !currentPath.includes('index.html')) {
            // Nếu muốn tự động mở menu di động khi truy cập web bằng điện thoại, hãy bỏ dấu gạch chéo kép ở dòng dưới:
            // window.location.href = 'mobile-menu.html';
        }
    }

    // 0. Lấy thông tin user đang đăng nhập từ sessionStorage
    let currentUser = null;
    try {
        currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    } catch (e) {
        currentUser = null;
    }

    // Kiểm tra xem user hiện tại có phải là Admin hay không
    const isAdmin = currentUser && currentUser.vaitro === 'Admin';

    // Phần menu Hệ thống phân quyền động (Chỉ Admin mới thấy Quản lý nhân viên)
    const quanLyUserMenuHtml = isAdmin ? `
        <li class="menu-category">👨‍⚕️ Hệ Thống</li>
        <li class="menu-item sub-item" id="menu-quanlyuser" onclick="window.location.href='quanlyuser.html'"><span>🔐</span> <span class="menu-text">Quản lý nhân viên</span></li>
        <li class="menu-item" id="menu-lienhe" onclick="window.location.href='lienhe.html'"><span>📞</span> <span class="menu-text">Liên hệ</span></li>
    ` : `
        <li class="menu-category">👨‍⚕️ Hệ Thống</li>
        <li class="menu-item" id="menu-lienhe" onclick="window.location.href='lienhe.html'"><span>📞</span> <span class="menu-text">Liên hệ</span></li>
    `;

    // 1. CHÈN MENU BÊN TRÁI (KÈM GIAO DIỆN RESPONSIVE CHO MOBILE)
    const menuHTML = `
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <span>🐾</span> <span class="menu-text">VetCare Pro</span>
        </div>
        <li class="menu-item sub-item menu-pos-highlight" id="menu-pos" onclick="window.location.href='pos.html'">
            <span class="pos-icon">⚡</span> 
            <span class="menu-text" style="font-weight: bold;">BÁN HÀNG POS</span>
            <span class="pos-badge">HOT</span>
        </li>
        
        <ul class="menu-list">
            <li class="menu-item" id="menu-thongke" onclick="window.location.href='thongke.html'"><span>📈</span> <span class="menu-text">Thống kê</span></li>
            <li class="menu-item" id="menu-khachhang" onclick="window.location.href='khachhang.html'"><span>👤</span> <span class="menu-text">Khách hàng</span></li>
            <li class="menu-item" id="menu-thucung" onclick="window.location.href='thucung.html'"><span>🐶</span> <span class="menu-text">Thú cưng</span></li>
            <li class="menu-item" id="menu-khambenh" onclick="window.location.href='khambenh.html'"><span>🏥</span> <span class="menu-text">Khám bệnh</span></li>
            <li class="menu-item" id="menu-phieuchidinh" onclick="window.location.href='phieuchidinh.html'"><span>📋</span> <span class="menu-text">Phiếu chỉ định</span></li>
            <li class="menu-item sub-item" id="menu-lichhen" onclick="window.location.href='lichhen.html'"><span>📅</span> <span class="menu-text">Lịch hẹn</span></li>
            
            <!-- Nhóm: Kho & Tiêm chủng -->
            <li class="menu-category">📦 KHO & TIÊM CHỦNG</li>
            <li class="menu-item sub-item" id="menu-donthuoc" onclick="window.location.href='donthuoc.html'"><span>📜</span> <span class="menu-text">Đơn thuốc</span></li>
            <li class="menu-item sub-item" id="menu-khothuoc" onclick="window.location.href='khothuoc.html'"><span>💊</span> <span class="menu-text">Kho thuốc</span></li>
            <li class="menu-item sub-item" id="menu-khovaccine" onclick="window.location.href='khovaccine.html'"><span>💉</span> <span class="menu-text">Kho vắc-xin</span></li>
            <li class="menu-item sub-item" id="menu-nhatkylamvaccine" onclick="window.location.href='nhatkylamvaccine.html'"><span>⏰</span> <span class="menu-text">Nhật ký tiêm</span></li>
            <li class="menu-item" id="menu-dichvu" onclick="window.location.href='dichvu.html'"><span>📜</span> <span class="menu-text">Giá dịch vụ</span></li>

            <!-- Nhóm: Quản lý Lưu trú -->
            <li class="menu-category">🏨 QUẢN LÝ LƯU TRÚ</li>
            <li class="menu-item sub-item" id="menu-noitru" onclick="window.location.href='noitru.html'"><span>🏨</span> <span class="menu-text">Nội trú</span></li>
            <li class="menu-item sub-item" id="menu-nhatkynoitru" onclick="window.location.href='nhatkynoitru.html'"><span>📖</span> <span class="menu-text">Nhật ký Nội trú</span></li>

            <!-- Nhóm: Petshop -->
            <li class="menu-category">📦 PETSHOP</li>
            <li class="menu-item sub-item" id="menu-danhmucsanpham" onclick="window.location.href='danhmucsanpham.html'"><span>📦</span> <span class="menu-text">Thêm sản phẩm</span></li>
            <li class="menu-item sub-item" id="menu-nhatkykho" onclick="window.location.href='nhatkykho.html'"><span>📋</span> <span class="menu-text">Nhật ký kho</span></li>
            <li class="menu-item sub-item" id="menu-donhang" onclick="window.location.href='donhang.html'"><span>📊</span> <span class="menu-text">Chi tiết bán hàng</span></li>
            <li class="menu-item sub-item" id="menu-intem" onclick="window.location.href='intem.html'"><span>📥</span> <span class="menu-text">In tem mã vạch</span></li>
            
            <li class="menu-category">📦 Quản Lý Spa</li>
            <li class="menu-item sub-item" id="menu-spa" onclick="window.location.href='spa.html'"><span>✨</span> <span class="menu-text">Bảng giá Spa</span></li>
            <li class="menu-item sub-item" id="menu-nhatkyspa" onclick="window.location.href='nhatkyspa.html'"><span>✂️</span> <span class="menu-text">Nhật ký Spa</span></li>
            
            ${quanLyUserMenuHtml}
        </ul>
    </div>

    <!-- THANH MENU BOTTOM DƯỚI ĐÁY CHO MOBILE (TỰ ĐỘNG HIỆN KHI Ở TRÊN ĐIỆN THOẠI) -->
    <div class="mobile-bottom-nav">
        <a href="pos.html">
            <i class="fa fa-bolt"></i>
            <span>POS</span>
        </a>
        <a href="khachhang.html">
            <i class="fa fa-users"></i>
            <span>Khách hàng</span>
        </a>
        <a href="thucung.html">
            <i class="fa fa-paw"></i>
            <span>Thú cưng</span>
        </a>
        <a href="mobile-menu.html">
            <i class="fa fa-bars"></i>
            <span>Menu</span>
        </a>
    </div>

    <style>
        /* CSS Responsive ẩn sidebar trên điện thoại và hiện thanh menu đáy */
        @media screen and (max-width: 768px) {
            .sidebar {
                position: fixed;
                left: -280px;
                top: 0;
                height: 100vh;
                z-index: 1000;
                transition: left 0.3s ease;
            }
            .sidebar.active {
                left: 0;
            }
            .main-content, .pos-container {
                width: 100% !important;
                margin-left: 0 !important;
                padding-bottom: 70px !important;
            }
            .mobile-bottom-nav {
                display: flex !important;
            }
        }

        @media screen and (min-width: 769px) {
            .mobile-bottom-nav {
                display: none !important;
            }
        }

        .mobile-bottom-nav {
            display: none;
            position: fixed;
            bottom: 0; left: 0;
            width: 100%; height: 60px;
            background: #ffffff;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            z-index: 9999;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #eee;
        }
        .mobile-bottom-nav a {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #666;
            font-size: 11px;
        }
        .mobile-bottom-nav a i { font-size: 20px; margin-bottom: 2px; }

        .sidebar-header {
            font-size: 20px !important;
            font-weight: bold !important;
            padding: 18px 15px !important;
        }
        .sidebar-header .menu-text {
            font-size: 26px !important;
        }
        .menu-pos-highlight {
            background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
            color: #ffffff !important;
            border-radius: 6px;
            margin: 4px 8px;
        }
    </style>`;

    const container = document.getElementById('menu-container');
    if (container) {
        container.innerHTML = menuHTML;
        
        // Active tự động theo trang hiện tại
        const currentPage = window.location.pathname.split("/").pop();
        if (currentPage.includes('khachhang')) {
            document.getElementById('menu-khachhang')?.classList.add('active');
        } else if (currentPage.includes('thucung')) {
            document.getElementById('menu-thucung')?.classList.add('active');
        } else if (currentPage.includes('pos')) {
            document.getElementById('menu-pos')?.classList.add('active');
        }
    }
});

function dangXuat() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}
