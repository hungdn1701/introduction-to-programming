# Trình biên dịch: các pha phân tích và sinh mã

Mã chạy được của phần “Trình biên dịch: các pha phân tích và sinh mã”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/syntax.c` | slide 4 | thiếu dấu chấm phẩy: lỗi cú pháp, báo ở dòng sau |
| `src/lexical.c`, `src/semantic.c` | slide 5 | ký tự `@`: lỗi từ vựng (stray); biến `rate` chưa khai báo: lỗi ngữ nghĩa (undeclared) |
| `src/link.c` | slide 6 | gõ `prinft`: biên dịch (`-c`) chỉ cảnh báo implicit declaration, liên kết báo undefined reference |
| `src/warning.c` | slide 7 | biến không dùng: cảnh báo, mã thoát 0 |
| `src/position.c` | Mở rộng | câu lệnh của Dragon book (§1.2); so sánh `out/position-O0.s` và `out/position-O2.s` |

Kết quả: `results/*.txt`, thông báo của GCC 13.2.0 chép nguyên văn; đường dẫn của `ld.exe` được rút gọn thành tên tệp. Tệp `link.c` biên dịch và liên kết thành hai bước để thông báo không chứa đường dẫn tệp tạm.
