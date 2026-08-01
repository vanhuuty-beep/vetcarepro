function taoMenuMobile(trangHienTai) {
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
            /* Tăng kích thước icon menu chính lên 26px cho rõ và bắt mắt hơn */
            .mobile-bottom-nav a span, .mobile-bottom-nav .nav-btn-more span { font-size: 26px; margin-bottom: 2px; }
            
            /* Tông xám kết hợp hiệu ứng da trời nhẹ khi active */
            .mobile-bottom-nav a.active { color: #0284c7; font-weight: bold; }
            .mobile-bottom-nav a:hover, .mobile-bottom-nav .nav-btn-more:hover { color: #0284c7; }
            
            /* CSS Popup Menu Thêm */
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

            /* Đẩy nội dung lên trên để không bị thanh menu che mất */
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

        <!-- POPUP MENU MỞ RỘNG (THÊM) -->
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
                    <a href="../thongke.html" class="more-item">
                        <span>💻</span>Desktop
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', menuHTML);
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