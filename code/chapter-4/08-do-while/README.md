# Vòng lặp: do-while, break và continue

Mã chạy được của phần “Vòng lặp: do-while, break và continue”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/numdigits.c` | slide 5 | đếm chữ số bằng `do-while` theo King §6.2 |
| `src/numdigits_while.c` | slide 5 | cùng bài với `while`: số 0 cho 0 chữ số |
| `src/prime.c` | slide 6 | phép chia thử, `break` ở ước đầu tiên (King §6.4); đếm số lần thử |
| `src/sum_valid.c` | slide 7 | `continue` bỏ qua số âm khi đọc điểm tới hết dữ liệu nhập (theo K&R §3.7): 8 −1 6 9 −5 7 cho bốn số hợp lệ, tổng 30 |
| `src/scores.c` | slide 8 | hỏi lại điểm bằng `do-while` khi điểm ngoài 0–10 |

Kết quả: `results/numdigits.txt`, `results/prime.txt` (97: 95 lần thử; 91: dừng ở 7 sau 6 lần), `results/scores.txt`, chạy ngày 13/11/2026.
