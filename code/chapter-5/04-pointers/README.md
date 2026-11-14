# Con trỏ: địa chỉ và truyền địa chỉ cho hàm

Mã chạy được của phần “Con trỏ: địa chỉ và truyền địa chỉ cho hàm”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/pointer.c` | slide 3, 5 | địa chỉ của `x`, giá trị của `px`, địa chỉ của `px` in bằng `%p`; `*px = 7` ghi vào `x` (K&R §5.1) |
| `src/swap.c` | slide 4, 6 | `swap(&a, &b)` đúng của K&R §5.2: 1 2 thành 2 1 |
| `src/min_max.c` | slide 6 | hai kết quả trả qua con trỏ: 7, 2, 9 cho min = 2, max = 9 |
| `src/no_ampersand.c` | slide 7 | `scanf("%d", n)` quên `&`: GCC cảnh báo; với `n = 0` không ghi được gì, với `n = 12345` (bản tạo bằng `sed` trong `run.sh`) chương trình bị dừng |
| `src/null_pointer.c` | slide 8 | ghi qua con trỏ `NULL`: Git Bash báo Segmentation fault (mã thoát 139), Windows báo 0xC0000005 |

Kết quả: `results/pointer.txt`, `results/swap.txt`, `results/min-max.txt`, `results/no-ampersand.txt`, `results/null-pointer.txt`, chạy ngày 13/11/2026. Địa chỉ in ra khác nhau mỗi lần chạy (hệ điều hành đặt chương trình ở vùng nhớ khác); hình `bien-con-tro` dùng địa chỉ của lần chạy ghi trong `results/pointer.txt` — chạy lại `run.sh` sẽ ghi đè tệp này bằng địa chỉ mới. GCC bản MinGW in cảnh báo thiếu `&` hai lần; `run.sh` bỏ dòng lặp bằng `uniq`.
