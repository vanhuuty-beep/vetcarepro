document.addEventListener("DOMContentLoaded", function() {
    // 0. Lấy thông tin user đang đăng nhập từ sessionStorage và chuẩn hóa role
    let currentUser = null;
    try {
        currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    } catch (e) {
        currentUser = null;
    }

    // Chuẩn hóa chuỗi vai trò để nhận diện chính xác kể cả có dấu, viết hoa/thường hoặc khoảng trắng
    const vaitroRaw = currentUser ? (currentUser.vaitro || currentUser.role || '') : '';
    const vaitro = vaitroRaw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    
    const isAdmin = vaitro === 'admin';
    const isBacSi = vaitro.includes('bac si') || vaitro === 'bacsi';
    const isLeTan = vaitro.includes('letan') || vaitro.includes('le tan') || vaitro.includes('nhan vien');

    // Xây dựng danh mục HỆ THỐNG dựa theo phân quyền
    let heThongMenuHtml = '';
    if (isAdmin) {
        heThongMenuHtml = `
            <li class="menu-category">👨‍⚕️ HỆ THỐNG</li>
            <li class="menu-item" id="menu-quanlyuser" onclick="window.location.href='quanlyuser.html'"><span>🔐</span> <span class="menu-text">Quản lý nhân viên</span></li>
            <li class="menu-item" id="menu-lienhe" onclick="window.location.href='lienhe.html'"><span>📞</span> <span class="menu-text">Liên hệ</span></li>
        `;
    } else {
        heThongMenuHtml = `
            <li class="menu-category">👨‍⚕️ HỆ THỐNG</li>
            <li class="menu-item" id="menu-lienhe" onclick="window.location.href='lienhe.html'"><span>📞</span> <span class="menu-text">Liên hệ</span></li>
        `;
    }

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const ngayHienTai = now.toLocaleDateString('vi-VN', options);

    // 1. XÂY DỰNG CÁC NHÓM MENU THEO PHÂN QUYỀN TRÊN PC
    let dynamicMenuContent = '';

    // Thống kê / Tổng quan
    dynamicMenuContent += `<li class="menu-item" id="menu-thongke" onclick="window.location.href='thongke.html'"><span>📈</span> <span class="menu-text">Thống kê</span></li>`;

    // Khách hàng, Thú cưng, Lịch hẹn (Mọi role đều cần)
    dynamicMenuContent += `
        <li class="menu-item" id="menu-khachhang" onclick="window.location.href='khachhang.html'"><span>👤</span> <span class="menu-text">Khách hàng</span></li>
        <li class="menu-item" id="menu-thucung" onclick="window.location.href='thucung.html'"><span>🐶</span> <span class="menu-text">Thú cưng</span></li>
        <li class="menu-item" id="menu-lichhen" onclick="window.location.href='lichhen.html'"><span>📅</span> <span class="menu-text">Lịch hẹn</span></li>
    `;

    // Nhóm Khám & Điều trị: BẮT BUỘC hiển thị cho Admin và Bác sĩ
    if (isAdmin || isBacSi) {
        dynamicMenuContent += `
            <li class="menu-dropdown-toggle active-parent" onclick="toggleSubmenu(this)">
                <div class="menu-label-wrap"><span class="group-icon">🩺</span> <span class="menu-text">Khám & Điều trị</span></div> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container open">
                <li class="menu-item" id="menu-khambenh" onclick="window.location.href='khambenh.html'"><span>🏥</span> <span class="menu-text">Khám bệnh</span></li>
                <li class="menu-item" id="menu-phieuchidinh" onclick="window.location.href='phieuchidinh.html'"><span>📋</span> <span class="menu-text">Phiếu chỉ định</span></li>
                <li class="menu-item" id="menu-donthuoc" onclick="window.location.href='donthuoc.html'"><span>📜</span> <span class="menu-text">Đơn thuốc</span></li>
            </ul>
        `;
    }

    // Nhóm Kho & Vắc-xin: Mọi người đều cần để tra cứu thuốc/tiêm chủng
    dynamicMenuContent += `
        <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
            <div class="menu-label-wrap"><span class="group-icon">📦</span> <span class="menu-text">Kho & Vắc-xin</span></div> <span class="arrow">▼</span>
        </li>
        <ul class="submenu-container">
            <li class="menu-item" id="menu-khothuoc" onclick="window.location.href='khothuoc.html'"><span>💊</span> <span class="menu-text">Kho thuốc</span></li>
            <li class="menu-item" id="menu-khovaccine" onclick="window.location.href='khovaccine.html'"><span>💉</span> <span class="menu-text">Kho vắc-xin</span></li>
            <li class="menu-item" id="menu-nhatkylamvaccine" onclick="window.location.href='nhatkylamvaccine.html'"><span>⏰</span> <span class="menu-text">Nhật ký tiêm</span></li>
            <li class="menu-item" id="menu-dichvu" onclick="window.location.href='dichvu.html'"><span>📜</span> <span class="menu-text">Giá dịch vụ</span></li>
        </ul>
    `;

    // Nhóm Quản lý Lưu trú: Dành cho Admin và Bác sĩ
    if (isAdmin || isBacSi) {
        dynamicMenuContent += `
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <div class="menu-label-wrap"><span class="group-icon">🏨</span> <span class="menu-text">Quản lý Lưu trú</span></div> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-noitru" onclick="window.location.href='noitru.html'"><span>🏨</span> <span class="menu-text">Nội trú</span></li>
                <li class="menu-item" id="menu-nhatkynoitru" onclick="window.location.href='nhatkynoitru.html'"><span>📖</span> <span class="menu-text">Nhật ký Nội trú</span></li>
            </ul>
        `;
    }

    // Petshop & Bán hàng: CHỈ ADMIN VÀ LỄ TÂN THẤY (Bác sĩ bị ẩn hoàn toàn)
    if (!isBacSi) {
        dynamicMenuContent += `
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <div class="menu-label-wrap"><span class="group-icon">🛍️</span> <span class="menu-text">Petshop & Bán hàng</span></div> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-danhmucsanpham" onclick="window.location.href='danhmucsanpham.html'"><span>📦</span> <span class="menu-text">Thêm sản phẩm</span></li>
                <li class="menu-item" id="menu-nhatkykho" onclick="window.location.href='nhatkykho.html'"><span>📋</span> <span class="menu-text">Nhật ký kho</span></li>
                <li class="menu-item" id="menu-donhang" onclick="window.location.href='donhang.html'"><span>📊</span> <span class="menu-text">Chi tiết bán hàng</span></li>
                <li class="menu-item" id="menu-intem" onclick="window.location.href='intem.html'"><span>📥</span> <span class="menu-text">In tem mã vạch</span></li>
            </ul>
        `;
    }

    // Quản lý Spa: CHỈ ADMIN VÀ LỄ TÂN THẤY (Bác sĩ bị ẩn hoàn toàn)
    if (!isBacSi) {
        dynamicMenuContent += `
            <li class="menu-dropdown-toggle" onclick="toggleSubmenu(this)">
                <div class="menu-label-wrap"><span class="group-icon">✨</span> <span class="menu-text">Quản lý Spa</span></div> <span class="arrow">▼</span>
            </li>
            <ul class="submenu-container">
                <li class="menu-item" id="menu-spa" onclick="window.location.href='spa.html'"><span>✨</span> <span class="menu-text">Bảng giá Spa</span></li>
                <li class="menu-item" id="menu-nhatkyspa" onclick="window.location.href='nhatkyspa.html'"><span>✂️</span> <span class="menu-text">Nhật ký Spa</span></li>
            </ul>
        `;
    }

    dynamicMenuContent += heThongMenuHtml;

    const menuHTML = `
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <div style="display: flex; align-items: center;">
                <span>🐾</span> <span class="menu-text">VetCare Pro</span>
            </div>
            <div id="sidebar-date" style="font-size: 11px; font-weight: normal; color: rgba(255, 255, 255, 0.85); padding-left: 32px;">
                📅 ${ngayHienTai}
            </div>
        </div>
        
        <li class="menu-item sub-item menu-pos-highlight" id="menu-pos" onclick="window.location.href='pos.html'">
            <span class="pos-icon">⚡</span> 
            <span class="menu-text" style="font-weight: bold;">BÁN HÀNG POS</span>
            <span class="pos-badge">HOT</span>
        </li>
        
        <ul class="menu-list">
            ${dynamicMenuContent}
        </ul>
    </div>

    <style>
        .sidebar { width: 275px !important; min-width: 275px !important; }
        .sidebar .menu-text, .sidebar .menu-category, .sidebar li { font-size: 14px !important; font-weight: 700 !important; }
        .sidebar .menu-category { font-size: 12px !important; font-weight: 800 !important; }
        .sidebar ul li { display: flex !important; align-items: center !important; white-space: nowrap !important; }
        .sidebar ul li span.menu-text { display: inline-block !important; visibility: visible !important; opacity: 1 !important; }
        .sidebar .menu-list > li > span:first-child, .sidebar .menu-pos-highlight .pos-icon, .submenu-container .menu-item span:first-child { display: inline-block; width: 24px; text-align: center; font-size: 16px !important; margin-right: 8px; flex-shrink: 0; }
        .menu-dropdown-toggle { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; cursor: pointer; color: #ffffff; font-weight: 800 !important; font-size: 13px !important; background: none !important; border: none !important; margin: 4px 8px; border-radius: 6px; transition: background 0.2s ease; user-select: none; }
        .menu-dropdown-toggle .menu-label-wrap { display: flex; align-items: center; white-space: nowrap; overflow: hidden; gap: 8px; }
        .menu-dropdown-toggle .group-icon { display: inline-block; width: 24px; text-align: center; font-size: 16px !important; flex-shrink: 0; }
        .menu-dropdown-toggle:hover { background: rgba(255, 255, 255, 0.1) !important; color: #ffffff; }
        .menu-dropdown-toggle .arrow { font-size: 10px; transition: transform 0.3s ease; flex-shrink: 0; margin-left: 6px; }
        .submenu-container { display: none; list-style: none; padding-left: 10px; margin: 0; }
        .submenu-container.open { display: block; }
        .menu-dropdown-toggle.active-parent .arrow { transform: rotate(180deg); }
        .menu-pos-highlight { background: linear-gradient(135deg, #2563eb, #1d4ed8) !important; color: #ffffff !important; border-radius: 6px; margin: 4px 8px; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3); cursor: pointer; transition: all 0.2s ease; }
        .menu-pos-highlight:hover { background: linear-gradient(135deg, #1d4ed8, #1e40af) !important; transform: translateY(-1px); }
        .menu-pos-highlight .pos-badge { background-color: #dc2626; color: white; font-size: 9px; padding: 2px 5px; border-radius: 4px; font-weight: bold; margin-left: auto; }
        .sidebar-header { font-size: 20px !important; font-weight: bold !important; padding: 15px 15px 10px 15px !important; }
        .sidebar-header span:first-child { font-size: 22px !important; margin-right: 8px; }
        .sidebar-header .menu-text { font-size: 26px !important; letter-spacing: 0.5px; }

        #notification-center-pc { position: fixed; top: 20px; right: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; max-width: 350px; width: 100%; pointer-events: none; }
        .notify-toast-pc { background: #ffffff; border-left: 5px solid #059669; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); padding: 12px 15px; border-radius: 6px; pointer-events: auto; display: flex; align-items: flex-start; justify-content: space-between; animation: slideInRight 0.3s ease-out forwards; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        #pcNotificationDropdown {
            display: none;
            position: absolute;
            top: 55px;
            right: 25px;
            width: 320px;
            max-height: 400px;
            overflow-y: auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            z-index: 99999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border: 1px solid #cbd5e1;
        }
    </style>`;

    const container = document.getElementById('menu-container');
    if (container) {
        container.innerHTML = menuHTML;
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

    // 2. THANH TOP NAVBAR PHÍA TRÊN
    const topnavContainer = document.getElementById('topnav-container');
    if (topnavContainer) {
        topnavContainer.innerHTML = `
            <div class="top-navbar" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 25px; background: #ffffff; border-bottom: 1px solid #e2e8f0; height: 55px; box-sizing: border-box; position: relative;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <button class="toggle-btn" onclick="toggleSidebar()" style="cursor: pointer; background: none; border: none; font-size: 18px;">☰</button>
                    <h2 style="margin: 0; font-size: 14px; font-weight: bold; color: #1e3a8a;">HỆ THỐNG QUẢN LÝ PHÒNG KHÁM THÚ Y</h2>
                </div>
                
                <div style="display: flex; align-items: center; gap: 14px; margin-right: 10px;">
                    <div id="headerBellBtnPC" style="position: relative; display: flex; align-items: center; cursor: pointer; padding: 5px;" title="Bấm để xem lịch sử thông báo">
                        <span style="font-size: 22px; color: #fbbf24; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">🔔</span>
                        <span id="navNotificationBadge" style="position: absolute; top: 0; right: 0; background: #dc2626; color: white; font-size: 10px; padding: 1px 5px; border-radius: 50%; display: none; font-weight: bold;">0</span>
                    </div>

                    <div class="search-container" style="position: relative; margin: 0;">
                        <input type="text" id="globalSearchInput" class="search-box" placeholder="🔍 Tìm tên KH, SĐT, thú cưng..." autocomplete="off" style="padding: 7px 12px; width: 220px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none;">
                        <div id="searchDropdown" class="search-dropdown"></div>
                    </div>
                    
                    <a href="../mobile/thucung.html" style="background-color: #0284c7; color: white; text-decoration: none; padding: 7px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 4px;">
                        📱 Giao diện Mobile
                    </a>

                    <button onclick="dangXuat()" style="background-color: #dc2626; color: white; border: none; padding: 7px 14px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        🚪 Đăng Xuất
                    </button>
                </div>
            </div>
        `;
    }

    if (!document.getElementById('globalAudioNotification')) {
        const audioTag = document.createElement('audio');
        audioTag.id = 'globalAudioNotification';
        audioTag.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
        audioTag.preload = 'auto';
        document.body.appendChild(audioTag);
    }

    if (!document.getElementById('notification-center-pc')) {
        const center = document.createElement('div');
        center.id = 'notification-center-pc';
        document.body.appendChild(center);
    }

    if (!document.getElementById('pcNotificationDropdown')) {
        const dropdown = document.createElement('div');
        dropdown.id = 'pcNotificationDropdown';
        dropdown.innerHTML = `
            <div style="background: #1e3a8a; color: white; padding: 10px 12px; font-weight: bold; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                <span>🔔 Lịch sử thông báo</span>
                <button onclick="xoaTatCaThongBaoPC()" style="background: none; border: none; color: #fbbf24; font-size: 11px; cursor: pointer;">Xóa tất cả</button>
            </div>
            <div id="pcNotificationList" style="padding: 0;">
                <div style="padding: 15px; text-align: center; color: #64748b; font-size: 12px;">Chưa có thông báo nào</div>
            </div>
        `;
        document.body.appendChild(dropdown);
    }

    const bellBtn = document.getElementById('headerBellBtnPC');
    const dropdown = document.getElementById('pcNotificationDropdown');
    if (bellBtn && dropdown) {
        bellBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const badge = document.getElementById('navNotificationBadge');
            if (badge) {
                badge.innerText = '0';
                badge.style.display = 'none';
            }
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    langNgheThongBaoRealtimePC();
});

function xuLyCoDuLieuMoiPC(noiDungThongBao) {
    const audio = document.getElementById('globalAudioNotification');
    if (audio) {
        audio.play().catch(error => console.log("Trình duyệt chặn autoplay:", error));
    }

    const center = document.getElementById('notification-center-pc');
    if (center) {
        const toast = document.createElement('div');
        toast.className = 'notify-toast-pc';
        toast.innerHTML = `
            <div style="font-size: 18px; margin-right: 10px;">🔔</div>
            <div style="flex: 1;">
                <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #1e293b;">Thông Báo Mới</h4>
                <p style="margin: 0; font-size: 12px; color: #64748b;">${noiDungThongBao}</p>
            </div>
            <button onclick="this.parentElement.remove()" style="background:none; border:none; font-size:16px; cursor:pointer; color:#94a3b8; padding-left:10px;">&times;</button>
        `;
        center.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    const badge = document.getElementById('navNotificationBadge');
    if (badge) {
        let count = parseInt(badge.innerText || '0') + 1;
        badge.innerText = count;
        badge.style.display = 'inline-block';
    }

    const listDiv = document.getElementById('pcNotificationList');
    if (listDiv) {
        if (listDiv.innerHTML.includes('Chưa có thông báo nào')) {
            listDiv.innerHTML = '';
        }
        const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const itemHtml = `
            <div style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; display: flex; justify-content: space-between; align-items: flex-start; background: #f8fafc;">
                <div>
                    <div style="font-weight: bold; color: #1e293b; margin-bottom: 2px;">${noiDungThongBao}</div>
                    <div style="font-size: 10px; color: #64748b;">${timeNow}</div>
                </div>
            </div>
        `;
        listDiv.innerHTML = itemHtml + listDiv.innerHTML;
    }
}

function xoaTatCaThongBaoPC() {
    const listDiv = document.getElementById('pcNotificationList');
    if (listDiv) {
        listDiv.innerHTML = `<div style="padding: 15px; text-align: center; color: #64748b; font-size: 12px;">Chưa có thông báo nào</div>`;
    }
    const badge = document.getElementById('navNotificationBadge');
    if (badge) {
        badge.innerText = '0';
        badge.style.display = 'none';
    }
}

function langNgheThongBaoRealtimePC() {
    setTimeout(() => {
        if (typeof db === 'undefined' || !db) return;

        try {
            if (!window._realtimePCSubscribed) {
                const channel = db.channel('realtime-vetcare-toan-bo-bang-v3');

                channel.on('postgres_changes', { event: 'INSERT', schema: 'public' }, payload => {
                    xuLySuKienRealtime('Thêm mới', payload);
                });

                channel.on('postgres_changes', { event: 'UPDATE', schema: 'public' }, payload => {
                    xuLySuKienRealtime('Cập nhật', payload);
                });

                channel.on('postgres_changes', { event: 'DELETE', schema: 'public' }, payload => {
                    xuLySuKienRealtime('Xóa', payload);
                });

                channel.subscribe();
                window._realtimePCSubscribed = true;
            }
        } catch (err) {
            console.error("Lỗi Realtime toàn cục:", err);
        }
    }, 1500);
}

function xuLySuKienRealtime(hanhDong, payload) {
    const tableName = payload.table.toLowerCase();
    const data = payload.new && Object.keys(payload.new).length > 0 ? payload.new : payload.old;
    
    let tenNhanVien = "Nhân viên";
    try {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (user) {
            tenNhanVien = user.tennhanvien || user.hovaten || user.name || "Nhân viên";
        }
    } catch (e) {}

    if (data.nguoi_xoa || data.nguoixoa || data.nhanvien || data.nguoi_tao || data.nguoithuchien || data.bacsi) {
        tenNhanVien = data.nguoi_xoa || data.nguoixoa || data.nhanvien || data.nguoi_tao || data.nguoithuchien || data.bacsi;
    }

    let tenDoiTuong = `dữ liệu [${payload.table}]`;

    switch (tableName) {
        case 'khachhang':
            tenDoiTuong = `khách hàng [${data.tenkhachhang || data.hovaten || ''}]`;
            break;
        case 'thucung':
            tenDoiTuong = `thú cưng [${data.tenthucung || data.ten || ''}]`;
            break;
        case 'lichhen':
            tenDoiTuong = `lịch hẹn của khách [${data.tenkhachhang || data.chunuoi || ''}]`;
            break;
        case 'khambenh':
            tenDoiTuong = `phiếu khám bệnh của thú cưng [${data.thucung || data.tenthucung || ''}]`;
            break;
        case 'phieuchidinh':
            tenDoiTuong = `phiếu chỉ định điều trị`;
            break;
        case 'donhang':
            tenDoiTuong = `đơn hàng (tổng tiền: ${Number(data.tongtien || data.thanhtien || 0).toLocaleString('vi-VN')} đ)`;
            break;
        case 'hoadonthuoc':
            tenDoiTuong = `hóa đơn/đơn thuốc`;
            break;
        case 'khothuoc':
            tenDoiTuong = `kho thuốc (sản phẩm: ${data.tenthuoc || data.ten_thuoc || ''})`;
            break;
        case 'khovaccine':
            tenDoiTuong = `kho vắc-xin (vắc-xin: ${data.tenvaccine || data.ten_vaccine || ''})`;
            break;
        case 'nhatkylamvaccine':
            tenDoiTuong = `nhật ký tiêm vắc-xin`;
            break;
        case 'nhatkynoitru':
            tenDoiTuong = `nhật ký nội trú`;
            break;
        case 'nhatkyspa':
            tenDoiTuong = `lượt spa của thú cưng [${data.thucung || data.chunuoi || ''}]`;
            break;
        case 'noitru':
            tenDoiTuong = `thông tin nội trú`;
            break;
        case 'user':
            tenDoiTuong = `tài khoản nhân viên [${data.tendangnhap || data.username || ''}]`;
            break;
    }

    let icon = "🔔";
    if (hanhDong === 'Thêm mới') icon = "➕";
    else if (hanhDong === 'Cập nhật') icon = "✏️";
    else if (hanhDong === 'Xóa') icon = "🗑️";

    const noiDung = `${icon} <b>${tenNhanVien}</b> vừa <b>${hanhDong.toLowerCase()}</b> ${tenDoiTuong}`;
    
    xuLyCoDuLieuMoiPC(noiDung);
}

function toggleSubmenu(element) {
    element.classList.toggle('active-parent');
    const submenu = element.nextElementSibling;
    if (submenu && submenu.classList.contains('submenu-container')) {
        submenu.classList.toggle('open');
    }
}

function dangXuat() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    }
}
