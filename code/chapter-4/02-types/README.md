# Chương trình C: biến, kiểu dữ liệu và kích thước

Mã chạy được của phần “Chương trình C: biến, kiểu dữ liệu và kích thước”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/temperature.c` | slide 4 | đổi 100 độ F: `5 / 9` bằng 0 với số nguyên, `5.0 / 9.0` cho 37.777778 (K&R §1.2) |
| `src/divide_last.c` | slide 5 | nhân trước, chia sau cùng như bản đầu của K&R §1.2: `5 * (fahr - 32) / 9` cho 37 với 100 °F và −17 với 0 °F (chia nguyên bỏ phần lẻ về phía 0 từ C99, C17 §6.5.5) |
| `src/sizes.c` | slide 6 | `sizeof` của char, int, double; `INT_MIN`, `INT_MAX` của `limits.h`. Kích thước lưu vào biến `int` rồi in bằng `%d`: GCC bản MinGW cảnh báo nhầm `unknown conversion type character 'z'` với `%zu` trên Windows |
| `src/overflow.c` | slide 7 | `50000 * 50000` tràn `int` (CS:APP ch. 2): GCC cảnh báo `-Woverflow`, chạy in −1794967296; `long long` cho 2500000000. Tràn số nguyên có dấu là hành vi không xác định |

Kết quả: `results/temperature.txt`, `results/sizes.txt`, `results/overflow.txt`, chạy ngày 13/11/2026; `results/divide_last.txt`, chạy ngày 14/11/2026.
