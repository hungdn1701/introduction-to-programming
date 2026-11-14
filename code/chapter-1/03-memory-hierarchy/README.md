# Phần cứng: phân cấp bộ nhớ và thiết bị vào ra

Mã chạy được của phần “Phần cứng: phân cấp bộ nhớ và thiết bị vào ra”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/locality.c` | slide 6 (chạy dựng sẵn) | cộng mọi phần tử của bảng 4096 × 4096 số `int` theo hàng rồi theo cột (CS:APP §6.2, sumarrayrows, sumarraycols); biên dịch với `-O1` để giữ nguyên hai vòng lặp |

Kết quả: `results/locality.txt`, chạy ngày 13/11/2026: theo hàng 9 ms, theo cột 235 ms (chậm hơn khoảng 26 lần); lần chạy lại 10 ms và 271 ms. Thời gian đo bằng `clock()` (độ phân giải 1 ms trên Windows).
