# Dữ liệu: hệ đếm và biểu diễn dữ liệu trong máy tính

Mã chạy được của phần “Dữ liệu: hệ đếm và biểu diễn dữ liệu trong máy tính”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** Windows 11, Windows PowerShell 5.1 (tệp `.ps1` chỉ dùng ký tự ASCII).

```powershell
powershell -ExecutionPolicy Bypass -File run.ps1
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `run.ps1` (`[Convert]::ToString`) | slide 5 | đổi 2026 sang cơ số 2, 16; 0x41 sang cơ số 10; 255 sang cơ số 2 |
| `run.ps1` (`Format-Hex`) | slide 6 | ghi chuỗi Hà Nội theo UTF-8 vào `out/hanoi.txt`, xem 9 byte |
| `run.ps1` (Windows-1252) | slide 7 | đọc cùng 9 byte theo bảng mã Windows-1252, ra chuỗi lỗi |

Kết quả: `results/bases.txt`, `results/hanoi-hex.txt`, `results/hanoi-wrong.txt`. Chữ có dấu trong tệp `.ps1` được dựng từ code point (U+00E0, U+1ED9) để tệp chỉ có ký tự ASCII.
