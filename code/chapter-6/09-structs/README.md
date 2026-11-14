# Cấu trúc: struct, thành viên và typedef

Mã chạy được của phần “Cấu trúc: struct, thành viên và typedef”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/point.c` | slide 3–6 | `struct point`, `struct rect`, `makepoint`, `addpoint`, `ptinrect` của K&R §6.1–6.2, `typedef` (K&R §6.7); `move_copy` (bản sao) và `move` (con trỏ, `->`) |
| `src/label.c`, `src/array_assign.c` | slide 7 | gán cấu trúc chép mọi thành viên, kể cả mảng `char text[16]` (King §16.2); gán hai mảng bằng `=` thì lỗi `assignment to expression with array type` |
| `src/struct_eq.c` | slide 8 | so sánh hai cấu trúc bằng `==`: lỗi `invalid operands to binary ==` |

Kết quả: `results/point.txt`, `results/struct-eq.txt`, chạy ngày 13/11/2026; `results/label.txt`, chạy ngày 14/11/2026.
