# Kiểm thử: ca kiểm thử và chấm bài tự động

Mã chạy được của phần “Kiểm thử: ca kiểm thử và chấm bài tự động”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`). Bộ chấm dùng `timeout`, `tr`, `cmp` của Git Bash.

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `judge.sh` | slide 5 | bộ chấm tối giản theo quy ước ICPC: CE, TLE (giới hạn 2 giây), RE, WA, AC; so đầu ra từng byte sau khi bỏ ký tự CR mà Windows thêm trước mỗi ký tự xuống dòng |
| `submissions/*.c` | slide 5 | năm bài nộp cho bài A + B: đúng (`long long`), in thêm lời nhắc, dùng `int` (tràn số ở tệp 3), lặp vô hạn, thiếu dấu chấm phẩy |
| `tests/ab/*.in`, `*.out` | slide 5 | ba tệp kiểm thử; tệp 3 là 2000000000 2000000000 |

Kết quả: `results/judge-ab.txt`, chạy ngày 13/11/2026. Bài dùng `int` in −294967296 với tệp 3 (tràn số nguyên có dấu là hành vi không xác định; kết quả này không được bảo đảm). Bộ ca kiểm thử của bài tam giác (Myers) nằm ở thư mục mã của phần về câu lệnh if (Chương 4).
