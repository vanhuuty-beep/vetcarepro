function taoMenuMobile(trangHienTai) {
    const menuHTML = `
        <style>
            .mobile-bottom-nav {
                position: fixed;
                bottom: 0; 
                /* Căn giữa và giới hạn độ rộng tối đa khớp với mobile-container */
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                max-width: 480px;
                height: 55px;
                background: #ffffff;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                display: flex;
                justify-content: space-around;
                align-items: center;
                z-index: 9999;
                border-top: 1px solid #e2e8f0;
                box-sizing: border-box;
            }
            .mobile-bottom-nav a {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                color: #64748b;
                font-size: 10px;
                font-weight: 500;
            }
            .mobile-bottom-nav a span { font-size: 18px; margin-bottom: 2px; }
            .mobile-bottom-nav a.active { color: #2563eb; font-weight: bold; }
            
            /* Đẩy nội dung lên trên để không bị thanh menu che mất */
            body { padding-bottom: 70px !important; }
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
			<a href="pos.html" class="${trangHienTai === 'pos' ? 'active' : ''}">
                <span>🪙</span>POS
            </a>
            <a href="../thongke.html">
                <span>💻</span>Desktop
            </a>
        </div>
    `;
    
    // Tự động gắn menu vào cuối thẻ body khi tải trang
    document.body.insertAdjacentHTML('beforeend', menuHTML);
}