# Chuỗi ký tự: xử lý ký tự và mật mã Caesar

Mã chạy được của phần “Chuỗi ký tự: xử lý ký tự và mật mã Caesar”. Mọi đoạn mã trên slide trích từ thư mục này (được bỏ `#include`, khung hàm `main`); mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tệp thực thi không có đuôi `.exe`).

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/caesar.c` | slide 5, 6, 8 | mật mã Caesar (Suetonius; Singh, The Code Book, ch. 1): khóa từ dòng lệnh, chữ hoa và chữ thường dịch vòng, ký tự khác giữ nguyên |
| `src/crack.c` | slide 6 | phá mã bằng phân tích tần suất (al-Kindi; Singh ch. 1): `count[tolower(c) - 'a']++`, chữ nhiều nhất coi là e; câu của Poe (The Gold-Bug, 1843) mã hóa với khóa 11 cho chữ p 16 lần → khóa 11. Với câu ngắn, chữ nhiều nhất có thể không phải e |
| `src/normalize.c` | slide 7 | chuẩn hóa họ tên: bỏ khoảng trắng thừa, viết hoa chữ đầu mỗi từ, viết thường phần còn lại (chỉ chữ ASCII) |
| `input/latin.txt`, `input/goldbug.txt`, `input/vietnamese.txt`, `input/names.txt` | slide 5–8 | dữ liệu vào (UTF-8) |

Kết quả: `results/caesar.txt` (khóa 3 rồi khóa 23 cho lại câu gốc), `results/caesar-utf8.txt` (Hà Nội thành Kà Qộl: chữ có dấu không đổi), `results/normalize.txt`, chạy ngày 13/11/2026; `results/crack.txt` (khóa 11 tìm lại từ tần suất), chạy ngày 14/11/2026. Console Windows cần `chcp 65001` để hiện đúng chữ có dấu.
