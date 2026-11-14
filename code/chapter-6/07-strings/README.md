# Chuỗi ký tự: mảng char và ký tự kết thúc chuỗi

Mã chạy được của phần “Chuỗi ký tự: mảng char và ký tự kết thúc chuỗi”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/strings.c` | slide 5 | `strlen` và `sizeof`, `my_strlen` của K&R §2.3, `strcmp`, `strcpy`, `strcat`; `fgets` giữ ký tự xuống dòng |
| `src/overflow.c` | slide 4, 6 | `strcpy` 15 byte vào `char name[10]`: GCC cảnh báo `-Wstringop-overflow`; chạy thì `balance` bên cạnh đổi từ 100 thành 1752056096 |
| `src/gets_demo.c` | slide 7 | `gets` (đã bị bỏ khỏi C11): GCC bản MinGW cảnh báo `Using gets() is always unsafe`; dòng dài hơn mảng làm chương trình bị dừng |

Kết quả: `results/strings.txt`, `results/overflow.txt` (địa chỉ dùng cho hình `tran-bo-dem`), `results/gets.txt`, chạy ngày 13/11/2026. Bố trí biến trong bộ nhớ phụ thuộc trình biên dịch và mức tối ưu: với trình biên dịch khác, `overflow.c` có thể ghi đè chỗ khác hoặc bị dừng.
