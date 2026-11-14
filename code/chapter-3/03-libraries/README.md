# Thư viện: thư viện chuẩn và trình quản lý gói

Mã chạy được của phần “Thư viện: thư viện chuẩn và trình quản lý gói”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`). Python 3.12 với gói `requests`.

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/sort_demo.c` | slide 5 | sắp xếp mười số bằng `qsort` của `stdlib.h` (K&R Appendix B5; Kernighan & Pike §2.3) |
| `run.sh` (`nm`, `objdump`) | slide 6 | `nm sort_demo.o`: `main`, `compare_ints` có mã trong tệp (T, t), `qsort`, `printf`, `putchar` chưa có (U); `objdump -p sort_demo.exe`: trên Windows (MinGW-w64 UCRT) `qsort` đến từ `api-ms-win-crt-utility-l1-1-0.dll`, nạp khi chạy (liên kết động); trên Linux từ `libc.so.6` |
| `run.sh` (`pip show`) | slide 7 | tên, phiên bản, mô tả và phụ thuộc của gói `requests`; bỏ dòng đường dẫn cài đặt và danh sách gói dùng nó trên máy biên soạn |
| `run.sh` (bỏ `#include <stdlib.h>`) | slide 8, câu hỏi 1 | GCC 13 cảnh báo implicit declaration of function 'qsort', mã thoát 0 |

Kết quả: `results/sort-demo.txt`, `results/pip-show.txt`, `results/no-header.txt`, chạy ngày 13/11/2026 (requests 2.34.2); `results/nm-symbols.txt`, chạy ngày 14/11/2026.
