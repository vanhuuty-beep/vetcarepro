document.addEventListener("DOMContentLoaded", function() {
    // 1. Tạo thẻ audio phát âm thanh ẩn cho bản mobile
    if (!document.getElementById('globalAudioNotification')) {
        const audioTag = document.createElement('audio');
        audioTag.id = 'globalAudioNotification';
        audioTag.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
        audioTag.preload = 'auto';
        document.body.appendChild(audioTag);
    }

    // 2. Chèn icon chuông màu vàng nổi bật lên thanh header mobile
    const topHeader = document.querySelector('.top-header') || document.querySelector('header');
    if (topHeader && !document.getElementById('headerBellBtnMobile')) {
        const bellSpan = document.createElement('span');
        bellSpan.id = 'headerBellBtnMobile';
        bellSpan.innerHTML = '🔔';
        bellSpan.title = 'Bấm để kích hoạt chuông báo';
        bellSpan.style.cssText = `
            background: #1e3a8a;
            color: #fbbf24;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            cursor: pointer;
            margin-left: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
            vertical-align: middle;
        `;
        
        // Bấm vào chuông lần đầu để mở khóa âm thanh trên trình duyệt di động
        bellSpan.addEventListener('click', function() {
            const audio = document.getElementById('globalAudioNotification');
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
                alert("🔊 Đã bật âm thanh thông báo trên Mobile thành công!");
            }).catch(e => console.log(e));
        });

        topHeader.appendChild(bellSpan);
    }

    // 3. Cấu hình khung chứa có sẵn thanh trượt (Scroll) cho mobile
    const listContainers = ['#danhSachKhachHangContainer', '#danhSachSpaContainer', '#danhSachDonHangContainer', '#danhSachLichHenContainer', '.mobile-container'];
    listContainers.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            el.style.overflowY = 'auto';
        }
    });

    // 4. Kích hoạt quét thời gian thực (Realtime) từ Supabase cho Mobile (Khách hàng, Đơn hàng, Lịch hẹn, Spa)
    if (typeof db !== 'undefined' && db) {
        try {
            if (!window._realtimeMobileSubscribed) {
                db.channel('realtime-quet-thong-bao-mobile-v3')
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'khachhang' }, (payload) => {
                      xuLyCoDuLieuMoiMobile('khachhang');
                  })
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'donhang' }, (payload) => {
                      xuLyCoDuLieuMoiMobile('donhang');
                  })
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'lichhen' }, (payload) => {
                      xuLyCoDuLieuMoiMobile('lichhen');
                  })
                  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'nhatkyspa' }, (payload) => {
                      xuLyCoDuLieuMoiMobile('spa');
                  })
                  .subscribe();
                window._realtimeMobileSubscribed = true;
            }
        } catch (err) {
            console.error("Lỗi Realtime Mobile:", err);
        }
    }
});

function xuLyCoDuLieuMoiMobile(loai) {
    // Phát âm thanh chuông báo
    const audio = document.getElementById('globalAudioNotification');
    if (audio) {
        audio.play().catch(error => console.log("Trình duyệt chặn autoplay mobile:", error));
    }

    // Tự động gọi lại hàm tải dữ liệu tương ứng trên mobile
    if (loai === 'khachhang' && typeof loadDanhSachKhachHang === 'function') {
        loadDanhSachKhachHang();
    } else if (loai === 'donhang' && typeof loadDanhSachDonHang === 'function') {
        loadDanhSachDonHang();
    } else if (loai === 'lichhen' && typeof loadDanhSachLichHen === 'function') {
        loadDanhSachLichHen();
    } else if (loai === 'spa' && typeof loadDanhSachNhatKy === 'function') {
        loadDanhSachNhatKy();
    }

    // Tự động cuộn khung danh sách lên trên cùng để thấy dữ liệu mới ngay lập tức
    setTimeout(() => {
        const activeList = document.querySelector('#danhSachKhachHangContainer') || document.querySelector('#danhSachSpaContainer') || document.querySelector('#danhSachDonHangContainer') || document.querySelector('#danhSachLichHenContainer');
        if (activeList) {
            activeList.scrollTop = 0;
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 400);
}