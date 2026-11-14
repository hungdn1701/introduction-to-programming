# Đệ quy: trường hợp cơ sở và ngăn xếp lời gọi

Mã chạy được của phần “Đệ quy: trường hợp cơ sở và ngăn xếp lời gọi”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/factorial.c` | slide 3, 5 | giai thừa đệ quy (Sedgewick, ch. 5): bảng 0! đến 10!; tham số `trace` in vết lời gọi, lần trả về theo độ sâu |
| `src/hanoi.c` | slide 4, 6 | tháp Hà Nội (Lucas, 1883): in các bước khi n ≤ 4, đếm số bước: 7, 1023, 1048575 với n = 3, 10, 20 |
| `src/no_base_case.c` | slide 7 | thiếu trường hợp cơ sở: GCC cảnh báo `-Winfinite-recursion`; chạy thì tràn ngăn xếp, Windows báo 0xC00000FD (STATUS_STACK_OVERFLOW) |

Kết quả: `results/factorial.txt`, `results/factorial-trace.txt`, `results/hanoi.txt`, `results/no-base-case.txt`, chạy ngày 13/11/2026. `run.sh` gọi PowerShell để đọc mã thoát của Windows; trên Linux, macOS bỏ dòng đó và chạy `./out/no_base_case`, hệ điều hành báo Segmentation fault.
