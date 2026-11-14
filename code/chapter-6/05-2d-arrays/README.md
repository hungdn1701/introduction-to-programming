# Mảng hai chiều: khai báo, duyệt và lưu trữ theo hàng

Mã chạy được của phần “Mảng hai chiều: khai báo, duyệt và lưu trữ theo hàng”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/daytab.c` | slide 3, 5 | `day_of_year`, `month_day` với `daytab[2][13]` của K&R §5.7: 1/3/2024 là ngày 61, 1/3/2026 là ngày 60, ngày 256 của 2026 là 13/9 |
| `src/matrix_sum.c` | slide 6 | tổng theo hàng, theo cột của bảng điểm 4 × 3 |
| `src/row_major.c` | slide 4 | địa chỉ của các phần tử `int a[3][3]`: lưu trữ theo hàng |
| `src/magic.c` | slide 7 | hình vuông kỳ ảo của Dürer (Melencolia I, 1514): tổng bốn hàng, bốn cột và hai đường chéo `m[i][i]`, `m[i][N - 1 - i]` đều 34; đổi chỗ 3 và 2 ở hàng đầu thì cột thành 34 33 35 34 |
| `src/comma_bug.c` | slide 8 | `daytab[1, 2]`: GCC cảnh báo `left-hand operand of comma expression has no effect` và sai kiểu đối số của `%d` |

Kết quả: `results/daytab.txt`, `results/matrix-sum.txt`, `results/row-major.txt` (địa chỉ dùng cho hình `hang-bo-nho`), `results/comma-bug.txt`, chạy ngày 13/11/2026; `results/magic.txt`, chạy ngày 14/11/2026.
