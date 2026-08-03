const CONFIG = {
    SUPABASE_URL: window.ENV_SUPABASE_URL || "https://glbbycylllulafzrzfcz.supabase.co",
    SUPABASE_KEY: window.ENV_SUPABASE_KEY || "sb_publishable_-T8VmENvk62ZD2Ao4hJa1g_mC29Zftk",
    get SUPABASE_ANON_KEY() { return this.SUPABASE_KEY; }
};

// Danh sách thông tin các phòng khám theo tên miền truy cập
const DANH_SACH_PHONG_KHAM = {
    "matpet.vercel.app": {
        ten: "PHÒNG KHÁM THÚ Y MATPET",
        diachi: "Địa chỉ phòng khám Matpet",
        dienthoai: "Số điện thoại Matpet",
        slogan: "Hệ thống quản lý thú y Matpet"
    },
    "vetcare.vn": {
        ten: "VETCARE PRO - PHÒNG KHÁM THÚ Y",
        diachi: "Đà Nẵng",
        dienthoai: "0935.xxx.xxx",
        slogan: "Hệ thống quản lý thú y thông minh"
    }
};

// Tự động nhận diện phòng khám dựa vào tên miền hiện tại
const hostname = window.location.hostname;
const CLINIC_INFO = DANH_SACH_PHONG_KHAM[hostname] || DANH_SACH_PHONG_KHAM["vetcare.vn"];

// Hàm tự động bơm thông tin vào các khung in
function capNhatThongTinIn() {
    const printHeaders = document.querySelectorAll('.print-header');
    printHeaders.forEach(header => {
        header.innerHTML = `
            <h2 style="font-size: 15px; margin: 0; color: #0284c7; font-weight: bold;">${CLINIC_INFO.ten}</h2>
            <p style="font-size: 10px; margin: 2px 0; color: #555;">Địa chỉ: ${CLINIC_INFO.diachi} | Điện thoại: ${CLINIC_INFO.dienthoai}</p>
        `;
    });
}

document.addEventListener("DOMContentLoaded", capNhatThongTinIn);
window.addEventListener('beforeprint', capNhatThongTinIn);
