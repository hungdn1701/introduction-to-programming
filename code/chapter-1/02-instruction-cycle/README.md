# Phần cứng: CPU, lệnh máy và chu trình lệnh

Mã chạy được của phần “Phần cứng: CPU, lệnh máy và chu trình lệnh”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/lmc.c` | slide 4, 5 (chạy dựng sẵn) | bộ mô phỏng Little Man Computer (Madnick, MIT, 1965): 100 ô nhớ, thanh ghi PC, IR, thanh ghi tích lũy; in vết sau mỗi lệnh |
| `programs/add.lmc` | slide 4 | chương trình cộng hai số: INP, STA 99, INP, ADD 99, OUT, HLT |
| `programs/countdown.lmc` | slide 5 | đếm ngược bằng lệnh nhảy: BRZ 05 dừng khi thanh ghi tích lũy bằng 0, BRA 01 ghi 01 vào PC; ô 06 giữ hằng 1; chạy với `lmc countdown.lmc 6` để in ô 06 |

Kết quả: `results/lmc-add.txt` (đầu vào 25 và 17, in 42 sau sáu lệnh), `results/lmc-countdown.txt` (đầu vào 2, in 2, 1, 0 sau mười hai lệnh; 14/11/2026). Bài tập Mở rộng: viết chương trình LMC in số lớn hơn trong hai số (dùng SUB, BRP).
