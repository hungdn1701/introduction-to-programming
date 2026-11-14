# Bài toán ứng dụng: quản lý kho hàng bằng mảng cấu trúc

Mã chạy được của phần “Bài toán ứng dụng: quản lý kho hàng bằng mảng cấu trúc”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/inventory.c` | slide 3–7 | cơ sở dữ liệu kho phụ tùng của King §16.3 (inventory.c) và `read_line` (§13.3); khác bản gốc: mảng và `num_parts` là biến cục bộ của `main`, truyền cho hàm qua tham số |
| `tests/inventory/1.in`, `1.out`, `2.in`, `2.out` | slide 5–7 | hai tệp kiểm thử; kết quả mong đợi đã kiểm tra bằng tay một lần (kiểm thử hồi quy) |
| `run.sh` (bỏ kiểm tra trùng mã) | slide 7 | tạo `out/inventory_nodup.c` bằng `awk`: `judge.sh` báo WA ở tệp 1 |

Chấm bằng `../v11-testing/judge.sh`. Kết quả: `results/session.txt` (phiên đầy đủ; `awk` đặt dòng đã nhập sau lời nhắc, như trên terminal), hai đoạn trích `results/session-insert.txt`, `results/session-print.txt` cho slide, `results/judge-inventory.txt`, chạy ngày 13/11/2026.
