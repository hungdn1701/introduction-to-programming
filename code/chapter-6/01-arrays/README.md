# Mảng một chiều: khai báo, chỉ số và duyệt mảng

Mã chạy được của phần “Mảng một chiều: khai báo, chỉ số và duyệt mảng”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/reverse.c` | slide 6 | đọc mười số, in ngược (King §8.1, reverse.c), kiểm tra giá trị trả về của `scanf` |
| `src/repdigit.c` | slide 7 | mảng đếm `digit_seen[10]` kiểm tra chữ số lặp (King §8.1, repdigit.c): 28212, 2026 có, 1357 không |
| `src/out_of_bounds.c` | slide 3, 8 | vòng `i <= N` ghi `a[10]`: biên dịch không tối ưu thì GCC im lặng, chạy thì biến `before` nằm ngay sau `a[9]` thành 0; biên dịch `-O2` thì GCC cảnh báo `iteration 10 invokes undefined behavior` |

Kết quả: `results/reverse.txt`, `results/repdigit.txt`, `results/out-of-bounds.txt` (địa chỉ dùng cho hình `mang-bo-nho`; chạy lại sẽ ra địa chỉ khác), chạy ngày 13/11/2026.
