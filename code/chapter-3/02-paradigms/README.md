# Ngôn ngữ: lập trình cấu trúc và lập trình hướng đối tượng

Mã chạy được của phần “Ngôn ngữ: lập trình cấu trúc và lập trình hướng đối tượng”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`). OpenJDK 21 cho bản Java.

```bash
sh run.sh
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/account.c` | slide 5 | tài khoản ngân hàng theo lập trình cấu trúc: `struct account` và hai hàm `deposit`, `withdraw` (ý từ SICP §3.1.1); gán thẳng số dư âm vẫn biên dịch được |
| `src/Account.java` | slide 6 | cùng bài toán thành lớp: `balance` là `private` |
| `src/Bank.java` | slide 6 | lớp khác gán thẳng `acc.balance`: `javac` báo `balance has private access in Account` |
| `src/gcd_goto.c`, `src/gcd_while.c` | slide 7 | Euclid (Chương 2) viết bằng nhãn và `goto` theo đúng lưu đồ (K&R §3.8), và chỉ bằng ba cấu trúc điều khiển; với 1071 462 cả hai in 21 |

Kết quả: `results/account-c.txt`, `results/account-java.txt`, `results/bank-javac.txt`, `results/gcd-goto-while.txt` (14/11/2026). Cú pháp `struct`, con trỏ của `account.c` được giảng ở Chương 5, 6.
