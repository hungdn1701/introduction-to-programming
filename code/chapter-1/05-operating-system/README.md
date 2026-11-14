# Hệ điều hành: tiến trình, bộ nhớ và hệ thống tệp

Mã chạy được của phần “Hệ điều hành: tiến trình, bộ nhớ và hệ thống tệp”. Mọi đoạn mã trên slide trích từ thư mục này; mọi kết quả chạy trên slide lấy từ `results/` (kết quả thật, không gõ lại). Chương 1–3 dùng mã để quan sát: slide không giảng cú pháp C của các chương trình dựng sẵn (quyết định 33).

**Môi trường:** GCC 13.2.0 (MinGW-w64 UCRT) trên Windows 11, chạy trong Git Bash; mọi tệp C biên dịch với `-std=c17 -Wall -Wextra`. Trên Linux, macOS dùng `gcc` có sẵn (tên tệp thực thi không có đuôi `.exe`). Chạy bằng Windows PowerShell 5.1.

```powershell
powershell -ExecutionPolicy Bypass -File run.ps1
```

| Tệp | Dùng ở | Cho thấy |
|---|---|---|
| `src/cpu.c` | slide 6 (chạy dựng sẵn) | theo chương trình đầu tiên của OSTEP (ch. 2): quay vòng trên CPU, mỗi giây in số triệu vòng đã chạy; thời gian bằng `timespec_get` (C11) |
| `run.ps1` | slide 6 | chạy một bản, rồi ba bản cùng lúc, gắn vào nhân 0 bằng `ProcessorAffinity = 1`; rồi ba bản không gắn nhân |
| `summarize.ps1` | slide 6 | gom kết quả thành bảng `results/summary.txt` |

Kết quả chạy ngày 13/11/2026: một mình trên nhân 0 khoảng 595 triệu vòng/giây; ba bản chung nhân 0 khoảng 200 triệu mỗi bản; ba bản dùng mọi nhân khoảng 565 triệu mỗi bản; máy có 8 bộ xử lý logic, 341 tiến trình. Gắn nhân sau khi tiến trình đã khởi động (khoảng thời gian rất ngắn trước đó chưa gắn).
