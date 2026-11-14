# Bài toán ứng dụng: trò chơi đoán số

Mã chạy được của phần “Bài toán ứng dụng: trò chơi đoán số”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/guess.c` | slide 3, 5, 6 | trò chơi đoán số của King §10.5 (guess.c): `initialize_number_generator`, `choose_new_secret_number`, `read_guesses`, biến toàn cục `secret_number`. Thêm tham số hạt giống để ghi lại ván chơi và kiểm tra giá trị trả về của `scanf` |
| `input/session.txt` | slide 5 | các số người chơi nhập: 50, 75, 62, 56, 53, 54, 55, rồi N |
| `src/guess2.c` | slide 7 | bản bỏ biến toàn cục (King, guess2.c); hàm `play_by_halving` chơi thử mọi số bí mật 1..100, nhiều nhất 7 lượt |

Kết quả: `results/guess-session.txt` (hạt giống 2026 cho số bí mật 55 với thư viện C của MinGW-w64 UCRT; `awk` trong `run.sh` đặt số đã nhập sau lời nhắc, như trên terminal), `results/guess2.txt`, chạy ngày 13/11/2026. Chơi thật: `./out/guess` (không tham số, hạt giống là thời gian hiện tại).
