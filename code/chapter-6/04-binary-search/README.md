# Mảng một chiều: tìm kiếm nhị phân

Mã chạy được của phần “Mảng một chiều: tìm kiếm nhị phân”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/binsearch.c` | slide 3, 5, 6 | `binsearch` theo K&R §3.3 với `mid = low + (high - low) / 2`; vết khi tìm 23; chín ca kiểm thử; so với tìm kiếm tuần tự trên 1 000 000 phần tử |
| `src/binsearch_stuck.c` | slide 7 | đổi `low = mid + 1` thành `low = mid`: bất biến vẫn đúng nhưng đoạn có thể không ngắn đi; giới hạn 100 lượt cho thấy 4/9 ca không dừng (x = 23, 99, 24, 100), 5 ca vẫn đúng |
| `src/mid_overflow.c` | slide 8 | `(low + high) / 2` tràn `int` với 1 500 000 000 và 1 600 000 000 (Bloch, 2006); bản `-O0` cho thấy giá trị bị quay vòng |

Kết quả: `results/binsearch.txt` (đầy đủ), hai đoạn trích `results/binsearch-trace.txt`, `results/binsearch-tests.txt` cho slide, `results/mid-overflow.txt`, chạy ngày 13/11/2026; `results/binsearch-stuck.txt`, chạy ngày 14/11/2026.
