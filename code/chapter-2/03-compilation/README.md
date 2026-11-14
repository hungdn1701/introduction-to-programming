# Trình biên dịch: từ mã nguồn đến tệp thực thi

Mã chạy được của phần “Trình biên dịch: từ mã nguồn đến tệp thực thi”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`). Python 3.12 cho `hello.py`.

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/hello.c` | slide 1, 4 | hello, world của K&R (§1.1), viết theo C17 (`int main(void)`, `return 0`) |
| `run.sh` | slide 4 | bốn bước của hệ thống biên dịch: `gcc -E`, `-S`, `-c`, rồi liên kết (CS:APP §1.2) |
| `src/hello.py` | slide 5 | cùng chương trình bằng Python, chạy bằng trình thông dịch |
| `src/name_error.c`, `src/name_error.py` | slide 6 | cùng một tên `count` chưa định nghĩa ở dòng thứ hai: GCC báo `'count' undeclared`, không tạo tệp thực thi; Python in `hello, world` rồi mới báo `NameError`. Chỉ đúng với lỗi phát hiện khi chạy: lỗi cú pháp thì Python cũng báo trước khi chạy dòng nào, vì nó dịch cả tệp ra bytecode trước |

Kết quả: `results/steps.txt` (hello.c 7 dòng, hello.i 1 559 dòng, hello.s 29 dòng; hello.o 914 byte, hello.exe 63 710 byte), `results/hello-s-main.txt` (hợp ngữ của `main`, bỏ các dòng chỉ thị `.seh_`; trình biên dịch thay `printf` bằng `puts`), `results/name-error.txt` (14/11/2026; đường dẫn trong traceback rút còn tên tệp, bỏ dòng `note:` dài của GCC). Số dòng của hello.i khác giữa các bản GCC.
