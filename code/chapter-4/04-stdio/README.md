# Chương trình C: vào ra chuẩn với printf và scanf

Mã chạy được của phần “Chương trình C: vào ra chuẩn với printf và scanf”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/addfrac.c` | slide 5, 7 | cộng hai phân số theo King §3.2, thêm kiểm tra giá trị trả về của `scanf` |
| `input/good.txt`, `input/bad.txt` | slide 5, 7 | đầu vào chuyển hướng: `5/6` và `3/4`; `5 6` (sai định dạng) và `3/4` |
| `src/fraction_strict.c`, `src/fraction_loose.c` | slide 6 | khoảng trắng trong chuỗi định dạng (King §3.2): `"%d/%d"` đọc `5 / 6` trả về 1; `"%d /%d"` đọc cả `5/6` lẫn `5 / 6`, trả về 2 |
| `src/formats.c` | slide 4 | các đặc tả `%d`, `%5d`, `%-5d`, `%f`, `%.2f`, `%c` (bảng của hình `dinh-dang-printf`) |

Kết quả: `results/addfrac-good.txt` (38/24), `results/addfrac-bad.txt` (scanf đọc 1 và 1 giá trị, mã thoát 1), `results/formats.txt`, `results/no-ampersand.txt` (GCC cảnh báo khi bỏ `&`), chạy ngày 13/11/2026; `results/fraction-space.txt`, chạy ngày 14/11/2026.
