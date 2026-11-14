# Thuật toán: độ phức tạp tính toán

Mã chạy được của phần “Thuật toán: độ phức tạp tính toán”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/search_steps.c` | slide 5 (chạy dựng sẵn) | đếm số lần so sánh của tìm tuần tự và tìm chia đôi khi tìm phần tử cuối của danh sách đã sắp xếp, n = 1 000, 1 000 000, 1 000 000 000; phần tử thứ i có giá trị 2i nên không cần cấp bộ nhớ cho danh sách |
| `src/doubling.c` | slide 6 (chạy dựng sẵn) | thí nghiệm nhân đôi của Sedgewick & Wayne (Algorithms, 4th ed., §1.4): TwoSum xét mọi cặp, O(n²), với n = 10 000, 20 000, 40 000, 80 000 số giả ngẫu nhiên (hạt giống 2026); mỗi n đo năm lần bằng `clock()` và giữ thời gian nhỏ nhất, cột `ratio` là thời gian hàng này chia hàng trước |

Kết quả: `results/search-steps.txt`: tìm tuần tự n lần; tìm chia đôi 10, 20, 30 lần. `results/doubling.txt`: tỉ lệ quanh 4 (chạy ngày 14/11/2026); số giây tùy máy.
