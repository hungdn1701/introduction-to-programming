# Vòng lặp: câu lệnh while và for

Mã chạy được của phần “Vòng lặp: câu lệnh while và for”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/fahr_while.c`, `src/fahr_for.c` | slide 3–5 | bảng nhiệt độ của K&R §1.2–1.3 (bản `for` khai báo biến trong phần khởi tạo, theo C99+) |
| `src/gcd.c` | slide 6 | thuật toán Euclid bằng `while` (Knuth §1.1), đọc 1071 462 in 21 |
| `src/collatz.c` | slide 7 | bài toán 3n + 1 của Collatz bằng `while`: 6 cần 8 lần lặp, 27 cần 111 lần (đỉnh 9232), 28 cần 18 lần; chưa ai chứng minh vòng lặp dừng với mọi n (Lagarias, The 3x + 1 Problem, 2010) |
| `src/off_by_one.c` | slide 8 | `i = 1; i < 10` chạy 9 lần; `i = 0; i < 10` chạy 10 lần |

Kết quả: `results/fahr-while.txt`, `results/fahr-for.txt` (giống từng dòng), `results/gcd.txt`, `results/off-by-one.txt`, chạy ngày 13/11/2026; `results/collatz.txt`, chạy ngày 14/11/2026.
