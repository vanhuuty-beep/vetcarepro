document.addEventListener("DOMContentLoaded", function() {
    // 1. Tạo thẻ audio phát âm thanh ẩn cho bản mobile
    if (!document.getElementById('globalAudioNotification')) {
        const audioTag = document.createElement('audio');
        audioTag.id = 'globalAudioNotification';
        audioTag.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
        audioTag.preload = 'auto';
        document.body.appendChild(audioTag);
    }

    // Vùng chứa Popup tự động ẩn trên mobile
    if (!document.getElementById('notification-center-mobile')) {
        const center = document.createElement('div');
        center.id = 'notification-center-mobile';
        center.style.cssText = `
            position: fixed;
            top: 15px;
            left: 15px;
            right: 15px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(center);
    }

    // 2. Tạo khung chứa danh sách lịch sử thông báo (Dropdown Popup khi bấm chuông)
    if (!document.getElementById('mobileNotificationDropdown')) {
        const dropdown = document.createElement('div');
        dropdown.id = 'mobileNotificationDropdown';
        dropdown.style.cssText = `
            display: none;
            position: absolute;
            top: 60px;
            right: 15px;
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            z-index: 99999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border: 1px solid #cbd5e1;
        `;
        dropdown.innerHTML = `
            <div style="background: #1e3a8a; color: white; padding: 10px 12px; font-weight: bold; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                <span>🔔 Lịch sử thông báo</span>
                <button onclick="xoaTatCaThongBaoMobile()" style="background: none; border: none; color: #fbbf24; font-size: 11px; cursor: pointer;">Xóa tất cả</button>
            </div>
            <div id="mobileNotificationList" style="padding: 0;">
                <div style="padding: 15px; text-align: center; color: #64748b; font-size: 12px;">Chưa có thông báo nào</div>
            </div>
        `;
        document.body.appendChild(dropdown);
    }

    // 3. Chèn icon chuông ngay cạnh nút Thoát trên header mobile
    if (!document.getElementById('headerBellBtnMobile')) {
        const bellContainer = document.createElement('div');
        bellContainer.id = 'headerBellBtnMobile';
        bellContainer.style.cssText = `
            position: relative;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            margin-left: 8px;
            vertical-align: middle;
        `;

        bellContainer.innerHTML = `
            <span style="font-size: 22px; color: #fbbf24; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">🔔</span>
            <span id="mobileNotificationBadge" style="position: absolute; top: -4px; right: -6px; background: #dc2626; color: white; font-size: 10px; padding: 1px 5px; border-radius: 50%; display: none; font-weight: bold;">0</span>
        `;
        
        bellContainer.addEventListener('click', function(e) {
            e.stopPropagation();
            const audio = document.getElementById('globalAudioNotification');
            if (audio) {
                audio.play().then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }).catch(e => console.log(e));
            }

            const badge = document.getElementById('mobileNotificationBadge');
            if (badge) {
                badge.innerText = '0';
                badge.style.display = 'none';
            }

            const dropdown = document.getElementById('mobileNotificationDropdown');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });

        const thoatBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.innerText.includes('Thoát') || el.innerText.includes('Đăng xuất'));
        if (thoatBtn && thoatBtn.parentElement) {
            thoatBtn.parentElement.insertBefore(bellContainer, thoatBtn);
        } else {
            bellContainer.style.cssText += `position: fixed; top: 12px; right: 15px; z-index: 9999;`;
            document.body.appendChild(bellContainer);
        }

        document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('mobileNotificationDropdown');
            if (dropdown && !dropdown.contains(e.target) && !bellContainer.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    // 4. Lắng nghe Realtime từ Supabase cho Mobile
    if (typeof db !== 'undefined' && db) {
        try {
            if (!window._realtimeMobileSubscribed) {
                db.channel('realtime-quet-thong-bao-mobile-v7')
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'khachhang' }, (payload) => {
                      const kh = payload.new;
                      const ten = kh.tenkhachhang || kh.hovaten || 'Khách mới';
                      xuLyCoDuLieuMoiMobile('khachhang', `👤 Khách hàng mới: ${ten}`);
                  })
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'donhang' }, (payload) => {
                      const dh = payload.new;
                      const tong = Number(dh.tongtien || dh.thanhtien || 0).toLocaleString('vi-VN');
                      xuLyCoDuLieuMoiMobile('donhang', `🛒 Đơn hàng mới: ${tong} đ`);
                  })
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'lichhen' }, (payload) => {
                      const lh = payload.new;
                      const ten = lh.tenkhachhang || lh.chunuoi || 'Khách';
                      xuLyCoDuLieuMoiMobile('lichhen', `📅 Lịch hẹn mới từ: ${ten}`);
                  })
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'nhatkyspa' }, (payload) => {
                      const sp = payload.new;
                      const ten = sp.chunuoi || 'Khách';
                      xuLyCoDuLieuMoiMobile('spa', `✂️ Lượt Spa mới: ${ten} (${sp.thucung || ''})`);
                  })
                  .subscribe();
                window._realtimeMobileSubscribed = true;
            }
        } catch (err) {
            console.error("Lỗi Realtime Mobile:", err);
        }
    }
});

function xuLyCoDuLieuMoiMobile(loai, noiDungThongBao) {
    const audio = document.getElementById('globalAudioNotification');
    if (audio) {
        audio.play().catch(error => console.log("Trình duyệt chặn autoplay mobile:", error));
    }

    // 1. Tự động hiện Popup nổi trên mobile trong 5 giây rồi tự tắt
    const center = document.getElementById('notification-center-mobile');
    if (center) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            background: #ffffff;
            border-left: 5px solid #059669;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            padding: 12px 15px;
            border-radius: 6px;
            pointer-events: auto;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        `;
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

    // 2. Tăng số đếm đỏ và lưu vào lịch sử chuông
    const badge = document.getElementById('mobileNotificationBadge');
    if (badge) {
        let count = parseInt(badge.innerText || '0') + 1;
        badge.innerText = count;
        badge.style.display = 'inline-block';
    }

    const listDiv = document.getElementById('mobileNotificationList');
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

    if (loai === 'khachhang' && typeof loadDanhSachKhachHang === 'function') {
        loadDanhSachKhachHang();
    } else if (loai === 'donhang' && typeof loadDanhSachDonHang === 'function') {
        loadDanhSachDonHang();
    } else if (loai === 'lichhen' && typeof loadDanhSachLichHen === 'function') {
        loadDanhSachLichHen();
    } else if (loai === 'spa' && typeof loadDanhSachNhatKy === 'function') {
        loadDanhSachNhatKy();
    }
}

function xoaTatCaThongBaoMobile() {
    const listDiv = document.getElementById('mobileNotificationList');
    if (listDiv) {
        listDiv.innerHTML = `<div style="padding: 15px; text-align: center; color: #64748b; font-size: 12px;">Chưa có thông báo nào</div>`;
    }
    const badge = document.getElementById('mobileNotificationBadge');
    if (badge) {
        badge.innerText = '0';
        badge.style.display = 'none';
    }
}
