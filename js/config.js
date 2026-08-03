// Tự động nhận diện tên miền để gán đúng thông tin và Database của Matpet hoặc Vetcare
const isMatpet = window.location.hostname.includes("matpet");

const CONFIG = {
    SUPABASE_URL: isMatpet 
        ? "https://aykhvqrogmxzexhrzynv.supabase.co" 
        : (window.ENV_SUPABASE_URL || "https://glbbycylllulafzrzfcz.supabase.co"),
        
    SUPABASE_KEY: isMatpet 
        ? "sb_publishable_ZztHGsSnkrH36JXVq5W3DQ_jcrj1trx" 
        : (window.ENV_SUPABASE_KEY || "sb_publishable_-T8VmENvk62ZD2Ao4hJa1g_mC29Zftk"),
};

// Cấu hình thông tin phòng khám tự động đổi theo tên miền
const CLINIC_INFO = isMatpet ? {
    ten: "PHÒNG KHÁM THÚ Y MATPET",
    diachi: "Địa chỉ phòng khám Matpet",
    dienthoai: "Số điện thoại Matpet",
    slogan: "Hệ thống quản lý thú y Matpet"
} : {
    ten: "VETCARE PRO - PHÒNG KHÁM THÚ Y",
    diachi: "Đà Nẵng",
    dienthoai: "0935.xxx.xxx",
    slogan: "Hệ thống quản lý thú y thông minh"
};

// Hàm tự động bơm thông tin vào các khung in và tiêu đề trang
function capNhatThongTinIn() {
    // Đổi tiêu đề trang web
    document.title = CLINIC_INFO.ten;
    
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
