# Mảng một chiều: sắp xếp chèn và sắp xếp chọn

Mã chạy được của phần “Mảng một chiều: sắp xếp chèn và sắp xếp chọn”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/sorts.c` | slide 3–5, 7 | sắp xếp chèn (CLRS §2.1) và sắp xếp chọn (Sedgewick ch. 6) trên 5 2 4 6 1 3, in mảng sau từng lượt |
| `src/sorted_uses.c` | slide 6 | ứng dụng của mảng đã sắp xếp (Sedgewick & Wayne §2.5): chín điểm 7 9 4 10 6 7 9 5 7 sau khi sắp xếp cho sáu giá trị khác nhau (một lượt so với phần tử trước) và trung vị 7 |
| `src/count.c` | slide 7 | đếm phép so sánh với n = 1 000, 10 000 số ngẫu nhiên (hạt giống 2026) và với mảng đã sắp xếp |
| `src/sort_time.c` | slide 8 | đo thời gian sắp xếp chèn với 10 000 đến 80 000 số và `qsort` với 1 000 000 số (biên dịch `-O2`) |

Kết quả: `results/sorts.txt`, `results/count.txt`, `results/sort-time.txt` (thời gian phụ thuộc máy), chạy ngày 13/11/2026; `results/sorted-uses.txt`, chạy ngày 14/11/2026. `rand` của MinGW-w64 có `RAND_MAX` = 32767; trên Linux dãy số khác nên số phép so sánh của sắp xếp chèn hơi khác, sắp xếp chọn thì không đổi.
