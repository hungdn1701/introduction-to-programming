# Mảng một chiều: các bài toán với dãy số

Mã chạy được của phần “Mảng một chiều: các bài toán với dãy số”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/max_init.c` | slide 5 | `find_max` khởi tạo bằng `a[0]` trả −1 cho dãy nhiệt độ −3 −7 −1 −12; bản khởi tạo bằng 0 trả 0, giá trị không có trong dãy |
| `src/array_stats.c` | slide 3, 6 | hàm nhận mảng (King ch. 9): `find_max`, `average`, `linear_search`, `clear` với `const` khi chỉ đọc |
| `src/sieve.c` | slide 4, 7 | sàng Eratosthenes (Sedgewick §3.2): 25 số nguyên tố đến 100; với n = 100 000, 193 078 lần gạch so với 2 745 694 phép chia thử |
| `src/sizeof_param.c` | slide 8 | `sizeof(a)` bằng 20 trong `main`, 8 trong hàm; GCC cảnh báo `-Wsizeof-array-argument` |

Kết quả: `results/max-init.txt` (14/11/2026), `results/array-stats.txt`, `results/sieve.txt`, `results/sizeof-param.txt`, chạy ngày 13/11/2026.
