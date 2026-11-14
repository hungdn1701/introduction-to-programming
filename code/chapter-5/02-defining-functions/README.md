# Hàm: tự định nghĩa hàm tính toán, hàm kiểm tra và hàm void

Mã chạy được của phần “Hàm: tự định nghĩa hàm tính toán, hàm kiểm tra và hàm void”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/power.c` | slide 3, 5 | hàm `power` của K&R §1.7: nguyên mẫu trước `main`, bảng lũy thừa của 2 và −3 |
| `src/prime.c` | slide 6 | hàm kiểm tra `is_prime` (bool) và hàm void `print_line`, theo King §9.1 |
| `src/goldbach.c` | slide 7 | dùng lại `is_prime` (định nghĩa chép từ `prime.c`; dùng chung giữa nhiều tệp là chủ đề Mở rộng): phân tích Goldbach của 28 (2 cách) và 100 (6 cách) |
| `src/no_return.c` | slide 8 | nhánh thiếu `return`: GCC `-Wall` cảnh báo `control reaches end of non-void function` |

Kết quả: `results/power.txt`, `results/prime.txt` (97 là số nguyên tố, 91 thì không), `results/no-return.txt`, chạy ngày 13/11/2026; `results/goldbach.txt`, chạy ngày 14/11/2026.
