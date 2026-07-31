document.addEventListener("DOMContentLoaded", function() {
    // 0. Lấy thông tin user đang đăng nhập từ sessionStorage
    let currentUser = null;
    try {
        currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    } catch (e) {
        currentUser = null;
    }

    // Kiểm tra xem user hiện tại có phải là Admin hay không
    const isAdmin = currentUser && currentUser.vaitro === 'Admin';

    // Phần menu Hệ thống phân quyền động
    const quanLyUserMenuHtml = isAdmin ? `
        <li class="menu-item" id="menu-quanlyuser" onclick="window.location.href='quanlyuser.html'"><span>🔐</span> <span class="menu-text">Quản lý nhân viên</span></li>
        <li class="menu-item" id="menu-lienhe" onclick="window.location.href='lienhe.html'"><span>📞</span> <span class="menu-text">Liên hệ</span></li>
    ` : `
        <li class="menu-item" id="menu-lienhe" onclick="window.location.href='lienhe.html'"><span>📞</span> <span class="menu-text">Liên hệ</span></li>
    `;

    // 1. CHÈN MENU BÊN TRÁI 
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
            <li class="menu-item" id="menu-lichhen" onclick="window.location.href='lichhen.html'"><span>📅</span> <span class="menu-text">Lịch hẹn</span></li>

            <!-- NHÓM 1: KHÁM & ĐIỀU TRỊ (SUBMENU) -->
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <span>🩺 Khám & Điều trị</span> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-khambenh" onclick="window.location.href='khambenh.html'"><span>🏥</span> <span class="menu-text">Khám bệnh</span></li>
                <li class="menu-item" id="menu-phieuchidinh" onclick="window.location.href='phieuchidinh.html'"><span>📋</span> <span class="menu-text">Phiếu chỉ định</span></li>
                <li class="menu-item" id="menu-donthuoc" onclick="window.location.href='donthuoc.html'"><span>📜</span> <span class="menu-text">Đơn thuốc</span></li>
            </ul>

            <!-- NHÓM 2: KHO & VẮC-XIN (SUBMENU) -->
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <span>📦 Kho & Vắc-xin</span> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-khothuoc" onclick="window.location.href='khothuoc.html'"><span>💊</span> <span class="menu-text">Kho thuốc</span></li>
                <li class="menu-item" id="menu-khovaccine" onclick="window.location.href='khovaccine.html'"><span>💉</span> <span class="menu-text">Kho vắc-xin</span></li>
                <li class="menu-item" id="menu-nhatkylamvaccine" onclick="window.location.href='nhatkylamvaccine.html'"><span>⏰</span> <span class="menu-text">Nhật ký tiêm</span></li>
                <li class="menu-item" id="menu-dichvu" onclick="window.location.href='dichvu.html'"><span>📜</span> <span class="menu-text">Giá dịch vụ</span></li>
            </ul>

            <!-- NHÓM 3: LƯU TRÚ (SUBMENU) -->
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <span>🏨 Quản lý Lưu trú</span> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-noitru" onclick="window.location.href='noitru.html'"><span>🏨</span> <span class="menu-text">Nội trú</span></li>
                <li class="menu-item" id="menu-nhatkynoitru" onclick="window.location.href='nhatkynoitru.html'"><span>📖</span> <span class="menu-text">Nhật ký Nội trú</span></li>
            </ul>

            <!-- NHÓM 4: PETSHOP & KHO HÀNG (SUBMENU) -->
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <span>🛍️ Petshop & Bán hàng</span> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-danhmucsanpham" onclick="window.location.href='danhmucsanpham.html'"><span>📦</span> <span class="menu-text">Thêm sản phẩm</span></li>
                <li class="menu-item" id="menu-nhatkykho" onclick="window.location.href='nhatkykho.html'"><span>📋</span> <span class="menu-text">Nhật ký kho</span></li>
                <li class="menu-item" id="menu-donhang" onclick="window.location.href='donhang.html'"><span>📊</span> <span class="menu-text">Chi tiết bán hàng</span></li>
                <li class="menu-item" id="menu-intem" onclick="window.location.href='intem.html'"><span>📥</span> <span class="menu-text">In tem mã vạch</span></li>
            </ul>

            <!-- NHÓM 5: SPA & LÀM ĐẸP (SUBMENU) -->
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <span>✨ Quản lý Spa</span> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-spa" onclick="window.location.href='spa.html'"><span>✨</span> <span class="menu-text">Bảng giá Spa</span></li>
                <li class="menu-item" id="menu-nhatkyspa" onclick="window.location.href='nhatkyspa.html'"><span>✂️</span> <span class="menu-text">Nhật ký Spa</span></li>
            </ul>

            <!-- NHÓM 6: HỆ THỐNG -->
            <li class="menu-category">👨‍⚕️ HỆ THỐNG</li>
            ${quanLyUserMenuHtml}
        </ul>
    </div>

    <!-- STYLE: ĐÃ XÓA NỀN TRẮNG/BÓNG, GIỮ NGUYÊN HIỆU ỨNG CHUỘT -->
    <style>
        .sidebar .menu-text, 
        .sidebar .menu-category,
        .sidebar li {
            font-size: 15px !important;
            font-weight: 700 !important;
        }

        .sidebar .menu-category {
            font-size: 12px !important;
            font-weight: 800 !important;
        }

        /* NÚT DROPDOWN: TRONG SUỐT HOÀN TOÀN, CHỈ ĐỔI MÀU KHI RÊ CHUỘT */
        .menu-dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            cursor: pointer;
            color: #ffffff;
            font-weight: 800 !important;
            font-size: 13px !important;
            background: none !important; /* Xóa sạch nền trắng mờ */
            border: none !important;     /* Xóa đường viền */
            margin: 4px 10px;
            border-radius: 6px;
            transition: background 0.2s ease;
            user-select: none;
        }
        /* Hiệu ứng khi rê chuột vào đổi sáng nhẹ */
        .menu-dropdown-toggle:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: #ffffff;
        }
        .menu-dropdown-toggle .arrow {
            font-size: 10px;
            transition: transform 0.3s ease;
        }
        
        /* Danh sách con */
        .submenu-container {
            display: none;
            list-style: none;
            padding-left: 10px;
            margin: 0;
        }
        .submenu-container.open {
            display: block;
        }
        .menu-dropdown-toggle.active-parent .arrow {
            transform: rotate(180deg);
        }

        .menu-pos-highlight {
            background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
            color: #ffffff !important;
            border-radius: 6px;
            margin: 4px 8px;
            box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
            animation: pulsePos 2s infinite;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .menu-pos-highlight:hover {
            background: linear-gradient(135deg, #1d4ed8, #1e40af) !important;
            transform: translateY(-1px);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.5);
        }
        .menu-pos-highlight .pos-badge {
            background-color: #dc2626;
            color: white;
            font-size: 9px;
            padding: 2px 5px;
            border-radius: 4px;
            font-weight: bold;
            margin-left: auto;
            animation: blinkBadge 1s infinite alternate;
        }
        @keyframes blinkBadge {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes pulsePos {
            0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(37, 99, 235, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
        .sidebar-header {
            font-size: 20px !important;
            font-weight: bold !important;
            padding: 18px 15px !important;
        }
        .sidebar-header span:first-child {
            font-size: 22px !important;
            margin-right: 8px;
        }
        .sidebar-header .menu-text {
            font-size: 30px !important;
            letter-spacing: 0.5px;
        }
    </style>`;

    const container = document.getElementById('menu-container');
    if (container) {
        container.innerHTML = menuHTML;

        // Tự động active trang hiện tại và mở rộng submenu tương ứng
        const currentPage = window.location.pathname.split("/").pop();
        
        const activeItem = document.querySelector(`[onclick*='${currentPage}']`);
        if (activeItem) {
            activeItem.classList.add('active');
            
            const submenus = document.querySelectorAll('.submenu-container');
            submenus.forEach((sub) => {
                if (sub.contains(activeItem)) {
                    sub.classList.add('open');
                    const toggleBtn = sub.previousElementSibling;
                    if (toggleBtn && toggleBtn.classList.contains('menu-dropdown-toggle')) {
                        toggleBtn.classList.add('active-parent');
                    }
                }
            });
        }
    }

    // 2. CHÈN THANH TOP NAVBAR PHÍA TRÊN
    const topnavContainer = document.getElementById('topnav-container');
    if (topnavContainer) {
        topnavContainer.innerHTML = `
            <div class="top-navbar" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 25px; background: #ffffff; border-bottom: 1px solid #e2e8f0; height: 55px; box-sizing: border-box;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <button class="toggle-btn" onclick="toggleSidebar()" style="cursor: pointer; background: none; border: none; font-size: 18px;">☰</button>
                    <h2 style="margin: 0; font-size: 14px; font-weight: bold; color: #1e3a8a;">HỆ THỐNG QUẢN LÝ PHÒNG KHÁM THÚ Y</h2>
                </div>
                
                <div style="display: flex; align-items: center; gap: 20px; margin-right: 10px;">
                    <div class="search-container" style="position: relative; margin: 0;">
                        <input type="text" id="globalSearchInput" class="search-box" placeholder="🔍 Tìm tên KH, SĐT, thú cưng..." autocomplete="off" style="padding: 7px 12px; width: 240px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none;">
                        <div id="searchDropdown" class="search-dropdown"></div>
                    </div>
                    <button onclick="dangXuat()" style="background-color: #dc2626; color: white; border: none; padding: 7px 16px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        🚪 Đăng Xuất
                    </button>
                </div>
            </div>
        `;
    }
});

// HÀM BẬT/TẮT SUBMENU KHI CLICK
function toggleSubmenu(element) {
    element.classList.toggle('active-parent');
    const submenu = element.nextElementSibling;
    if (submenu && submenu.classList.contains('submenu-container')) {
        submenu.classList.toggle('open');
    }
}

// 3. HÀM XỬ LÝ ĐĂNG XUẤT DÙNG CHUNG
function dangXuat() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}
