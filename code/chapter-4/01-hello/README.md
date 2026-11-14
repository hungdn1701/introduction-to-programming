# Chương trình C: hello, world, biên dịch và chạy

Mã chạy được của phần “Chương trình C: hello, world, biên dịch và chạy”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/hello.c` | slide 2, 4 | hello, world của K&R §1.1, viết theo C17 (`int main(void)`, `return 0`) |
| `src/hello_no_newline.c` | slide 5 | bỏ `\n`: dòng ghi chú in tiếp dính vào cuối dòng chữ |
| `src/hello_no_semicolon.c` | slide 6 | thiếu dấu chấm phẩy: `expected ';' before 'return'` |

Kết quả: `results/hello.txt` (kèm `gcc --version`), `results/no-newline.txt`, `results/no-semicolon.txt`, chạy ngày 13/11/2026.
