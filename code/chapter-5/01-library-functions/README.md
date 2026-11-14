# Hàm: khái niệm hàm và hàm thư viện

Mã chạy được của phần “Hàm: khái niệm hàm và hàm thư viện”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/hypotenuse.c` | slide 4 | `sqrt`, `pow` của `math.h`: cạnh huyền 3, 4 là 5.000; 2 mũ 10 là 1024. Trên Linux thêm `-lm` khi liên kết |
| `src/dice.c` | slide 5, 6 | tung xúc xắc 6000 lần bằng `rand() % 6 + 1` (Deitel & Deitel); tham số `seed` gọi `srand((unsigned) time(NULL))` |
| `src/abs_fabs.c` | slide 7 | `int abs(int)` của `stdlib.h` và `double fabs(double)` của `math.h`: `abs(-2.7)` cho 2, `fabs(-2.7)` cho 2.7; GCC `-Wextra` cảnh báo `-Wabsolute-value` (ngắt dòng bằng `fold`) |
| `src/srand_in_loop.c` | câu hỏi ôn tập | lỗi gọi `srand` trong vòng lặp: cả 6000 lần cùng một mặt |
| `run.sh` (bỏ `#include <math.h>`) | slide 7 | tạo `out/no_math.c` bằng `sed`: GCC 13 cảnh báo `implicit declaration of function 'sqrt'` (GCC 14 coi là lỗi) |

Kết quả: `results/hypotenuse.txt`, `results/dice-no-seed.txt` (hai lần chạy giống hệt), `results/dice-seed.txt` (hai lần chạy cách nhau một giây, khác nhau; chạy lại sẽ ra dãy khác), `results/srand-in-loop.txt`, `results/no-math-header.txt`, chạy ngày 13/11/2026; `results/abs-fabs.txt`, chạy ngày 14/11/2026. Chạy lại `run.sh` sẽ đổi `dice-seed.txt` và `srand-in-loop.txt` (phụ thuộc thời gian); câu hỏi ôn tập Chương 5 trích `srand-in-loop.txt` đã ghi. Dãy của `rand` phụ thuộc thư viện C: trên Linux, macOS các con số khác, hiện tượng thì như nhau.
