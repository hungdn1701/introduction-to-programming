# Thuật toán: từ bài toán đến lưu đồ và mã giả

Mã chạy được của phần “Thuật toán: từ bài toán đến lưu đồ và mã giả”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/euclid.txt` | slide 4 | mã giả thuật toán Euclid (Knuth, TAOCP vol. 1, §1.1, Algorithm E) |
| `src/euclid_trace.c` | slide 4 (chạy dựng sẵn) | in bảng vết m, n, r của thuật toán Euclid |
| `src/euclid_sub.txt` | slide 5 | mã giả bản trừ liên tiếp nguyên gốc (Euclid, Cơ sở, quyển VII, mệnh đề 2; Knuth, TAOCP vol. 2, §4.5.2) |
| `src/euclid_sub_trace.c` | slide 5 (chạy dựng sẵn) | in bảng vết m, n của bản trừ liên tiếp |

Kết quả: `results/euclid-1071-462.txt` (ba lần lặp, ước chung lớn nhất 21), `results/euclid-12-18.txt` (câu hỏi tương tác 2), `results/euclid-sub-1071-462.txt` (bản trừ liên tiếp: mười một lần lặp, cũng ra 21; 14/11/2026).
