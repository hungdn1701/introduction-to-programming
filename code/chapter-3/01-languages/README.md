# Ngôn ngữ: từ mã máy đến ngôn ngữ bậc cao

Mã chạy được của phần “Ngôn ngữ: từ mã máy đến ngôn ngữ bậc cao”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`). Python 3.12, OpenJDK 21.

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `run.sh` | slide 5 | cùng phép tính 25 + 17: chương trình Little Man Computer (mã máy, dùng bộ mô phỏng của thư mục `v03-instruction-cycle`), C, Python, Java (`java Sum.java` chạy tệp nguồn trực tiếp, JDK 11+) |
| `src/sum.c` | slide 6 | `gcc -S` cho `results/sum-s.txt`: nạp, nạp, cộng, ghi |

Kết quả: `results/five-forms.txt`, `results/sum-s.txt`, chạy ngày 13/11/2026.
