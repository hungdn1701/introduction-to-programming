# Bài toán ứng dụng: Game of Life trên ma trận

Mã chạy được của phần “Bài toán ứng dụng: Game of Life trên ma trận”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/life.c` | slide 6–9 | Game of Life của Conway (Gardner, Scientific American, 10/1970) trên lưới 8 × 8: `count_neighbors` có kiểm tra biên, `next_generation` dùng mảng thứ hai, `next_generation_in_place` cập nhật tại chỗ (sai); in năm thế hệ cạnh nhau |

Chạy: `./out/life glider`, `./out/life blinker`, `./out/life inplace`; `./out/life glider 20` chạy trước 20 thế hệ rồi vẽ thế hệ 20–24. Kết quả: `results/glider.txt` (thế hệ 4 là glider dịch chéo một ô), `results/blinker.txt`, `results/inplace.txt` (sai từ thế hệ 1, thành khối vuông 2 × 2 từ thế hệ 2), chạy ngày 13/11/2026; `results/glider-wall.txt` (glider chạm góc dưới phải ở thế hệ 20, từ thế hệ 23 thành khối vuông 2 × 2 không đổi), chạy ngày 14/11/2026.
