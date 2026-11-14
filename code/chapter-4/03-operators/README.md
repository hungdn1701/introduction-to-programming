# Chương trình C: toán tử và biểu thức

Mã chạy được của phần “Chương trình C: toán tử và biểu thức”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/leap.c` | slide 5 | biểu thức năm nhuận của K&R §2.5 với 1900, 2000, 2024, 2026, 2100 (vòng `for`, mảng được giảng ở các phần sau) |
| `src/digits.c` | slide 6 | `/` và `%` tách chữ số; `7 / 2 * 2`; `+=`, `++` |
| `src/assign_bug.c` | slide 7 | `if (year = 2000)`: GCC `-Wall` cảnh báo `-Wparentheses`, nhánh luôn chạy |

Kết quả: `results/leap.txt`, `results/digits.txt`, `results/assign-bug.txt`, chạy ngày 13/11/2026.
