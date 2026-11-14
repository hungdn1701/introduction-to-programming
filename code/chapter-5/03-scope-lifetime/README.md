# Hàm: truyền tham trị, phạm vi và thời gian sống của biến

Mã chạy được của phần “Hàm: truyền tham trị, phạm vi và thời gian sống của biến”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/swap_wrong.c` | slide 3, 5 | `swap(int x, int y)` /* WRONG */ của K&R §5.2: bên trong đổi được x, y; a, b của `main` vẫn 1, 2 (truyền tham trị, K&R §1.8) |
| `src/counter.c` | slide 4, 6 | biến cục bộ in 1, 1, 1; biến `static` in 1, 2, 3 (K&R §4.6) |
| `src/stars.c` | slide 7 | phạm vi: `main` và `print_stars_global` dùng chung biến toàn cục `i`, lời gọi đầu để `i` bằng 4 nên `main` in một hàng thay vì ba, GCC không cảnh báo; `print_stars_local` khai báo `i` trong vòng lặp nên in đủ ba hàng |
| `src/uninitialized.c` | slide 8 | biến cục bộ chưa khởi tạo: GCC `-Wall -O1` cảnh báo `'sum' is used uninitialized` (không có `-O1`, GCC 13 không phát hiện trường hợp này) |

Kết quả: `results/swap-wrong.txt`, `results/counter.txt`, `results/uninitialized.txt`, chạy ngày 13/11/2026; `results/stars.txt`, chạy ngày 14/11/2026.
