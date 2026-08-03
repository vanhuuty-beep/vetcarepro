function taoMenuMobile(trangHienTai) {
    // 1. Tự động chèn chuông thông báo vào góc phải header nếu chưa có
    if (!document.getElementById('badgeThongBao')) {
        const topHeader = document.querySelector('.top-header');
        if (topHeader) {
            const chuongWrapper = document.createElement('div');
            chuongWrapper.style.cssText = 'display: inline-flex; align-items: center; margin-left: auto; margin-right: 6px;';
            chuongWrapper.innerHTML = `
                <button onclick="moModalThongBao()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 8px; border-radius: 4px; font-size: 14px; cursor: pointer; position: relative;">
                    🔔
                    <span id="badgeThongBao" style="position: absolute; top: -4px; right: -4px; background: #ef4444; color: white; font-size: 9px; padding: 1px 4px; border-radius: 10px; font-weight: bold; display: none;">0</span>
                </button>
            `;
            
            const btnThoat = topHeader.querySelector('button[onclick*="dangXuatMobile"]') || topHeader.lastElementChild;
            if (btnThoat) {
                topHeader.insertBefore(chuongWrapper, btnThoat);
            } else {
                topHeader.appendChild(chuongWrapper);
            }
        }

        // Thêm Modal thông báo vào cuối body
        const modalThongBaoHtml = `
            <div id="modalThongBao" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10001; justify-content: center; align-items: center;">
                <div class="modal-content" style="background: #fff; width: 90%; max-width: 380px; padding: 15px; border-radius: 8px;">
                    <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
                        <h4 style="margin: 0; font-size: 14px;">🔔 Thông báo mới nhất</h4>
                        <button class="btn-close" onclick="dongModalThongBao()" style="background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
                    </div>
                    <div id="danhSachThongBaoContainer" style="max-height: 250px; overflow-y: auto; font-size: 11px; margin-bottom: 10px;">
                        <div style="text-align: center; color: #777; padding: 15px;">Chưa có thông báo nào.</div>
                    </div>
                    <div class="modal-footer" style="text-align: right;">
                        <button type="button" class="btn-cancel" onclick="danhDauDaDoc()" style="padding: 5px 10px; font-size: 11px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">Đã đọc</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalThongBaoHtml);

        khoiChayHeThongThongBao();
    }

    // 2. GIỮ NGUYÊN 100% MENU GỐC CỦA BẠN
    const menuHTML = `
        <style>
            .mobile-bottom-nav {
                position: fixed;
                bottom: 0; 
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                max-width: 480px;
                height: 60px;
                background: #ffffff;
                box-shadow: 0 -4px 15px rgba(0,0,0,0.08);
                display: flex;
                justify-content: space-around;
                align-items: center;
                z-index: 9999;
                border-top: 1px solid #e2e8f0;
                box-sizing: border-box;
                border-top-left-radius: 16px;
                border-top-right-radius: 16px;
            }
            .mobile-bottom-nav a, .mobile-bottom-nav .nav-btn-more {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                color: #64748b;
                font-size: 10px;
                font-weight: 500;
                background: none;
                border: none;
                cursor: pointer;
                flex: 1;
                padding: 0;
            }
            .mobile-bottom-nav a span, .mobile-bottom-nav .nav-btn-more span { font-size: 26px; margin-bottom: 2px; }
            
            .mobile-bottom-nav a.active { color: #0284c7; font-weight: bold; }
            .mobile-bottom-nav a:hover, .mobile-bottom-nav .nav-btn-more:hover { color: #0284c7; }
            
            .more-menu-overlay {
                display: none;
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.4);
                z-index: 10000;
                align-items: flex-end;
                justify-content: center;
            }
            .more-menu-content {
                background: #ffffff;
                width: 100%;
                max-width: 480px;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                padding: 15px;
                box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
                animation: slideUp 0.25s ease-out;
            }
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            .more-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-top: 10px;
            }
            .more-item {
                background: #f1f5f9;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 12px 8px;
                text-align: center;
                text-decoration: none;
                color: #334155;
                font-size: 11px;
                font-weight: bold;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            .more-item span { font-size: 26px; }
            .more-item:active { background: #e2e8f0; }

            body { padding-bottom: 75px !important; }
        </style>

        <div class="mobile-bottom-nav">
            <a href="khachhang.html" class="${trangHienTai === 'khachhang' ? 'active' : ''}">
                <span>👤</span>Khách
            </a>
            <a href="thucung.html" class="${trangHienTai === 'thucung' ? 'active' : ''}">
                <span>🐾</span>Pet
            </a>
            <a href="khambenh.html" class="${trangHienTai === 'khambenh' ? 'active' : ''}">
                <span>🏥</span>Khám
            </a>
            <a href="chidinh.html" class="${trangHienTai === 'chidinh' ? 'active' : ''}">
                <span>📋</span>Chỉ định
            </a>
            <a href="lichhen.html" class="${trangHienTai === 'lichhen' ? 'active' : ''}">
                <span>📅</span>Lịch hẹn
            </a>
            <a href="pos.html" class="${trangHienTai === 'pos' ? 'active' : ''}">
                <span>🪙</span>POS
            </a>
            <button type="button" class="nav-btn-more" onclick="toggleMoreMenu()">
                <span>📂</span>Thêm
            </button>
        </div>

        <div id="moreMenuModal" class="more-menu-overlay" onclick="dongMoreMenuNgoai(event)">
            <div class="more-menu-content">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                    <span style="font-weight: bold; font-size: 13px; color: #1e293b;">⚡ Tiện ích mở rộng</span>
                    <button type="button" onclick="toggleMoreMenu()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #64748b;">&times;</button>
                </div>
                <div class="more-grid">
                    <a href="nhatkyvaccine.html" class="more-item">
                        <span>💉</span>Tiêm VX
                    </a>
                    <a href="danhmucsanpham.html" class="more-item">
                        <span>📦</span>Thêm sản phẩm
                    </a>
					<a href="noitru.html" class="more-item">
                        <span>🏨</span>Nội trú
                    </a>
					<a href="lichtrinh.html" class="more-item">
                        <span>🏨</span>Lịch trình
                    </a>
					<a href="donhang.html" class="more-item">
                        <span>🏨</span>Đơn hàng
                    </a>
                    <a href="../thongke.html" class="more-item">
                        <span>💻</span>Desktop
                    </a>
                </div>
            </div>
        </div>
    `;
    
    if (!document.querySelector('.mobile-bottom-nav')) {
        document.body.insertAdjacentHTML('beforeend', menuHTML);
    }
}

function toggleMoreMenu() {
    const modal = document.getElementById('moreMenuModal');
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

function dongMoreMenuNgoai(event) {
    if (event.target.id === 'moreMenuModal') {
        toggleMoreMenu();
    }
}

// --- LOGIC HỆ THỐNG THÔNG BÁO TỰ ĐỘNG ---
async function khoiChayHeThongThongBao() {
    await kiemTraThongBaoMoi();
    setInterval(kiemTraThongBaoMoi, 30000);
}

async function kiemTraThongBaoMoi() {
    if (typeof db === 'undefined' || !db) return;

    try {
        const [donHangRes, lichHenRes] = await Promise.all([
            db.from('donhang').select('*').order('id', { ascending: false }).limit(5),
            db.from('lichhen').select('*').order('id', { ascending: false }).limit(5)
        ]);

        let thongBaoList = [];

        if (donHangRes.data) {
            donHangRes.data.forEach(dh => {
                thongBaoList.push({
                    tieuDe: '🛒 Đơn hàng mới #' + String(dh.id).padStart(4, '0'),
                    noiDung: `${dh.tenkhachhang || 'Khách lẻ'} đã đặt ${dh.tensanpham || 'sản phẩm'} (SL: ${dh.soluongban || 1})`,
                    thoiGian: dh.ngayban || new Date().toISOString()
                });
            });
        }

        if (lichHenRes.data) {
            lichHenRes.data.forEach(lh => {
                thongBaoList.push({
                    tieuDe: '📅 Lịch hẹn mới',
                    noiDung: `${lh.tenkhachhang || lh.hoten || 'Khách hàng'} hẹn lúc ${lh.thoigian || lh.ngayhen || '---'}`,
                    thoiGian: lh.created_at || new Date().toISOString()
                });
            });
        }

        const badge = document.getElementById('badgeThongBao');
        if (badge && thongBaoList.length > 0) {
            badge.innerText = thongBaoList.length;
            badge.style.display = 'inline-block';
        } else if (badge) {
            badge.style.display = 'none';
        }

        window._danhSachThongBaoCache = thongBaoList;
    } catch (e) {
        console.error('Lỗi tải thông báo:', e);
    }
}

function moModalThongBao() {
    const container = document.getElementById('danhSachThongBaoContainer');
    const thongBaoList = window._danhSachThongBaoCache || [];

    if (!container) return;

    if (thongBaoList.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: #777; padding: 15px;">Không có thông báo mới.</div>`;
    } else {
        container.innerHTML = '';
        thongBaoList.forEach(tb => {
            container.innerHTML += `
                <div style="background: #f8fafc; border-left: 3px solid #0284c7; padding: 8px; margin-bottom: 6px; border-radius: 4px;">
                    <div style="font-weight: bold; color: #1e293b; margin-bottom: 2px;">${tb.tieuDe}</div>
                    <div style="color: #475569; margin-bottom: 2px;">${tb.noiDung}</div>
                    <div style="font-size: 9px; color: #94a3b8;">🕒 ${new Date(tb.thoiGian).toLocaleString('vi-VN')}</div>
                </div>
            `;
        });
    }

    const modal = document.getElementById('modalThongBao');
    if (modal) modal.style.display = 'flex';
}

function dongModalThongBao() {
    const modal = document.getElementById('modalThongBao');
    if (modal) modal.style.display = 'none';
}

function danhDauDaDoc() {
    const badge = document.getElementById('badgeThongBao');
    if (badge) badge.style.display = 'none';
    dongModalThongBao();
}
