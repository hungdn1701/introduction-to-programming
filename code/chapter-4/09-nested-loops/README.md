# Bài toán ứng dụng: in hình bằng vòng lặp lồng nhau

Mã chạy được của phần “Bài toán ứng dụng: in hình bằng vòng lặp lồng nhau”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/triangle_star.c` | slide 5 (góc) | tam giác vuông 5 hàng (bài tập vòng lặp của Deitel) |
| `src/pyramid.c` | slide 5 | kim tự tháp n hàng: n − i khoảng trắng, 2i − 1 dấu sao (biến thể Mario của CS50) |
| `src/multiplication.c` | slide 6 | bảng cửu chương 9 × 9, `%4d` |
| `src/pythagoras.c` | slide 7 | bộ ba Pythagore với c ≤ 20 bằng ba vòng lồng nhau (bài tập Pythagorean Triples của Deitel): b bắt đầu từ a, c từ b; 1540 lần thử, sáu bộ |
| `src/pyramid_trailing.c` | slide 8 | cùng kim tự tháp nhưng thêm khoảng trắng cuối dòng |
| `tests/pyramid/` | slide 8 | ba tệp kiểm thử n = 1, 4, 6 |

Chấm bằng `../v11-testing/judge.sh`. Kết quả: `results/triangle-star.txt`, `results/pyramid.txt`, `results/multiplication.txt`, `results/judge-pyramid.txt` (bản thêm khoảng trắng WA từ tệp 2), chạy ngày 13/11/2026; `results/pythagoras.txt`, chạy ngày 14/11/2026.
