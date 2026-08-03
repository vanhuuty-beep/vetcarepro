const CONFIG = {
    // Nó sẽ lấy giá trị từ Vercel, nếu không có thì lấy giá trị mặc định bên dưới[cite: 12]
    SUPABASE_URL: window.ENV_SUPABASE_URL || "URL_SUPABASE_MAC_DINH",
    SUPABASE_KEY: window.ENV_SUPABASE_KEY || "KEY_SUPABASE_MAC_DINH"
};

// Kiểm tra xem có phải đang chạy trên trang của Phùng Chữ không
const isFungChu = window.location.hostname.includes("fungchu");

// Cấu hình thông tin phòng khám tự động thay đổi theo tên miền
const CLINIC_INFO = isFungChu ? {
    ten: "PHÒNG KHÁM THÚ Y PHÙNG CHỮ",
    diachi: "Địa chỉ phòng khám Phùng Chữ",
    dienthoai: "Số điện thoại Phùng Chữ",
    slogan: "Hệ thống quản lý thú y Phùng Chữ"
} : {
    ten: "VETCARE PRO - PHÒNG KHÁM THÚ Y",[cite: 12]
    diachi: "Đà Nẵng",[cite: 12]
    dienthoai: "0935.xxx.xxx",[cite: 12]
    slogan: "Hệ thống quản lý thú y thông minh"[cite: 12]
};

// Hàm tự động bơm thông tin vào các khung in[cite: 12]
function capNhatThongTinIn() {
    const printHeaders = document.querySelectorAll('.print-header');
    printHeaders.forEach(header => {
        header.innerHTML = `
            <h2 style="font-size: 15px; margin: 0; color: #0284c7; font-weight: bold;">${CLINIC_INFO.ten}</h2>
            <p style="font-size: 10px; margin: 2px 0; color: #555;">Địa chỉ: ${CLINIC_INFO.diachi} | Điện thoại: ${CLINIC_INFO.dienthoai}</p>
        `;
    });
}

document.addEventListener("DOMContentLoaded", capNhatThongTinIn);[cite: 12]
window.addEventListener('beforeprint', capNhatThongTinIn);[cite: 12]
