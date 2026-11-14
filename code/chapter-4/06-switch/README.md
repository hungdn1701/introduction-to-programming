# Rẽ nhánh: câu lệnh switch

Mã chạy được của phần “Rẽ nhánh: câu lệnh switch”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/date.c` | slide 4, 5 | in ngày theo kiểu văn bản pháp lý, theo King §5.3 (date.c). King đọc tháng/ngày/năm; bản này đọc ngày/tháng/năm theo cách viết ngày ở Việt Nam |
| `src/calc.c` | slide 6 | switch theo ký tự phép toán, phỏng theo máy tính ở K&R §4.3: hằng ký tự `'+'` là số nguyên; `if` trong nhánh `'/'` chặn chia cho 0; `%` rơi vào `default` |
| `run.sh` (bỏ một `break`) | slide 7 | tạo `out/date_nobreak.c` bằng `awk`: GCC `-Wextra` cảnh báo `this statement may fall through`, ngày 2 in 2ndrd |

Kết quả: `results/date.txt`, `results/date-invalid.txt` (tháng 13 rơi vào `default`), `results/date-nobreak.txt`, `results/calc.txt`, chạy ngày 13/11/2026.
