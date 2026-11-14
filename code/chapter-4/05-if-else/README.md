# Rẽ nhánh: câu lệnh if, else và chuỗi else-if

Mã chạy được của phần “Rẽ nhánh: câu lệnh if, else và chuỗi else-if”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/triangle_v1.c` | slide 4 | bài tam giác của Myers, bản đầu dùng `a + b < c`: sai ở giá trị biên |
| `src/triangle.c` | slide 2, 5 | bản sửa `a + b <= c` |
| `tests/triangle/` | slide 5 | mười ca kiểm thử thiết kế ở phần kiểm thử (Chương 2): năm ca hợp lệ, cạnh 0, cạnh âm, 1 2 3, 3 1 2, 1 2 4 |
| `src/triangle_order.c` | slide 6 | bản sửa với nhánh cân đặt trước nhánh đều: WA ở ca 02 (2 2 2), GCC `-Wall -Wextra` không cảnh báo |
| `src/empty_body.c` | slide 7 | `if (a > 0);`: GCC `-Wextra` cảnh báo `-Wempty-body`, chương trình vẫn in positive với a = −1 |

Chấm bằng `../v11-testing/judge.sh`. Kết quả: `results/judge-triangle.txt` (bản đầu WA ở ca 08, 09; bản sửa AC), `results/judge-order.txt` (đổi thứ tự: WA ở ca 02), `results/v1-case08.txt`, `results/empty-body.txt`, chạy ngày 13/11/2026.
