# Phần cứng: phân loại máy tính và kiến trúc von Neumann

Mã chạy được của phần “Phần cứng: phân loại máy tính và kiến trúc von Neumann”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** Windows 11, Windows PowerShell 5.1 (tệp `.ps1` chỉ dùng ký tự ASCII).

```powershell
powershell -ExecutionPolicy Bypass -File run.ps1
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `run.ps1` | slide 5 | đọc thông tin CPU, RAM, ổ lưu trữ, bàn phím, card màn hình bằng `Get-CimInstance`: mỗi khối của kiến trúc von Neumann trên một máy thật |

Kết quả: `results/hardware.txt`, chạy ngày 13/11/2026 trên máy biên soạn (Intel Core i5-8400H, 4 nhân, 8 bộ xử lý logic, 15,5 GB RAM). Máy khác cho kết quả khác.
