/* ============================================================================
 * INT11117/workbench/lessons.js — 12 Mô phỏng tương tác 2.5D
 * (Nhập môn Tin học và Lập trình — C17 & GCC)
 * ============================================================================
 * Phủ đủ 6 chương của INT11117/plan.yaml, bám sát INT11117/glossary.yaml và
 * INT11117/classic-examples.md (K&R, King, CS:APP, OSTEP, Knuth, CLRS).
 * ============================================================================ */
(function (global) {
  'use strict';
  const D = global.IsoDSL;

  const LESSONS = [
    /* ========================================================================
     * CHƯƠNG 1 — 1. KIẾN TRÚC VON NEUMANN & CHU TRÌNH LỆNH LMC
     * ======================================================================== */
    {
      id: 'von-neumann-lmc',
      ch: 1,
      videos: ['V02', 'V03'],
      videoHref: '../V03/index.html',
      videoTitle: 'Phần cứng: CPU, lệnh máy và chu trình lệnh',
      title: 'Kiến trúc von Neumann & Chu trình lệnh CPU',
      summary: 'Vì sao lệnh và dữ liệu cùng nằm trong bộ nhớ chính, và cách CPU lặp Fetch → Decode → Execute trên Little Man Computer.',
      minutes: 8,
      level: 'Cơ bản',
      ref: 'Chương 1 · Kiến trúc máy tính & Chu trình lệnh',
      metrics: [
        { id: 'pc', label: 'THANH GHI PC' },
        { id: 'ir', label: 'LỆNH HIỆN TẠI (IR)' },
        { id: 'acc', label: 'THANH GHI ACC' },
        { id: 'phase', label: 'PHA CHU TRÌNH' }
      ],
      legend: ['req', 'res', 'write'],
      goals: [
        { text: 'Nhận diện bốn thành phần của kiến trúc von Neumann nối qua bus chung', step: 0 },
        { text: 'Hiểu bước Fetch: CPU dùng địa chỉ trong PC đọc lệnh máy từ RAM vào IR', step: 1 },
        { text: 'Hiểu bước Decode & Execute: ALU cộng dữ liệu từ RAM vào thanh ghi ACC', step: 2 },
        { text: 'Thấy cách lệnh nhảy (BRZ/BRA) đổi PC để tạo rẽ nhánh và vòng lặp', step: 3 }
      ],
      steps: [
        {
          short: 'Kiến trúc von Neumann',
          chapter: 'setup',
          title: 'Máy tính lưu trữ chương trình: Lệnh và dữ liệu cùng nằm trong RAM',
          body: [
            'Trước năm 1945, muốn đổi bài toán phải cắm lại dây phần cứng. <b>Kiến trúc von Neumann</b> đặt cả dãy lệnh máy lẫn dữ liệu vào chung một <b>bộ nhớ chính (RAM)</b> có đánh địa chỉ.',
            '<b>CPU</b> (gồm khối điều khiển, ALU và các thanh ghi <code>PC</code>, <code>IR</code>, <code>ACC</code>) trao đổi với RAM và thiết bị vào ra qua đường truyền chung gọi là <b>bus</b>.'
          ],
          callout: {
            kind: 'insight',
            text: 'Nhờ chương trình nằm ngay trong bộ nhớ như dữ liệu, cùng một máy tính có thể chạy hết ứng dụng này sang ứng dụng khác mà không đổi phần cứng.'
          },
          metrics: {
            pc: { val: '00', level: '' },
            ir: { val: 'Chờ nạp', level: '' },
            acc: { val: '0', level: '' },
            phase: { val: 'Sẵn sàng', level: '' }
          },
          scene: {
            entities: {
              io: D.dev(-11, 0, 'Thiết bị vào ra (I/O)', { tags: [{ text: 'Nhập 7 và 5', tone: 'blue' }] }),
              cpu: D.srv(0, 0, ['CPU'], { color: 'blue', glyph: 'cpu', sub: 'CU · ALU · PC · IR · ACC' }),
              ram: D.block(11, 0, { color: 'purple', glyph: 'memory', label: ['Bộ nhớ chính (RAM)'], sub: 'Chứa cả lệnh lẫn dữ liệu', tags: [{ text: 'Ô 00..99', tone: 'violet' }] })
            },
            links: {
              i_c: D.link('io', 'cpu', { label: 'Bus I/O' }),
              c_r: D.link('cpu', 'ram', { label: 'Address / Data Bus' })
            },
            flows: [D.flow(['i_c', 'c_r'], { rate: 1.4, kind: 'req' })]
          }
        },
        {
          short: 'Pha Fetch (Nạp lệnh)',
          chapter: 'technique',
          title: 'Bước 1 — Fetch: Đọc lệnh tại địa chỉ PC từ RAM vào thanh ghi IR',
          body: [
            'Trên mô hình <b>Little Man Computer (LMC)</b>, chương trình cộng hai số nằm ở các ô nhớ <code>00..05</code>, còn số thứ nhất (<code>7</code>) đã được lưu ở ô <code>90</code>.',
            'CPU gửi địa chỉ <code>PC = 03</code> ra bus địa chỉ, nạp mã lệnh <code>190</code> (<code>ADD 90</code>) từ RAM vào thanh ghi lệnh <code>IR</code> rồi tự động tăng <code>PC</code> lên <code>04</code>.'
          ],
          changes: [
            '+ Nạp lệnh 190 (ADD 90) từ ô nhớ 03 vào IR',
            '~ Tự động tăng PC: 03 → 04 để trỏ tới lệnh kế tiếp'
          ],
          metrics: {
            pc: { val: '03 → 04', level: 'good' },
            ir: { val: '190 (ADD 90)', level: 'good' },
            acc: { val: '5 (số thứ hai)', level: '' },
            phase: { val: 'FETCH', level: 'good' }
          },
          scene: {
            entities: {
              pc: D.block(-11, 4, { color: 'blue', glyph: 'code', label: ['PC = 03'], sub: 'Trỏ ô lệnh kế tiếp' }),
              ir: D.block(-11, -4, { color: 'amber', glyph: 'code', label: ['IR = 190'], sub: 'Nhận lệnh ADD 90', tags: [{ text: 'Đang giữ mã lệnh', tone: 'amber' }] }),
              cu: D.srv(0, 0, ['Khối điều khiển (CU)'], { color: 'blue', glyph: 'cpu', sub: 'Đọc ô 03, tăng PC' }),
              ram: D.block(11, 0, { color: 'purple', glyph: 'memory', label: ['RAM (Ô 03: 190)'], sub: 'Ô 90 đang giữ số 7' })
            },
            links: {
              p_c: D.link('pc', 'cu', { label: 'Địa chỉ 03' }),
              c_r: D.link('cu', 'ram', { label: 'Đọc ô 03' }),
              r_i: D.link('ram', 'ir', { label: 'Trả mã 190', tone: 'green' })
            },
            flows: [D.flow(['p_c', 'c_r', 'r_i'], { rate: 1.8, kind: 'req' })]
          }
        },
        {
          short: 'Decode & Execute',
          chapter: 'technique',
          title: 'Bước 2 & 3 — Decode và Execute: ALU cộng ô 90 vào ACC',
          body: [
            'Khối điều khiển giải mã <code>190</code>: chữ số đầu <code>1</code> là mã lệnh <b>ADD</b>, hai chữ số sau <code>90</code> là địa chỉ toán hạng.',
            'CPU đọc giá trị <code>7</code> ở ô <code>90</code>, đưa vào <b>ALU</b> cộng với giá trị <code>5</code> đang có trong <code>ACC</code> và ghi kết quả <code>12</code> trở lại <code>ACC</code>.'
          ],
          metrics: {
            pc: { val: '04', level: 'good' },
            ir: { val: 'ADD 90', level: 'good' },
            acc: { val: '5 + 7 = 12', level: 'good' },
            phase: { val: 'DECODE → EXECUTE', level: 'good' }
          },
          scene: {
            entities: {
              ram: D.block(-11, 0, { color: 'purple', glyph: 'memory', label: ['RAM ô 90'], sub: 'Giá trị = 7' }),
              alu: D.srv(0, 0, ['ALU (Số học & Logic)'], { color: 'green', glyph: 'cpu', sub: '5 + 7 = 12', tags: [{ text: 'Thực thi ADD', tone: 'green' }] }),
              acc: D.block(11, 0, { color: 'green', glyph: 'code', label: ['Thanh ghi ACC'], sub: 'Giá trị mới: 12', tags: [{ text: 'Sẵn sàng OUT', tone: 'green' }] })
            },
            links: {
              r_a: D.link('ram', 'alu', { label: 'Nạp toán hạng 7', tone: 'green' }),
              a_c: D.link('alu', 'acc', { label: 'Ghi kết quả 12', tone: 'green' })
            },
            flows: [D.flow(['r_a', 'a_c'], { rate: 2.0, kind: 'write' })]
          }
        },
        {
          short: 'Lệnh nhảy & Vòng lặp',
          chapter: 'summary',
          title: 'Lệnh nhảy BRZ / BRA đổi trực tiếp giá trị PC để tạo vòng lặp',
          body: [
            'Sau khi xuất kết quả <code>12</code> bằng <code>OUT</code>, chương trình có thể gặp lệnh nhảy có điều kiện <code>BRZ</code> (nhảy nếu <code>ACC == 0</code>) hoặc nhảy không điều kiện <code>BRA</code>.',
            'Thực chất mọi câu lệnh <code>if</code>, <code>while</code>, <code>for</code> trong ngôn ngữ C khi dịch xuống máy đều chỉ là thao tác <b>ghi đè địa chỉ mới vào thanh ghi <code>PC</code></b>!'
          ],
          metrics: {
            pc: { val: 'Ghi đè địa chỉ nhảy', level: 'good' },
            ir: { val: 'BRZ / BRA / HLT', level: 'good' },
            acc: { val: '12 (đã xuất OUT)', level: 'good' },
            phase: { val: 'Lặp đến khi HLT', level: 'good' }
          },
          scene: {
            entities: {
              alu: D.srv(-10, 0, ['Kiểm tra ACC == 0?'], { color: 'amber', glyph: 'cpu', sub: 'Lệnh nhảy BRZ' }),
              pc: D.block(1, 0, { color: 'blue', glyph: 'code', label: ['Thanh ghi PC'], sub: 'Đổi hướng luồng điều khiển', tags: [{ text: 'Tạo rẽ nhánh & lặp', tone: 'green' }] }),
              out: D.dev(11, 0, 'Màn hình OUT = 12', { tags: [{ text: 'Dừng khi gặp HLT', tone: 'paper' }] })
            },
            links: {
              a_p: D.link('alu', 'pc', { label: 'Cập nhật PC', tone: 'green' }),
              p_o: D.link('pc', 'out', { label: 'OUT rồi HLT', tone: 'green' })
            },
            flows: [D.flow(['a_p', 'p_o'], { rate: 1.8, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 1 — 2. PHÂN CẤP BỘ NHỚ & CACHE (DUYỆT HÀNG VS CỘT)
     * ======================================================================== */
    {
      id: 'memory-hierarchy-cache',
      ch: 1,
      videos: ['V04'],
      videoHref: '../V04/index.html',
      videoTitle: 'Phần cứng: phân cấp bộ nhớ và thiết bị vào ra',
      title: 'Phân cấp bộ nhớ & Tính cục bộ của Cache',
      summary: 'Chênh lệch tốc độ giữa thanh ghi, cache L1/L2/L3, RAM và SSD — và vì sao duyệt mảng theo hàng nhanh gấp nhiều lần theo cột.',
      minutes: 7,
      level: 'Cơ bản',
      ref: 'Chương 1 · Phân cấp bộ nhớ (CS:APP)',
      metrics: [
        { id: 'lat', label: 'ĐỘ TRỄ TRUY CẬP' },
        { id: 'hit', label: 'TỶ LỆ CACHE HIT' },
        { id: 'order', label: 'THỨ TỰ DUYỆT' },
        { id: 'speed', label: 'TỐC ĐỘ THỰC THI' }
      ],
      legend: ['req', 'res', 'heavy'],
      goals: [
        { text: 'Nắm 4 tầng phân cấp bộ nhớ: Thanh ghi → Cache L1/L2/L3 → RAM → SSD/Đĩa', step: 0 },
        { text: 'Hiểu quy tắc nạp theo cache line (64 byte liền kề) và tính cục bộ không gian', step: 1 },
        { text: 'Thấy nguyên nhân duyệt mảng hai chiều theo cột gây liên tục cache miss', step: 2 },
        { text: 'Duyệt theo hàng (row-major) đúng thứ tự lưu của C giúp tăng tốc rõ rệt', step: 3 }
      ],
      steps: [
        {
          short: 'Bốn tầng bộ nhớ',
          chapter: 'setup',
          title: 'Càng gần CPU càng nhanh và nhỏ; càng xa càng chậm và lớn',
          body: [
            'Thanh ghi CPU truy cập trong <b>< 1 ns</b>, Cache L1 mất ~1 ns, RAM mất ~100 ns (chậm hơn trăm lần), còn SSD mất hàng chục nghìn nano giây.',
            'Phân cấp bộ nhớ tạo ảo giác cho lập trình viên rằng máy tính vừa có dung lượng lớn cỡ RAM/SSD, vừa có tốc độ truy cập nhanh gần bằng cache.'
          ],
          metrics: {
            lat: { val: '1 ns → 100 ns → 50 µs', level: '' },
            hit: { val: 'Phụ thuộc tính cục bộ', level: '' },
            order: { val: '4 tầng phân cấp', level: '' },
            speed: { val: 'Cân bằng giá / tốc độ', level: 'good' }
          },
          scene: {
            entities: {
              reg: D.block(-12, 0, { color: 'green', glyph: 'cpu', label: ['Thanh ghi'], sub: '~0,5 ns · Vài trăm B' }),
              ca: D.block(-4, 0, { color: 'teal', glyph: 'cache', label: ['Cache L1–L3'], sub: '1–15 ns · KB–MB' }),
              ram: D.block(4, 0, { color: 'blue', glyph: 'memory', label: ['RAM chính'], sub: '~100 ns · 16 GB' }),
              ssd: D.db(12, 0, 'SSD / Đĩa', { color: 'purple', sub: '~50 000 ns · 1 TB' })
            },
            links: {
              l1: D.link('reg', 'ca', { label: 'Nhanh nhất', tone: 'green' }),
              l2: D.link('ca', 'ram', { label: 'Cache line 64B' }),
              l3: D.link('ram', 'ssd', { label: 'Trang đĩa 4 KB', dashed: true })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 1.8, kind: 'req' })]
          }
        },
        {
          short: 'Cache Line & Tính cục bộ',
          chapter: 'technique',
          title: 'Mỗi lần đọc RAM, CPU kéo trọn 1 cache line (64 byte liền kề)',
          body: [
            'Khi chương trình đọc phần tử <code>a[0][0]</code> (4 byte <code>int</code>), phần cứng không chỉ kéo 4 byte đó mà kéo nguyên <b>64 byte liền kề</b> (16 số nguyên liên tiếp) lên Cache L1.',
            'Nếu lệnh tiếp theo đọc ngay <code>a[0][1]</code>, <code>a[0][2]</code>…, dữ liệu đã nằm sẵn trong L1 — đó là <b>tính cục bộ không gian</b> (spatial locality).'
          ],
          metrics: {
            lat: { val: '~1 ns (Cache Hit)', level: 'good' },
            hit: { val: '15/16 lần Hit!', level: 'good' },
            order: { val: '64 byte liên tiếp', level: 'good' },
            speed: { val: 'Cực nhanh', level: 'good' }
          },
          scene: {
            entities: {
              cpu: D.srv(-10, 0, ['CPU Core'], { color: 'green', glyph: 'cpu', sub: 'Đọc a[0][0..15]' }),
              l1: D.block(0, 0, { color: 'green', glyph: 'cache', label: ['Cache L1 (64B line)'], sub: 'Sẵn 16 phần tử int!', tags: [{ text: '15 lần Hit liên tiếp', tone: 'green' }] }),
              ram: D.block(11, 0, { color: 'blue', glyph: 'memory', label: ['RAM'], sub: 'Chỉ phải đọc 1 lần' })
            },
            links: {
              c_l: D.link('cpu', 'l1', { label: 'Hit ~1 ns', tone: 'green' }),
              r_l: D.link('ram', 'l1', { label: 'Nạp 1 cache line 64B', dashed: true })
            },
            flows: [D.flow(['c_l'], { rate: 3.0, kind: 'res' })]
          }
        },
        {
          short: 'Duyệt theo cột (Miss)',
          chapter: 'problem',
          title: 'sumarraycols: Nhảy cách hàng nghìn byte gây liên tục Cache Miss',
          body: [
            'Trong ngôn ngữ C, mảng hai chiều được lưu liên tiếp <b>theo hàng</b> (row-major). Khi viết vòng lặp ngoài theo cột <code>j</code> và vòng lặp trong theo hàng <code>i</code> (<code>a[i][j]</code>), mỗi bước nhảy cách cả một hàng dài hàng nghìn byte.',
            'Hầu như mọi phép đọc đều rơi ra ngoài cache line vừa nạp, buộc CPU chờ RAM 100 ns liên tục.'
          ],
          callout: {
            kind: 'warn',
            text: 'Cùng số phép cộng giống hệt nhau, chỉ đảo thứ tự hai vòng lặp <code>i</code> và <code>j</code> trên mảng lớn đã có thể chậm đi từ 5 đến 10 lần!'
          },
          metrics: {
            lat: { val: '~100 ns / phần tử', level: 'bad' },
            hit: { val: 'Miss liên tục', level: 'bad' },
            order: { val: 'Theo cột (nhảy bước lớn)', level: 'bad' },
            speed: { val: 'Chậm 5–10 lần', level: 'bad' }
          },
          scene: {
            entities: {
              cpu: D.srv(-11, 0, ['CPU (chờ RAM)'], { color: 'red', heat: 0.75, glyph: 'cpu', sub: 'a[0][0] → a[1][0] → a[2][0]' }),
              l1: D.block(0, 0, { color: 'red', glyph: 'cache', label: ['Cache L1'], sub: 'Miss liên tiếp!', tags: [{ text: 'Bỏ phí 60B mỗi line', tone: 'red' }] }),
              ram: D.block(11, 0, { color: 'amber', glyph: 'memory', label: ['RAM chính'], sub: 'Nghẽn đọc liên tục', cpu: 0.92 })
            },
            links: {
              c_l: D.link('cpu', 'l1', { label: 'Cache Miss!', tone: 'red', fail: 0.6 }),
              l_r: D.link('l1', 'ram', { label: 'Chờ 100 ns mỗi lần', tone: 'red' })
            },
            flows: [D.flow(['c_l', 'l_r'], { rate: 2.2, kind: 'heavy' })]
          }
        },
        {
          short: 'Duyệt theo hàng (Hit)',
          chapter: 'summary',
          title: 'sumarrayrows: Quét tuần tự từng ô nhớ liền kề, khai thác trọn bộ nhớ đệm',
          body: [
            'Đặt vòng lặp ngoài theo hàng <code>i</code>, vòng lặp trong theo cột <code>j</code>: CPU đi qua các ô nhớ có địa chỉ tăng đều từng 4 byte một.',
            'Bộ nạp trước phần cứng (hardware prefetcher) còn đoán trước và kéo sẵn cache line kế tiếp từ RAM lên L1 trước cả khi CPU cần tới.'
          ],
          metrics: {
            lat: { val: '~1 ns trung bình', level: 'good' },
            hit: { val: '> 93% Cache Hit', level: 'good' },
            order: { val: 'Theo hàng (Row-major)', level: 'good' },
            speed: { val: 'Tối ưu phần cứng', level: 'good' }
          },
          scene: {
            entities: {
              cpu: D.srv(-11, 0, ['CPU (chạy hết tốc)'], { color: 'green', glyph: 'cpu', sub: 'a[0][0] → a[0][1] → a[0][2]' }),
              l1: D.block(0, 0, { color: 'green', glyph: 'cache', label: ['Cache L1 + Prefetch'], sub: 'Trúng đích liên tục', tags: [{ text: 'Khai thác trọn 64B', tone: 'green' }] }),
              ram: D.block(11, 0, { color: 'blue', glyph: 'memory', label: ['RAM (Row-major)'], sub: 'Đọc tuần tự êm mượt', cpu: 0.25 })
            },
            links: {
              c_l: D.link('cpu', 'l1', { label: 'Hit liên tiếp', tone: 'green' }),
              r_l: D.link('ram', 'l1', { label: 'Prefetch sẵn', tone: 'green', dashed: true })
            },
            flows: [D.flow(['c_l'], { rate: 3.2, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 1 — 3. HỆ ĐẾM NHỊ PHÂN, HEX & MÃ HÓA UTF-8
     * ======================================================================== */
    {
      id: 'binary-utf8',
      ch: 1,
      videos: ['V05'],
      videoHref: '../V05/index.html',
      videoTitle: 'Dữ liệu: hệ đếm và biểu diễn dữ liệu trong máy tính',
      title: 'Hệ nhị phân, Thập lục phân & Mã hóa UTF-8',
      summary: 'Từ bit 0/1 sang hệ thập lục phân (4 bit = 1 chữ số hex) và cách chữ "Hà Nội" chiếm đúng 9 byte trong UTF-8.',
      minutes: 7,
      level: 'Cơ bản',
      ref: 'Chương 1 · Hệ đếm & Biểu diễn dữ liệu',
      metrics: [
        { id: 'base', label: 'HỆ ĐẾM / MÃ HÓA' },
        { id: 'ex', label: 'VÍ DỤ BIỂU DIỄN' },
        { id: 'bytes', label: 'SỐ BYTE LƯU TRỮ' },
        { id: 'compat', label: 'TƯƠNG THÍCH ASCII' }
      ],
      legend: ['req', 'res', 'write'],
      goals: [
        { text: 'Hiểu vì sao mọi dữ liệu (số, chữ, ảnh) đều quy về dãy bit 0 và 1', step: 0 },
        { text: 'Biết gom đúng 4 bit thành 1 chữ số thập lục phân (0x41 = 65 = chữ A)', step: 1 },
        { text: 'Hiểu giới hạn 7 bit (128 ký tự) của ASCII và vai trò mã hiệu Unicode', step: 2 },
        { text: 'Đếm chính xác 9 byte UTF-8 của chuỗi "Hà Nội" (1, 2 và 3 byte tùy ký tự)', step: 3 }
      ],
      steps: [
        {
          short: 'Bit và Byte',
          chapter: 'setup',
          title: 'Mỗi vị trí nhị phân mang trọng số lũy thừa của 2',
          body: [
            'Mạch điện tử chỉ phân biệt hai mức điện áp (<b>bit 0</b> và <b>bit 1</b>). Tám bit hợp thành một <b>byte</b> — đơn vị nhỏ nhất có địa chỉ riêng trong RAM, biểu diễn được 256 tổ hợp (<code>0..255</code>).',
            'Ví dụ dãy 8 bit <code>0100 0001</code> có giá trị thập phân là <code>64 + 1 = 65</code>.'
          ],
          metrics: {
            base: { val: 'Nhị phân (cơ số 2)', level: '' },
            ex: { val: '0100 0001₂ = 65₁₀', level: 'good' },
            bytes: { val: '1 byte = 8 bit', level: 'good' },
            compat: { val: 'Nền tảng phần cứng', level: '' }
          },
          scene: {
            entities: {
              bits: D.block(-10, 0, { color: 'blue', glyph: 'cpu', label: ['0100 0001₂'], sub: '2⁶ + 2⁰ = 64 + 1' }),
              dec: D.block(1, 0, { color: 'green', glyph: 'code', label: ['Giá trị = 65'], sub: 'Kiểu số nguyên hoặc ký tự' }),
              ram: D.block(11, 0, { color: 'purple', glyph: 'memory', label: ['1 ô Byte RAM'], sub: '0..255 (2⁸ trạng thái)' })
            },
            links: {
              b_d: D.link('bits', 'dec', { label: 'Tính trọng số 2^k' }),
              d_r: D.link('dec', 'ram', { label: 'Lưu vào 1 byte', tone: 'green' })
            },
            flows: [D.flow(['b_d', 'd_r'], { rate: 1.6, kind: 'write' })]
          }
        },
        {
          short: 'Hệ 16 (Hex) gọn 4 bit',
          chapter: 'technique',
          title: 'Hệ thập lục phân: Mỗi chữ số hex viết gọn đúng 4 bit',
          body: [
            'Đọc chuỗi dài 32 hay 64 bit rất dễ nhầm. Vì <code>16 = 2⁴</code>, mỗi nhóm 4 bit ứng khít với một chữ số <code>0–9, A–F</code>.',
            'Nhờ đó <code>0100 0001₂</code> viết gọn là <b><code>0x41</code></b>, và dãy 12 bit <code>0111 1110 1010₂</code> viết gọn ngay là <code>0x7EA</code>.'
          ],
          metrics: {
            base: { val: 'Thập lục phân (0x)', level: 'good' },
            ex: { val: '0100=4 · 0001=1 → 0x41', level: 'good' },
            bytes: { val: '2 chữ số hex = 1 byte', level: 'good' },
            compat: { val: 'Dùng cho địa chỉ & dump', level: 'good' }
          },
          scene: {
            entities: {
              hi: D.block(-10, 3.5, { color: 'blue', glyph: 'code', label: ['4 bit cao: 0100'], sub: '= 4 (hex)' }),
              lo: D.block(-10, -3.5, { color: 'teal', glyph: 'code', label: ['4 bit thấp: 0001'], sub: '= 1 (hex)' }),
              hex: D.block(2, 0, { color: 'green', glyph: 'terminal', label: ['Byte 0x41'], sub: "Thập phân 65 · Ký tự 'A'", tags: [{ text: 'Gọn gấp 4 lần nhị phân', tone: 'green' }] })
            },
            links: {
              h_x: D.link('hi', 'hex', { label: 'Chữ số 4', tone: 'green' }),
              l_x: D.link('lo', 'hex', { label: 'Chữ số 1', tone: 'green' })
            },
            flows: [
              D.flow(['h_x'], { rate: 1.6, kind: 'req' }),
              D.flow(['l_x'], { rate: 1.6, kind: 'req' })
            ]
          }
        },
        {
          short: 'ASCII tới Unicode',
          chapter: 'problem',
          title: 'ASCII chỉ có 128 ký tự — không thể viết tiếng Việt có dấu',
          body: [
            'Bảng mã <b>ASCII</b> (7 bit) đủ cho chữ cái Latinh không dấu (<code>\'H\' = 0x48</code>, <code>\'A\' = 0x41</code>), chữ số và dấu câu, nhưng hoàn toàn không có chỗ cho <code>\'à\'</code> hay <code>\'ộ\'</code>.',
            '<b>Unicode</b> giải quyết bằng cách cấp một mã hiệu duy nhất (code point) cho mọi chữ viết trên thế giới: <code>\'H\' → U+0048</code>, <code>\'à\' → U+00E0</code>, <code>\'ộ\' → U+1ED9</code>.'
          ],
          metrics: {
            base: { val: 'Unicode Code Point', level: 'good' },
            ex: { val: 'à=U+00E0 · ộ=U+1ED9', level: 'good' },
            bytes: { val: 'Cần quy tắc mã hóa', level: 'warn' },
            compat: { val: '128 mã đầu trùng ASCII', level: 'good' }
          },
          scene: {
            entities: {
              asc: D.block(-10, 0, { color: 'amber', glyph: 'code', label: ['ASCII (0..127)'], sub: 'Chỉ chữ không dấu', tags: [{ text: 'Thiếu tiếng Việt', tone: 'amber' }] }),
              uni: D.block(2, 0, { color: 'violet', glyph: 'globe', label: ['Bảng mã Unicode'], sub: 'U+0048 · U+00E0 · U+1ED9', tags: [{ text: 'Mọi ngôn ngữ', tone: 'violet' }] })
            },
            links: {
              a_u: D.link('asc', 'uni', { label: 'Mở rộng bao trọn ASCII', tone: 'green' })
            },
            flows: [D.flow(['a_u'], { rate: 1.6, kind: 'req' })]
          }
        },
        {
          short: '"Hà Nội" = 9 byte UTF-8',
          chapter: 'summary',
          title: 'UTF-8 mã hóa độ dài biến đổi: "Hà Nội" có 6 ký tự nhưng chiếm 9 byte',
          body: [
            '<b>UTF-8</b> (Pike & Thompson, 1993) dùng 1 đến 4 byte tùy ký tự: ký tự ASCII giữ nguyên 1 byte (<code>H=48</code>, dấu cách <code>20</code>, <code>N=4E</code>, <code>i=69</code>), chữ <code>à</code> dùng 2 byte (<code>C3 A0</code>), chữ <code>ộ</code> dùng 3 byte (<code>E1 BB 99</code>).',
            'Tổng cộng chuỗi <code>"Hà Nội"</code> dài 6 ký tự nhưng chiếm đúng <b>9 byte</b> (<code>1+2+1+1+3+1</code>) — lý do vì sao hàm <code>strlen("Hà Nội")</code> trong C trả về <b>9</b> chứ không phải 6!'
          ],
          callout: {
            kind: 'insight',
            text: 'Nhờ 128 ký tự ASCII giữ nguyên 1 byte ở UTF-8, mọi tệp mã nguồn C viết bằng tiếng Anh đều tự động hợp lệ dưới dạng UTF-8.'
          },
          metrics: {
            base: { val: 'UTF-8 (1–4 byte)', level: 'good' },
            ex: { val: '48 C3 A0 20 4E E1 BB 99 69', level: 'good' },
            bytes: { val: '9 byte cho 6 ký tự', level: 'good' },
            compat: { val: '100% tương thích ASCII', level: 'good' }
          },
          scene: {
            entities: {
              b1: D.block(-11, 0, { color: 'green', glyph: 'code', label: ["'H' ' ' 'N' 'i'"], sub: 'Mỗi ký tự 1 byte (4B)' }),
              b2: D.block(0, 0, { color: 'blue', glyph: 'code', label: ["'à' (U+00E0)"], sub: '2 byte: C3 A0' }),
              b3: D.block(11, 0, { color: 'purple', glyph: 'code', label: ["'ộ' (U+1ED9)"], sub: '3 byte: E1 BB 99', tags: [{ text: 'Tổng = 9 byte', tone: 'violet' }] })
            },
            links: {
              l1: D.link('b1', 'b2', { label: 'Nối tiếp byte' }),
              l2: D.link('b2', 'b3', { label: 'strlen() đếm byte = 9', tone: 'green' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 1.8, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 1 — 4. HỆ ĐIỀU HÀNH: ẢO HÓA CPU, BỘ NHỚ & TỆP
     * ======================================================================== */
    {
      id: 'operating-system-virtualization',
      ch: 1,
      videos: ['V06'],
      videoHref: '../V06/index.html',
      videoTitle: 'Hệ điều hành: tiến trình, bộ nhớ và hệ thống tệp',
      title: 'Hệ điều hành: Ảo hóa CPU, Bộ nhớ & Hệ thống tệp',
      summary: 'Cách nhân hệ điều hành (kernel) chia sẻ 1 CPU cho nhiều tiến trình xen kẽ (cpu.c OSTEP), cách ly không gian địa chỉ và quản lý tệp.',
      minutes: 7,
      level: 'Cơ bản',
      ref: 'Chương 1 · Hệ điều hành (OSTEP)',
      metrics: [
        { id: 'proc', label: 'TIẾN TRÌNH CHẠY' },
        { id: 'iso', label: 'CÁCH LY BỘ NHỚ' },
        { id: 'mode', label: 'CHẾ ĐỘ CHẠY' },
        { id: 'role', label: 'VAI TRÒ KERNEL' }
      ],
      legend: ['req', 'res', 'msg'],
      goals: [
        { text: 'Phân biệt chương trình (tệp trên đĩa) và tiến trình (đang chạy trong RAM)', step: 0 },
        { text: 'Hiểu ảo hóa CPU qua thí nghiệm cpu.c: nhiều tiến trình in xen kẽ nhờ chuyển ngữ cảnh', step: 1 },
        { text: 'Hiểu ảo hóa bộ nhớ: hai tiến trình cùng thấy một địa chỉ ảo nhưng ánh xạ sang RAM vật lý riêng', step: 2 },
        { text: 'Biết chương trình người dùng gọi lời gọi hệ thống (system call) để nhờ kernel truy cập đĩa và màn hình', step: 3 }
      ],
      steps: [
        {
          short: 'Chương trình → Tiến trình',
          chapter: 'setup',
          title: 'Một tệp chương trình trên đĩa có thể tạo ra nhiều tiến trình độc lập',
          body: [
            'Tệp <code>cpu.exe</code> nằm trên SSD chỉ là dãy mã máy thụ động. Khi bạn chạy nó, hệ điều hành nạp mã vào RAM, cấp ngăn xếp (stack) và bảng quản lý, biến nó thành một <b>tiến trình (process)</b>.',
            'Chạy cùng lúc 3 bản <code>cpu A</code>, <code>cpu B</code>, <code>cpu C</code> sẽ sinh ra 3 tiến trình riêng biệt với PID riêng.'
          ],
          metrics: {
            proc: { val: '3 tiến trình (A, B, C)', level: 'good' },
            iso: { val: 'Độc lập theo PID', level: 'good' },
            mode: { val: 'User Mode', level: '' },
            role: { val: 'Nạp & cấp phát', level: 'good' }
          },
          scene: {
            entities: {
              disk: D.db(-11, 0, 'cpu.exe trên SSD', { color: 'purple', sub: 'Chương trình tĩnh' }),
              os: D.srv(0, 0, ['Nhân Hệ điều hành'], { color: 'orange', glyph: 'gear', sub: 'Tạo 3 Process (PID)' }),
              p1: D.block(11, 4.5, { color: 'blue', label: ['Tiến trình A'] }),
              p2: D.block(11, 0, { color: 'green', label: ['Tiến trình B'] }),
              p3: D.block(11, -4.5, { color: 'teal', label: ['Tiến trình C'] })
            },
            links: {
              d_o: D.link('disk', 'os', { label: 'Nạp mã máy' }),
              o_1: D.link('os', 'p1', { label: 'PID 101' }),
              o_2: D.link('os', 'p2', { label: 'PID 102' }),
              o_3: D.link('os', 'p3', { label: 'PID 103' })
            },
            flows: [
              D.flow(['d_o', 'o_1'], { rate: 1.4, kind: 'req' }),
              D.flow(['d_o', 'o_2'], { rate: 1.4, kind: 'req' }),
              D.flow(['d_o', 'o_3'], { rate: 1.4, kind: 'req' })
            ]
          }
        },
        {
          short: 'Ảo hóa CPU (cpu.c)',
          chapter: 'technique',
          title: 'Thí nghiệm cpu.c (OSTEP): Chia lát thời gian tạo ảo giác chạy song song',
          body: [
            'Dù máy chỉ có ít lõi CPU, chạy đồng thời A, B, C cho thấy màn hình in xen kẽ <code>A · B · C · A · C · B</code>.',
            'Bộ lập lịch của hệ điều hành cắt thời gian thành từng lát rất ngắn (vài mili giây), lưu trạng thái thanh ghi của A rồi nạp trạng thái của B — gọi là <b>chuyển ngữ cảnh</b>.'
          ],
          metrics: {
            proc: { val: 'A, B, C chạy xen kẽ', level: 'good' },
            iso: { val: 'Mỗi tiến trình có PC riêng', level: 'good' },
            mode: { val: 'Time-sharing', level: 'good' },
            role: { val: 'Lập lịch CPU', level: 'good' }
          },
          scene: {
            entities: {
              p1: D.block(-11, 4, { color: 'blue', label: ['Tiến trình A'], sub: 'In "A"' }),
              p2: D.block(-11, -4, { color: 'green', label: ['Tiến trình B'], sub: 'In "B"' }),
              sch: D.lb(0, 0, ['OS Scheduler'], { color: 'orange', sub: 'Chuyển lát thời gian' }),
              cpu: D.srv(11, 0, ['CPU Vật lý'], { color: 'blue', glyph: 'cpu', sub: 'A → B → A → B...' })
            },
            links: {
              l1: D.link('p1', 'sch', { label: 'Lát thời gian 1' }),
              l2: D.link('p2', 'sch', { label: 'Lát thời gian 2' }),
              s_c: D.link('sch', 'cpu', { label: 'Chuyển ngữ cảnh', tone: 'green' })
            },
            flows: [
              D.flow(['l1', 's_c'], { rate: 1.8, kind: 'req' }),
              D.flow(['l2', 's_c'], { rate: 1.8, kind: 'msg' })
            ]
          }
        },
        {
          short: 'Ảo hóa bộ nhớ',
          chapter: 'technique',
          title: 'Không gian địa chỉ riêng: Lỗi ở tiến trình A không làm hỏng RAM của tiến trình B',
          body: [
            'Mỗi tiến trình nhìn thấy một dải <b>địa chỉ ảo</b> riêng biệt. Phần cứng MMU kết hợp bảng trang của kernel ánh xạ địa chỉ ảo của A và B sang các khung RAM vật lý tách rời nhau.',
            'Nếu tiến trình A truy cập sai địa chỉ (ví dụ <code>NULL</code>), kernel lập tức chấm dứt riêng tiến trình A mà không làm sập toàn bộ máy tính.'
          ],
          metrics: {
            proc: { val: 'An toàn chéo tiến trình', level: 'good' },
            iso: { val: 'Bảng trang ảo → vật lý', level: 'good' },
            mode: { val: 'Bảo vệ phần cứng MMU', level: 'good' },
            role: { val: 'Quản lý bộ nhớ', level: 'good' }
          },
          scene: {
            entities: {
              p1: D.block(-11, 4, { color: 'blue', label: ['Tiến trình A'], sub: 'Địa chỉ ảo 0x1000' }),
              p2: D.block(-11, -4, { color: 'green', label: ['Tiến trình B'], sub: 'Địa chỉ ảo 0x1000' }),
              mmu: D.block(0, 0, { color: 'violet', glyph: 'shield', label: ['Kernel + MMU'], sub: 'Ánh xạ trang độc lập' }),
              ram: D.block(11, 0, { color: 'purple', glyph: 'memory', label: ['RAM Vật lý'], sub: 'Khung A ≠ Khung B', tags: [{ text: 'Cách ly hoàn toàn', tone: 'green' }] })
            },
            links: {
              a_m: D.link('p1', 'mmu', { label: '0x1000 (A)' }),
              b_m: D.link('p2', 'mmu', { label: '0x1000 (B)' }),
              m_r: D.link('mmu', 'ram', { label: 'Hai khung vật lý khác nhau', tone: 'green' })
            },
            flows: [
              D.flow(['a_m', 'm_r'], { rate: 1.6, kind: 'req' }),
              D.flow(['b_m', 'm_r'], { rate: 1.6, kind: 'res' })
            ]
          }
        },
        {
          short: 'Lời gọi hệ thống & Tệp',
          chapter: 'summary',
          title: 'System Call: Cầu nối an toàn khi printf() hay chương trình đọc ghi đĩa',
          body: [
            'Chương trình C chạy ở chế độ người dùng (User Mode) không được phép ghi trực tiếp lên màn hình hay ổ SSD. Hàm <code>printf()</code> hay <code>scanf()</code> bên trong sẽ phát <b>lời gọi hệ thống</b> sang <b>nhân hệ điều hành (Kernel Mode)</b>.',
            'Nhân kiểm tra quyền hạn, điều khiển thiết bị qua trình điều khiển (driver) và tổ chức dữ liệu bền vững thành <b>hệ thống tệp</b> (thư mục, tệp).'
          ],
          metrics: {
            proc: { val: 'User → Kernel', level: 'good' },
            iso: { val: 'Phân quyền phần cứng', level: 'good' },
            mode: { val: 'System Call (write/read)', level: 'good' },
            role: { val: 'Quản lý I/O & Tệp', level: 'good' }
          },
          scene: {
            entities: {
              app: D.srv(-11, 0, ['Chương trình C'], { color: 'blue', sub: 'User Mode · printf()' }),
              ker: D.srv(0, 0, ['Nhân Hệ điều hành'], { color: 'orange', glyph: 'shield', sub: 'Kernel Mode · Driver' }),
              hw: D.db(10, 0, 'Màn hình & Đĩa', { color: 'green', sub: 'Phần cứng' })
            },
            links: {
              a_k: D.link('app', 'ker', { label: 'System call write()', tone: 'green' }),
              k_h: D.link('ker', 'hw', { label: 'Điều khiển phần cứng', tone: 'green' })
            },
            flows: [D.flow(['a_k', 'k_h'], { rate: 1.8, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 2 — 5. THUẬT TOÁN EUCLID & ĐỘ PHỨC TẠP O(n) VS O(log n)
     * ======================================================================== */
    {
      id: 'algorithm-complexity',
      ch: 2,
      videos: ['V07', 'V08'],
      videoHref: '../V08/index.html',
      videoTitle: 'Thuật toán: độ phức tạp tính toán',
      title: 'Thuật toán Euclid & Độ phức tạp O(n) vs O(log n)',
      summary: 'Theo dấu bảng vết thuật toán Euclid (1071, 462 → 21) và thấy sự bùng nổ khác biệt giữa tìm tuần tự O(n) và chia đôi O(log n).',
      minutes: 8,
      level: 'Cơ bản',
      ref: 'Chương 2 · Thuật toán & Độ phức tạp (Knuth, Bentley)',
      metrics: [
        { id: 'n', label: 'KÍCH THƯỚC DỮ LIỆU n' },
        { id: 'steps', label: 'SỐ PHÉP SO SÁNH' },
        { id: 'bigO', label: 'ĐỘ PHỨC TẠP' },
        { id: 'scale', label: 'KHI TĂNG 1000 LẦN' }
      ],
      legend: ['req', 'res', 'heavy'],
      goals: [
        { text: 'Nắm 5 tính chất của thuật toán qua bảng vết Euclid tìm ước chung lớn nhất', step: 0 },
        { text: 'Thấy giới hạn của tìm kiếm tuần tự O(n) khi danh bạ tăng lên một tỷ mục', step: 1 },
        { text: 'Thấy sức mạnh chia đôi không gian tìm kiếm O(log n): một tỷ mục chỉ cần tối đa 30 bước', step: 2 },
        { text: 'Biết thí nghiệm nhân đôi đầu vào (doubling) để phân biệt O(n) với O(n²)', step: 3 }
      ],
      steps: [
        {
          short: 'Bảng vết Euclid',
          chapter: 'setup',
          title: 'Thuật toán Euclid (Knuth): Chia lấy dư rút gọn nhanh tới ước chung lớn nhất',
          body: [
            'Để tìm ước chung lớn nhất của <code>1071</code> và <code>462</code>: bản trừ liên tiếp mất 11 bước, còn bản chia lấy dư <code>r = a % b</code> chỉ mất <b>3 bước</b>:',
            '<code>(1071, 462) → dư 147</code> · <code>(462, 147) → dư 21</code> · <code>(147, 21) → dư 0</code> → kết luận <b>21</b> (luôn hữu hạn, xác định, có đầu vào và đầu ra rõ).'
          ],
          metrics: {
            n: { val: 'a=1071, b=462', level: '' },
            steps: { val: '3 phép chia dư', level: 'good' },
            bigO: { val: 'O(log min(a,b))', level: 'good' },
            scale: { val: 'Tăng rất chậm', level: 'good' }
          },
          scene: {
            entities: {
              s1: D.block(-11, 0, { color: 'blue', glyph: 'code', label: ['1071 % 462'], sub: 'r = 147' }),
              s2: D.block(0, 0, { color: 'teal', glyph: 'code', label: ['462 % 147'], sub: 'r = 21' }),
              s3: D.block(11, 0, { color: 'green', glyph: 'check', label: ['147 % 21 = 0'], sub: 'Kết quả = 21', tags: [{ text: 'Dừng sau 3 bước', tone: 'green' }] })
            },
            links: {
              l1: D.link('s1', 's2', { label: 'a←462, b←147', tone: 'green' }),
              l2: D.link('s2', 's3', { label: 'a←147, b←21', tone: 'green' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 1.6, kind: 'res' })]
          }
        },
        {
          short: 'Tìm tuần tự O(n)',
          chapter: 'problem',
          title: 'Lật từng trang danh bạ: Một tỷ tên tốn trung bình 500 triệu phép so sánh',
          body: [
            'Bài toán tìm tên trong danh bạ (Bentley): nếu đi lần lượt từ trang đầu đến trang cuối, trường hợp xấu nhất phải kiểm tra đủ <code>n</code> mục.',
            'Với <code>n = 1 000</code> còn nhanh, nhưng khi <code>n = 1 000 000 000</code> (một tỷ), số bước tăng tuyến tính thành <b>1 tỷ bước</b>.'
          ],
          metrics: {
            n: { val: '1 000 000 000', level: 'warn' },
            steps: { val: 'Tới 1 000 000 000', level: 'bad' },
            bigO: { val: 'O(n) tuyến tính', level: 'bad' },
            scale: { val: 'Chậm hơn 1 000 lần', level: 'bad' }
          },
          scene: {
            entities: {
              q: D.dev(-11, 0, 'Cần tìm "Hùng"'),
              arr: D.queue(0, 0, 'Danh bạ 1 tỷ mục', { n: 6, slots: 6, color: 'red', tags: [{ text: 'Duyệt từng mục 0→n-1', tone: 'red' }] }),
              res: D.block(11, 0, { color: 'red', heat: 0.7, label: ['1 tỷ phép so sánh'], sub: 'Tăng tuyến tính theo n' })
            },
            links: {
              l1: D.link('q', 'arr', { label: 'Quét tuần tự', tone: 'red' }),
              l2: D.link('arr', 'res', { label: 'Chi phí O(n)', tone: 'red' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 2.4, kind: 'heavy' })]
          }
        },
        {
          short: 'Mở đôi O(log n)',
          chapter: 'technique',
          title: 'Danh bạ đã sắp xếp: Mở đúng giữa loại bỏ ngay một nửa sau mỗi bước',
          body: [
            'Khi danh bạ đã sắp theo thứ tự chữ cái, mỗi lần mở ở giữa ta loại thẳng 50% số trang còn lại: <code>1 tỷ → 500 triệu → 250 triệu → … → 1</code>.',
            'Vì <code>2³⁰ > 1 tỷ</code>, tìm trong <b>1 tỷ tên</b> chỉ mất tối đa <b>30 phép so sánh</b> — nhanh hơn thuật toán tuyến tính hàng chục triệu lần!'
          ],
          callout: {
            kind: 'insight',
            text: 'Thuật toán tốt đánh bại phần cứng mạnh: máy tính chậm chạy thuật toán <code>O(log n)</code> vẫn vượt xa siêu máy tính chạy <code>O(n)</code> hay <code>O(n²)</code> khi <code>n</code> đủ lớn.'
          },
          metrics: {
            n: { val: '1 000 000 000', level: 'good' },
            steps: { val: 'Tối đa 30 bước!', level: 'good' },
            bigO: { val: 'O(log n)', level: 'good' },
            scale: { val: 'Chỉ thêm ~10 bước', level: 'good' }
          },
          scene: {
            entities: {
              s1: D.block(-11, 0, { color: 'blue', label: ['1 000 000 000'], sub: 'Bước 1: bỏ nửa sai' }),
              s2: D.block(0, 0, { color: 'teal', label: ['500 000 000'], sub: 'Bước 2 → 250 triệu...' }),
              s3: D.block(11, 0, { color: 'green', glyph: 'check', label: ['Còn 1 mục duy nhất'], sub: 'Sau ≤ 30 bước!', tags: [{ text: 'O(log₂ n)', tone: 'green' }] })
            },
            links: {
              l1: D.link('s1', 's2', { label: 'Chia 2', tone: 'green' }),
              l2: D.link('s2', 's3', { label: 'Chia 2 liên tiếp', tone: 'green' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 2.2, kind: 'res' })]
          }
        },
        {
          short: 'Thí nghiệm nhân đôi O(n²)',
          chapter: 'summary',
          title: 'Đo thực tế với TwoSum: Nhân đôi n làm thời gian O(n²) tăng gấp 4 lần',
          body: [
            'Với thuật toán hai vòng lặp lồng nhau kiểm tra mọi cặp phần tử (<code>TwoSum</code>, Sedgewick & Wayne), số phép tính tỷ lệ với <code>n² / 2</code>.',
            'Khi nhân đôi đầu vào <code>n → 2n</code>, thời gian chạy tăng gần đúng <b>4 lần</b> (tỷ lệ thực đo quanh 4,0) — dấu hiệu thực nghiệm trực quan để nhận diện độ phức tạp bậc hai <b><code>O(n²)</code></b>.'
          ],
          metrics: {
            n: { val: 'n → 2n → 4n', level: '' },
            steps: { val: 'Tỷ lệ thời gian ≈ 4×', level: 'warn' },
            bigO: { val: 'O(n²) bậc hai', level: 'warn' },
            scale: { val: '1000× n → 1 000 000× t', level: 'bad' }
          },
          scene: {
            entities: {
              o1: D.block(-11, 0, { color: 'green', label: ['O(log n)'], sub: '2n → +1 bước' }),
              on: D.block(0, 0, { color: 'amber', label: ['O(n)'], sub: '2n → thời gian ×2' }),
              on2: D.block(11, 0, { color: 'red', heat: 0.65, label: ['O(n²)'], sub: '2n → thời gian ×4!', tags: [{ text: 'Hai vòng lặp lồng', tone: 'red' }] })
            },
            links: {
              l1: D.link('o1', 'on', { label: 'Chậm dần' }),
              l2: D.link('on', 'on2', { label: 'Bùng nổ khi n lớn', tone: 'red' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 1.6, kind: 'heavy' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 2 — 6. CHUỖI BIÊN DỊCH GCC & KIỂM THỬ TỰ ĐỘNG
     * ======================================================================== */
    {
      id: 'gcc-compilation-testing',
      ch: 2,
      videos: ['V09', 'V10', 'V11'],
      videoHref: '../V09/index.html',
      videoTitle: 'Trình biên dịch: từ mã nguồn đến tệp thực thi',
      title: 'Hệ thống biên dịch GCC (-E, -S, -c, Linker) & Kiểm thử',
      summary: 'Hành trình tệp hello.c qua 4 công đoạn của GCC (CS:APP), các pha phân tích của trình biên dịch và bộ chấm tự động AC/WA/TLE/CE.',
      minutes: 8,
      level: 'Cơ bản',
      ref: 'Chương 2 · Trình biên dịch & Kiểm thử (CS:APP, Myers)',
      metrics: [
        { id: 'cmd', label: 'TÙY CHỌN GCC' },
        { id: 'file', label: 'TỆP ĐẦU RA' },
        { id: 'err', label: 'LOẠI LỖI PHÁT HIỆN' },
        { id: 'verdict', label: 'KẾT QUẢ CHẤM' }
      ],
      legend: ['req', 'res', 'msg', 'kill'],
      goals: [
        { text: 'Nắm trọn 4 bước của hệ thống biên dịch C: tiền xử lý (-E), biên dịch (-S), hợp dịch (-c), liên kết', step: 0 },
        { text: 'Biết các pha bên trong trình biên dịch (từ vựng, cú pháp, ngữ nghĩa) bắt lỗi nào trước khi chạy', step: 1 },
        { text: 'Hiểu vai trò trình liên kết (Linker) ghép hello.o với hàm thư viện chuẩn printf', step: 2 },
        { text: 'Thiết kế ca kiểm thử biên (bài toán tam giác Myers) và phân biệt AC, WA, TLE, RE, CE', step: 3 }
      ],
      steps: [
        {
          short: 'Tiền xử lý (-E)',
          chapter: 'setup',
          title: 'Bước 1 — Tiền xử lý (gcc -E): Dán toàn bộ nội dung <stdio.h> vào hello.i',
          body: [
            'Lệnh <code>gcc -E hello.c -o hello.i</code> xử lý các chỉ thị bắt đầu bằng dấu <code>#</code>: mở rộng <code>#include &lt;stdio.h&gt;</code>, thay thế <code>#define</code> và bỏ chú thích.',
            'Tệp <code>hello.i</code> vẫn là mã nguồn C thuần văn bản nhưng dài ra hàng trăm dòng vì đã chứa khai báo của <code>printf</code>.'
          ],
          metrics: {
            cmd: { val: 'gcc -E hello.c -o hello.i', level: '' },
            file: { val: 'hello.i (văn bản C)', level: 'good' },
            err: { val: 'Thiếu tệp header', level: '' },
            verdict: { val: 'Đang biên dịch', level: '' }
          },
          scene: {
            entities: {
              src: D.block(-11, 3.5, { color: 'blue', glyph: 'code', label: ['hello.c'], sub: '#include <stdio.h>' }),
              hdr: D.block(-11, -3.5, { color: 'gray', glyph: 'code', label: ['stdio.h'], sub: 'Khai báo printf' }),
              cpp: D.srv(0, 0, ['Tiền xử lý (cpp)'], { color: 'teal', glyph: 'gear', sub: 'gcc -E' }),
              out: D.block(11, 0, { color: 'green', glyph: 'code', label: ['hello.i'], sub: 'Mã C đã mở rộng' })
            },
            links: {
              s_c: D.link('src', 'cpp', { label: 'Mã nguồn' }),
              h_c: D.link('hdr', 'cpp', { label: 'Chèn #include', dashed: true }),
              c_o: D.link('cpp', 'out', { label: 'Sinh hello.i', tone: 'green' })
            },
            flows: [D.flow(['s_c', 'c_o'], { rate: 1.8, kind: 'req' })]
          }
        },
        {
          short: 'Biên dịch (-S) & Pha phân tích',
          chapter: 'technique',
          title: 'Bước 2 — Trình biên dịch (gcc -S): Từ vựng → Cú pháp → Ngữ nghĩa → Hợp ngữ hello.s',
          body: [
            'Trình biên dịch tách mã thành <b>token</b>, dựng <b>cây cú pháp</b>, kiểm tra kiểu dữ liệu (bắt lỗi gõ sai tên biến <code>count</code> hay thiếu dấu <code>;</code> ngay lúc này), tối ưu rồi sinh mã hợp ngữ <code>hello.s</code>.',
            'Khác với Python (trình thông dịch chạy đến dòng lỗi mới dừng), GCC từ chối tạo tệp thực thi nếu còn bất kỳ lỗi biên dịch nào.'
          ],
          callout: {
            kind: 'tip',
            text: 'Luôn biên dịch với <code>gcc -std=c17 -Wall -Wextra</code> để trình biên dịch cảnh báo sớm biến chưa khởi tạo, so sánh sai kiểu hoặc thiếu <code>return</code>.'
          },
          metrics: {
            cmd: { val: 'gcc -S hello.i -o hello.s', level: 'good' },
            file: { val: 'hello.s (hợp ngữ x86-64)', level: 'good' },
            err: { val: 'Lỗi cú pháp / kiểu → CE', level: 'warn' },
            verdict: { val: 'Qua kiểm tra tĩnh', level: 'good' }
          },
          scene: {
            entities: {
              hi: D.block(-11, 0, { color: 'blue', glyph: 'code', label: ['hello.i'], sub: 'position = init + rate * 60' }),
              cc: D.srv(0, 0, ['Trình biên dịch (cc1)'], { color: 'violet', glyph: 'cpu', sub: 'Token → AST → Type → Opt', tags: [{ text: '-Wall -Wextra', tone: 'violet' }] }),
              hs: D.block(11, 0, { color: 'green', glyph: 'terminal', label: ['hello.s'], sub: 'Hợp ngữ (mov, add, call)' })
            },
            links: {
              i_c: D.link('hi', 'cc', { label: 'Phân tích & kiểm kiểu' }),
              c_s: D.link('cc', 'hs', { label: 'Sinh hợp ngữ', tone: 'green' })
            },
            flows: [D.flow(['i_c', 'c_s'], { rate: 1.8, kind: 'msg' })]
          }
        },
        {
          short: 'Hợp dịch (-c) & Liên kết',
          chapter: 'technique',
          title: 'Bước 3 & 4 — Hợp dịch (hello.o) và Liên kết (Linker) thành hello.exe',
          body: [
            'Trình hợp dịch (<code>gcc -c</code>) dịch <code>hello.s</code> thành tệp đối tượng mã máy <code>hello.o</code>, trong đó ký hiệu <code>printf</code> tạm mang nhãn <code>U</code> (chưa định nghĩa).',
            '<b>Trình liên kết (Linker)</b> nối <code>hello.o</code> với thư viện chuẩn C (UCRT trên Windows / libc trên Linux) để hoàn thiện địa chỉ <code>printf</code> và xuất ra tệp chạy được <code>hello.exe</code>.'
          ],
          metrics: {
            cmd: { val: 'gcc -c → ld (Linker)', level: 'good' },
            file: { val: 'hello.o → hello.exe', level: 'good' },
            err: { val: 'Undefined reference', level: 'warn' },
            verdict: { val: 'Tệp thực thi hoàn chỉnh', level: 'good' }
          },
          scene: {
            entities: {
              ho: D.block(-11, 3.5, { color: 'blue', glyph: 'code', label: ['hello.o'], sub: 'Mã máy (U printf)' }),
              lib: D.db(-11, -3.5, 'Thư viện chuẩn C', { color: 'purple', sub: 'Cung cấp printf, qsort' }),
              ld: D.srv(0, 0, ['Trình liên kết (ld)'], { color: 'orange', glyph: 'layers', sub: 'Ghép mã & giải ký hiệu' }),
              exe: D.block(11, 0, { color: 'green', glyph: 'check', label: ['hello.exe'], sub: 'Chạy trực tiếp trên OS', tags: [{ text: 'Mã máy sẵn sàng', tone: 'green' }] })
            },
            links: {
              o_l: D.link('ho', 'ld', { label: 'Tệp đối tượng' }),
              b_l: D.link('lib', 'ld', { label: 'Hàm thư viện', dashed: true }),
              l_e: D.link('ld', 'exe', { label: 'Xuất tệp thực thi', tone: 'green' })
            },
            flows: [
              D.flow(['o_l', 'l_e'], { rate: 1.8, kind: 'req' }),
              D.flow(['b_l', 'l_e'], { rate: 1.4, kind: 'res' })
            ]
          }
        },
        {
          short: 'Kiểm thử & Bộ chấm tự động',
          chapter: 'summary',
          title: 'Biên dịch xong chưa chắc đúng: Bộ ca kiểm thử Myers & phán quyết AC/WA/TLE',
          body: [
            'Bài toán tam giác của Myers đòi hỏi thử đủ mọi nhánh và <b>giá trị biên</b>: tam giác đều (<code>2 2 2</code>), cân, thường, và không phải tam giác (<code>1 2 3</code> — trường hợp <code>a + b == c</code> rất dễ bỏ sót!).',
            'Bộ chấm tự động biên dịch (lỗi → <b>CE</b>), chạy từng tệp đầu vào kèm giới hạn thời gian (quá giờ → <b>TLE</b>, sập → <b>RE</b>) và so khớp đầu ra (sai → <b>WA</b>, đúng hết → <b>AC</b>).'
          ],
          metrics: {
            cmd: { val: 'Chạy N tệp kiểm thử', level: 'good' },
            file: { val: 'stdin → stdout so khớp', level: 'good' },
            err: { val: 'CE · RE · TLE · WA', level: 'warn' },
            verdict: { val: 'AC (Accepted)', level: 'good' }
          },
          scene: {
            entities: {
              tc: D.queue(-11, 0, 'Bộ ca kiểm thử (biên)', { n: 5, slots: 6, color: 'blue', tags: [{ text: '2 2 2 · 1 2 3 · 3 4 5', tone: 'blue' }] }),
              run: D.srv(0, 0, ['Bộ chấm tự động'], { color: 'teal', glyph: 'terminal', sub: 'Chạy hello.exe + hẹn giờ' }),
              ok: D.block(11, 3.5, { color: 'green', glyph: 'check', label: ['AC (Đúng hết)'], sub: 'Khớp toàn bộ test' }),
              err: D.block(11, -3.5, { color: 'red', glyph: 'alert', label: ['WA / TLE / RE / CE'], sub: 'Phát hiện ca sai cụ thể' })
            },
            links: {
              t_r: D.link('tc', 'run', { label: 'Nạp đầu vào' }),
              r_o: D.link('run', 'ok', { label: 'Đầu ra khớp', tone: 'green' }),
              r_e: D.link('run', 'err', { label: 'Sai biên / quá giờ', tone: 'red', dashed: true })
            },
            flows: [D.flow(['t_r', 'r_o'], { rate: 2.0, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 3 — 7. NGÔN NGỮ LẬP TRÌNH, CẤU TRÚC VS OOP & THƯ VIỆN CHUẨN
     * ======================================================================== */
    {
      id: 'languages-paradigms-libs',
      ch: 3,
      videos: ['V12', 'V13', 'V14'],
      videoHref: '../V13/index.html',
      videoTitle: 'Ngôn ngữ: lập trình cấu trúc và lập trình hướng đối tượng',
      title: 'Từ Mã máy tới C/Python, Lập trình cấu trúc & Thư viện',
      summary: 'Mức trừu tượng của các ngôn ngữ, cấu trúc điều khiển sạch không goto, sự khác biệt giữa C và OOP, cùng bài học thư viện chuẩn & left-pad.',
      minutes: 7,
      level: 'Cơ bản',
      ref: 'Chương 3 · Các ngôn ngữ lập trình & Thư viện',
      metrics: [
        { id: 'lvl', label: 'MỨC TRỪU TƯỢNG' },
        { id: 'style', label: 'MÔ HÌNH LẬP TRÌNH' },
        { id: 'ctrl', label: 'KIỂM SOÁT DỮ LIỆU' },
        { id: 'dep', label: 'PHỤ THUỘC THƯ VIỆN' }
      ],
      legend: ['req', 'res', 'msg', 'kill'],
      goals: [
        { text: 'So sánh cùng một phép tính ở mã máy, hợp ngữ, C (biên dịch) và Python (thông dịch)', step: 0 },
        { text: 'Hiểu định lý Böhm–Jacopini: tuần tự, rẽ nhánh và vòng lặp đủ thay thế mọi lệnh goto rối rắm', step: 1 },
        { text: 'Phân biệt hàm tách rời dữ liệu (C cấu trúc) với đóng gói dữ liệu + phương thức (OOP)', step: 2 },
        { text: 'Biết tận dụng thư viện chuẩn (qsort) và quản trị rủi ro gói ngoài qua sự cố left-pad (2016)', step: 3 }
      ],
      steps: [
        {
          short: 'Thang mức trừu tượng',
          chapter: 'setup',
          title: 'Càng lên bậc cao càng gần tư duy con người, đổi lại thêm tầng dịch',
          body: [
            'Cùng một phép cộng hai số: ở <b>mã máy</b> là dãy số <code>190</code>, ở <b>hợp ngữ</b> là <code>addl %eax, %edx</code> gắn chặt kiến trúc CPU, ở <b>C</b> là <code>c = a + b;</code> biên dịch ra mã máy cực nhanh, còn ở <b>Python</b> chạy qua trình thông dịch ngắn gọn hơn nhưng chậm hơn.',
            'C nằm ở "điểm ngọt" sát phần cứng nhưng vẫn khả chuyển giữa nhiều dòng CPU.'
          ],
          metrics: {
            lvl: { val: 'Mã máy → Hợp ngữ → C → Python', level: 'good' },
            style: { val: 'Biên dịch vs Thông dịch', level: '' },
            ctrl: { val: 'C sát phần cứng', level: 'good' },
            dep: { val: 'Chuẩn ISO C17', level: 'good' }
          },
          scene: {
            entities: {
              py: D.block(-11, 0, { color: 'amber', glyph: 'code', label: ['Python / Java'], sub: 'Trừu tượng cao · VM' }),
              c: D.block(0, 0, { color: 'green', glyph: 'code', label: ['Ngôn ngữ C17'], sub: 'Sát phần cứng · Tốc độ cao', tags: [{ text: 'Biên dịch thẳng mã máy', tone: 'green' }] }),
              hw: D.srv(11, 0, ['Hợp ngữ & Mã máy'], { color: 'purple', glyph: 'cpu', sub: 'x86-64 / ARM / RISC-V' })
            },
            links: {
              p_c: D.link('py', 'c', { label: 'Gần phần cứng hơn' }),
              c_h: D.link('c', 'hw', { label: 'GCC dịch trực tiếp', tone: 'green' })
            },
            flows: [D.flow(['p_c', 'c_h'], { rate: 1.8, kind: 'req' })]
          }
        },
        {
          short: 'Lập trình cấu trúc',
          chapter: 'technique',
          title: 'Ba khối cấu trúc (Tuần tự · Rẽ nhánh · Lặp) loại bỏ "mã mì ống" goto',
          body: [
            'Định lý <b>Böhm–Jacopini (1966)</b> chứng minh mọi thuật toán đều viết được chỉ với 3 cấu trúc có một lối vào và một lối ra: <b>tuần tự</b>, <b>rẽ nhánh (<code>if/else</code>)</b> và <b>vòng lặp (<code>while/for</code>)</b>.',
            'Kết hợp phân rã từ trên xuống (Wirth) chia bài toán lớn thành các hàm nhỏ dễ đọc, dễ chứng minh đúng.'
          ],
          metrics: {
            lvl: { val: 'Cấu trúc rõ ràng', level: 'good' },
            style: { val: 'Lập trình cấu trúc', level: 'good' },
            ctrl: { val: 'Một lối vào · một lối ra', level: 'good' },
            dep: { val: 'Không cần goto nhảy rối', level: 'good' }
          },
          scene: {
            entities: {
              seq: D.block(-11, 0, { color: 'blue', glyph: 'layers', label: ['1. Tuần tự'], sub: 'Lệnh nối lệnh' }),
              br: D.block(0, 0, { color: 'amber', glyph: 'layers', label: ['2. Rẽ nhánh'], sub: 'if / else / switch' }),
              lp: D.block(11, 0, { color: 'green', glyph: 'replay', label: ['3. Vòng lặp'], sub: 'while / for / do-while', tags: [{ text: 'Đủ cho mọi chương trình', tone: 'green' }] })
            },
            links: {
              l1: D.link('seq', 'br', { label: 'Ghép khối' }),
              l2: D.link('br', 'lp', { label: 'Lồng nhau có kỷ luật', tone: 'green' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 1.6, kind: 'res' })]
          }
        },
        {
          short: 'C cấu trúc vs OOP',
          chapter: 'technique',
          title: 'Tài khoản ngân hàng: Hàm C thao tác struct công khai vs Lớp OOP đóng gói số dư',
          body: [
            'Trong <b>C</b>, dữ liệu (<code>struct Account { double balance; }</code>) và các hàm <code>withdraw(&acc, 50)</code> tách rời nhau — bất kỳ hàm nào cũng có thể sửa thẳng <code>acc.balance = -999</code>.',
            'Trong <b>lập trình hướng đối tượng (Java/C++)</b>, lớp <code>Account</code> giấu <code>private balance</code> bên trong đối tượng và chỉ cho phép thay đổi qua phương thức kiểm tra hợp lệ.'
          ],
          metrics: {
            lvl: { val: 'Đóng gói (Encapsulation)', level: 'good' },
            style: { val: 'Cấu trúc vs Hướng đối tượng', level: '' },
            ctrl: { val: 'private bảo vệ bất biến', level: 'good' },
            dep: { val: 'Nền cho môn OOP sau này', level: 'good' }
          },
          scene: {
            entities: {
              c_fn: D.block(-10, 3.5, { color: 'blue', label: ['Hàm C: withdraw()'], sub: 'Tách rời dữ liệu' }),
              c_st: D.block(-10, -3.5, { color: 'amber', label: ['struct Account'], sub: 'balance công khai' }),
              oop: D.srv(9, 0, ['Đối tượng Account (OOP)'], { color: 'green', glyph: 'shield', sub: 'private balance + withdraw()', tags: [{ text: 'Đóng gói dữ liệu & hành vi', tone: 'green' }] })
            },
            links: {
              fc: D.link('c_fn', 'c_st', { label: 'Truyền &acc' }),
              cmp: D.link('c_st', 'oop', { label: 'Tiến hóa đóng gói', dashed: true })
            },
            flows: [D.flow(['fc'], { rate: 1.6, kind: 'req' })]
          }
        },
        {
          short: 'Thư viện chuẩn & left-pad',
          chapter: 'summary',
          title: 'Ưu tiên thư viện chuẩn (qsort) và thận trọng với chuỗi phụ thuộc gói ngoài',
          body: [
            'Thay vì tự viết lại thuật toán sắp xếp nhanh dễ sai, lập trình viên C gọi thẳng <code>qsort()</code> trong <code>&lt;stdlib.h&gt;</code> — kiểm thử bằng <code>nm</code> và <code>objdump</code> cho thấy trình liên kết tự nối nó từ thư viện chuẩn của hệ thống.',
            'Ngược lại, sự cố <b>left-pad (2016)</b> cho thấy việc phụ thuộc mù quáng vào một gói ngoài chỉ dài 11 dòng mã có thể làm gãy bản build của hàng nghìn dự án lớn.'
          ],
          callout: {
            kind: 'warn',
            text: 'Nguyên tắc thực tế: <b>dùng thư viện chuẩn trước</b>; chỉ cài gói ngoài khi thật sự có giá trị lớn và luôn khóa phiên bản.'
          },
          metrics: {
            lvl: { val: 'Tái sử dụng an toàn', level: 'good' },
            style: { val: 'Thư viện chuẩn & Package', level: 'good' },
            ctrl: { val: 'Giảm rủi ro chuỗi cung ứng', level: 'good' },
            dep: { val: 'qsort (<stdlib.h>)', level: 'good' }
          },
          scene: {
            entities: {
              app: D.srv(-11, 0, ['Ứng dụng của bạn'], { color: 'blue', sub: 'Gọi qsort()' }),
              std: D.block(1, 4, { color: 'green', glyph: 'shield', label: ['Thư viện chuẩn C'], sub: 'stdlib.h · string.h · math.h', tags: [{ text: 'Ổn định lâu dài', tone: 'green' }] }),
              pkg: D.block(1, -4, { color: 'red', glyph: 'alert', label: ['Gói ngoài left-pad'], sub: '11 dòng bị gỡ → gãy build!', heat: 0.55 }),
              out: D.block(12, 0, { color: 'green', glyph: 'check', label: ['Bản build bền vững'], sub: 'Ít phụ thuộc thừa' })
            },
            links: {
              a_s: D.link('app', 'std', { label: 'Ưu tiên dùng sẵn', tone: 'green' }),
              s_o: D.link('std', 'out', { label: 'Liên kết tin cậy', tone: 'green' }),
              a_p: D.link('app', 'pkg', { label: 'Phụ thuộc mong manh', tone: 'red', dashed: true, fail: 0.7 })
            },
            flows: [
              D.flow(['a_s', 's_o'], { rate: 2.0, kind: 'res' }),
              D.flow(['a_p'], { rate: 0.9, kind: 'kill', fail: 0.7 })
            ]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 4 — 8. BIẾN, KIỂU DỮ LIỆU, RẼ NHÁNH & VÒNG LẶP C
     * ======================================================================== */
    {
      id: 'c-control-flow',
      ch: 4,
      videos: ['V15', 'V16', 'V17', 'V18', 'V19', 'V20', 'V21', 'V22', 'V23'],
      videoHref: '../V19/index.html',
      videoTitle: 'Rẽ nhánh: câu lệnh if, else và chuỗi else-if',
      title: 'Kiểu dữ liệu, Rẽ nhánh & Vòng lặp trong C',
      summary: 'Tránh bẫy chia nguyên 5/9 và tràn int, phân nhánh đúng thứ tự (tam giác Myers), vai trò break trong switch và bảng vết vòng lặp.',
      minutes: 8,
      level: 'Cơ bản',
      ref: 'Chương 4 · Ngôn ngữ lập trình C cơ bản (K&R, King)',
      metrics: [
        { id: 'type', label: 'PHÉP TÍNH / KIỂU' },
        { id: 'cond', label: 'ĐIỀU KIỆN KIỂM TRA' },
        { id: 'loop', label: 'SỐ LẦN LẶP' },
        { id: 'trap', label: 'BẪY CẦN TRÁNH' }
      ],
      legend: ['req', 'res', 'kill'],
      goals: [
        { text: 'Phân biệt chia nguyên 5 / 9 == 0 với chia thực 5.0 / 9.0 và nguy cơ tràn INT_MAX', step: 0 },
        { text: 'Sắp xếp thứ tự nhánh if / else-if hợp lý (kiểm tra đều trước cân ở bài toán tam giác)', step: 1 },
        { text: 'Hiểu cơ chế fall-through và vai trò bắt buộc của break trong câu lệnh switch', step: 2 },
        { text: 'Chọn đúng while, for hay do-while (ví dụ đếm chữ số của n = 0 cần chạy ít nhất 1 lần)', step: 3 }
      ],
      steps: [
        {
          short: 'Bẫy chia nguyên & tràn số',
          chapter: 'problem',
          title: 'Đổi nhiệt độ K&R: 5 / 9 bằng 0 với số nguyên, và 50000 * 50000 tràn int!',
          body: [
            'Trong C, toán tử <code>/</code> giữa hai số nguyên cắt bỏ phần thập phân: <code>5 / 9</code> cho kết quả đúng bằng <code>0</code> khiến cả bảng nhiệt độ biến thành 0°C.',
            'Viết <code>5.0 / 9.0 * (fahr - 32)</code> ép sang kiểu <code>double</code>. Đồng thời kiểu <code>int</code> 32 bit chỉ chứa tối đa <code>2 147 483 647</code> — nhân <code>50000 * 50000</code> gây hành vi không xác định (cần dùng <code>long long</code>).'
          ],
          metrics: {
            type: { val: '5/9 = 0 vs 5.0/9.0', level: 'warn' },
            cond: { val: 'sizeof(int) = 4 byte', level: '' },
            loop: { val: 'Kiểm tra kiểu trước', level: '' },
            trap: { val: 'Tràn số nguyên có dấu', level: 'bad' }
          },
          scene: {
            entities: {
              bad: D.block(-10, 3.5, { color: 'red', glyph: 'alert', label: ['5 / 9 * (f - 32)'], sub: 'Chia nguyên → luôn = 0!' }),
              ok: D.block(-10, -3.5, { color: 'green', glyph: 'check', label: ['5.0 / 9.0 * (f - 32)'], sub: 'Số thực double chính xác' }),
              out: D.srv(10, 0, ['Bảng độ C (printf)'], { color: 'blue', sub: '100°F → 37.78°C', tags: [{ text: 'Định dạng %.2f', tone: 'green' }] })
            },
            links: {
              b_o: D.link('bad', 'out', { label: 'Sai: 0.00°C', tone: 'red', dashed: true, fail: 0.7 }),
              g_o: D.link('ok', 'out', { label: 'Đúng: 37.78°C', tone: 'green' })
            },
            flows: [
              D.flow(['g_o'], { rate: 1.8, kind: 'res' }),
              D.flow(['b_o'], { rate: 0.9, kind: 'kill', fail: 0.7 })
            ]
          }
        },
        {
          short: 'Thứ tự nhánh if / else-if',
          chapter: 'technique',
          title: 'Tam giác của Myers: Kiểm tra điều kiện chặt trước điều kiện rộng',
          body: [
            'Mọi tam giác đều (<code>2 2 2</code>) cũng thỏa điều kiện tam giác cân (có ít nhất hai cạnh bằng nhau). Nếu đặt nhánh kiểm tra cân lên trước nhánh đều, ca <code>2 2 2</code> sẽ bị phân loại nhầm thành cân (<b>WA</b>)!',
            'Thứ tự đúng: (1) loại không phải tam giác (<code>a + b <= c</code>) → (2) đều → (3) cân → (4) thường.'
          ],
          metrics: {
            type: { val: '3 cạnh a, b, c', level: '' },
            cond: { val: 'Loại sai → Đều → Cân', level: 'good' },
            loop: { val: '1 nhánh duy nhất chạy', level: 'good' },
            trap: { val: 'Đảo thứ tự Đều / Cân', level: 'warn' }
          },
          scene: {
            entities: {
              inp: D.dev(-11, 0, 'Đầu vào: 2, 2, 2'),
              c1: D.block(-1, 4.5, { color: 'amber', label: ['1. Hợp lệ?'], sub: 'a+b>c && ... → Đúng' }),
              c2: D.block(-1, -1.5, { color: 'green', label: ['2. a==b && b==c?'], sub: 'Khớp trước nhánh Cân!', tags: [{ text: 'Đúng thứ tự', tone: 'green' }] }),
              res: D.block(11, 0, { color: 'green', glyph: 'check', label: ['EQUILATERAL'], sub: 'Tam giác đều (AC)' })
            },
            links: {
              i_1: D.link('inp', 'c1', { label: 'Kiểm bất đẳng thức' }),
              c1_2: D.link('c1', 'c2', { label: 'Hợp lệ → xét Đều', tone: 'green' }),
              c2_r: D.link('c2', 'res', { label: 'In kết quả', tone: 'green' })
            },
            flows: [D.flow(['i_1', 'c1_2', 'c2_r'], { rate: 1.8, kind: 'res' })]
          }
        },
        {
          short: 'switch & fall-through',
          chapter: 'technique',
          title: 'Câu lệnh switch: Gộp nhãn có chủ đích và dừng bằng break',
          body: [
            'Khi in ngày tiếng Anh theo kiểu văn bản pháp lý (<code>1st, 2nd, 3rd, 4th…</code>), <code>switch (day)</code> gọn gàng hơn nhiều chuỗi <code>else-if</code>.',
            'Các nhãn <code>case 1: case 21: case 31:</code> tận dụng <b>fall-through</b> có chủ đích để dùng chung <code>printf("st")</code>, nhưng quên <code>break;</code> ở cuối sẽ khiến luồng điều khiển trôi tuột sang nhánh <code>"nd"</code> in ra lỗi <code>"2ndrd"</code>!'
          ],
          metrics: {
            type: { val: 'Giá trị nguyên / char', level: 'good' },
            cond: { val: 'Khớp hằng case', level: 'good' },
            loop: { val: 'Thoát nhờ break', level: 'good' },
            trap: { val: 'Quên break → fall-through', level: 'warn' }
          },
          scene: {
            entities: {
              sw: D.block(-11, 0, { color: 'blue', glyph: 'code', label: ['switch (day = 3)'], sub: 'Nhảy thẳng tới case 3' }),
              c3: D.block(0, 0, { color: 'green', label: ['case 3: case 23:'], sub: 'printf("rd"); break;', tags: [{ text: 'break chặn trôi nhánh', tone: 'green' }] }),
              end: D.block(11, 0, { color: 'green', glyph: 'check', label: ['"3rd day"'], sub: 'Ra khỏi switch sạch sẽ' })
            },
            links: {
              s_c: D.link('sw', 'c3', { label: 'Khớp nhãn 3', tone: 'green' }),
              c_e: D.link('c3', 'end', { label: 'break thoát khối', tone: 'green' })
            },
            flows: [D.flow(['s_c', 'c_e'], { rate: 1.8, kind: 'res' })]
          }
        },
        {
          short: 'while · for · do-while',
          chapter: 'summary',
          title: 'Chọn đúng vòng lặp: Đếm chữ số của n = 0 bắt buộc dùng do-while',
          body: [
            'Dùng <b><code>for</code></b> khi biết rõ bước đếm (ví dụ in kim tự tháp dấu <code>*</code> bằng vòng lặp lồng nhau); dùng <b><code>while</code></b> khi lặp theo điều kiện dừng chưa biết trước số bước (thuật toán Euclid).',
            'Riêng bài toán đếm chữ số của số nguyên <code>n</code> (King §6.2): với <code>n = 0</code> vẫn có <b>1 chữ số</b>, nên <b><code>do { n /= 10; digits++; } while (n > 0);</code></b> đảm bảo thân vòng lặp luôn chạy ít nhất một lần.'
          ],
          metrics: {
            type: { val: 'n = 0 → 1 chữ số', level: 'good' },
            cond: { val: 'Kiểm điều kiện ở cuối', level: 'good' },
            loop: { val: 'Chạy tối thiểu 1 lần', level: 'good' },
            trap: { val: 'while(n>0) cho 0 chữ số!', level: 'good' }
          },
          scene: {
            entities: {
              st: D.block(-11, 0, { color: 'blue', label: ['n = 0, digits = 0'], sub: 'Khởi tạo' }),
              body: D.block(0, 0, { color: 'green', glyph: 'replay', label: ['do { n/=10; digits++; }'], sub: 'Chạy 1 lần → digits = 1' }),
              chk: D.block(11, 0, { color: 'green', glyph: 'check', label: ['while (n > 0)? Sai'], sub: 'Thoát · Kết quả = 1', tags: [{ text: 'Đúng ca biên n=0', tone: 'green' }] })
            },
            links: {
              l1: D.link('st', 'body', { label: 'Vào thân ngay', tone: 'green' }),
              l2: D.link('body', 'chk', { label: 'Kiểm sau khi chạy', tone: 'green' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 1.8, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 5 — 9. HÀM, TRUYỀN THAM TRỊ & CON TRỎ CƠ BẢN (SWAP)
     * ======================================================================== */
    {
      id: 'functions-pointers-swap',
      ch: 5,
      videos: ['V24', 'V25', 'V26', 'V27'],
      videoHref: '../V27/index.html',
      videoTitle: 'Con trỏ: địa chỉ và truyền địa chỉ cho hàm',
      title: 'Truyền tham trị (swap sai) & Con trỏ cơ bản (&a, &b)',
      summary: 'Vì sao hàm swap(a, b) không đổi được biến của main, và cách con trỏ cùng toán tử & và * giải quyết trọn vẹn cả swap lẫn scanf.',
      minutes: 8,
      level: 'Trung bình',
      ref: 'Chương 5 · Hàm & Con trỏ cơ bản (K&R §5.1–5.2)',
      metrics: [
        { id: 'main', label: 'BIẾN TRONG MAIN' },
        { id: 'param', label: 'THAM SỐ NHẬN VÀO' },
        { id: 'op', label: 'TOÁN TỬ CHÍNH' },
        { id: 'effect', label: 'HIỆU LỰC SAU HÀM' }
      ],
      legend: ['req', 'write', 'res', 'kill'],
      goals: [
        { text: 'Hiểu cơ chế truyền tham trị trong C: hàm chỉ nhận bản sao độc lập', step: 0 },
        { text: 'Thấy rõ vì sao swap(x, y) đổi hai bản sao rồi biến mất khi hàm kết thúc', step: 1 },
        { text: 'Hiểu toán tử lấy địa chỉ (&) và biến con trỏ (int *p) lưu địa chỉ ô nhớ', step: 2 },
        { text: 'Dùng toán tử truy cập qua con trỏ (*) để sửa trực tiếp biến gốc trong swap(&a, &b) và scanf("%d", &n)', step: 3 }
      ],
      steps: [
        {
          short: 'Hai biến trong main',
          chapter: 'setup',
          title: 'Biến a và b nằm ở hai ô nhớ thật sự trong khung ngăn xếp của main()',
          body: [
            'Mỗi biến cục bộ trong C chiếm một ô nhớ có địa chỉ cụ thể trong RAM: <code>a = 3</code> nằm tại địa chỉ <code>0xFFA3C</code>, <code>b = 8</code> nằm tại địa chỉ <code>0xFFA40</code>.',
            'Ta muốn viết một hàm <code>swap</code> để hoán đổi giá trị của hai biến gốc này.'
          ],
          metrics: {
            main: { val: 'a = 3, b = 8', level: '' },
            param: { val: 'Chưa gọi hàm', level: '' },
            op: { val: 'Ô nhớ 4 byte / int', level: '' },
            effect: { val: 'Mục tiêu: a=8, b=3', level: '' }
          },
          scene: {
            entities: {
              z: D.zone(-12, 12, -5.5, 5.5, 'KHUNG NGĂN XẾP CỦA MAIN()', { tone: 'blue' }),
              va: D.block(-5, 0, { color: 'blue', glyph: 'memory', label: ['a = 3'], sub: 'Địa chỉ 0xFFA3C' }),
              vb: D.block(5, 0, { color: 'teal', glyph: 'memory', label: ['b = 8'], sub: 'Địa chỉ 0xFFA40' })
            },
            links: {},
            flows: []
          }
        },
        {
          short: 'swap(a, b) sai (Tham trị)',
          chapter: 'problem',
          title: 'Truyền tham trị (K&R swap sai): Chỉ đổi hai bản sao x, y rồi hủy mất',
          body: [
            'C <b>luôn truyền tham trị</b> (pass by value): khi gọi <code>swap(a, b)</code>, hệ thống chép giá trị <code>3</code> và <code>8</code> sang hai biến cục bộ mới <code>x</code>, <code>y</code> của hàm <code>swap</code>.',
            'Hàm hoán đổi <code>x = 8, y = 3</code> xong rồi kết thúc — khung ngăn xếp của <code>swap</code> bị thu hồi, còn <code>a</code> và <code>b</code> trong <code>main</code> <b>vẫn y nguyên là 3 và 8</b>!'
          ],
          callout: {
            kind: 'warn',
            text: 'Bản sao nằm ở địa chỉ nhớ hoàn toàn khác với biến gốc: sửa tham số cục bộ bên trong hàm không bao giờ chạm được vào biến của nơi gọi.'
          },
          metrics: {
            main: { val: 'a = 3, b = 8 (không đổi!)', level: 'bad' },
            param: { val: 'Bản sao x, y', level: 'bad' },
            op: { val: 'Sao chép giá trị', level: 'warn' },
            effect: { val: 'Hoán đổi thất bại', level: 'bad' }
          },
          scene: {
            entities: {
              ma: D.block(-10, 3.5, { color: 'blue', label: ['main: a = 3'], sub: '0xFFA3C (nguyên vẹn)' }),
              mb: D.block(-10, -3.5, { color: 'teal', label: ['main: b = 8'], sub: '0xFFA40 (nguyên vẹn)' }),
              sx: D.block(9, 3.5, { color: 'red', label: ['swap: x = 8'], sub: 'Bản sao (sắp hủy)', tags: [{ text: 'Không chạm biến gốc!', tone: 'red' }] }),
              sy: D.block(9, -3.5, { color: 'red', label: ['swap: y = 3'], sub: 'Bản sao (sắp hủy)' })
            },
            links: {
              ax: D.link('ma', 'sx', { label: 'Chép giá trị 3', dashed: true }),
              by: D.link('mb', 'sy', { label: 'Chép giá trị 8', dashed: true })
            },
            flows: [
              D.flow(['ax'], { rate: 1.2, kind: 'kill' }),
              D.flow(['by'], { rate: 1.2, kind: 'kill' })
            ]
          }
        },
        {
          short: 'Truyền địa chỉ &a, &b',
          chapter: 'technique',
          title: 'Con trỏ: Biến int *px lưu địa chỉ 0xFFA3C do toán tử & lấy ra',
          body: [
            'Muốn hàm sửa được biến của <code>main</code>, nơi gọi truyền <b>địa chỉ</b> bằng toán tử <code>&amp;</code>: <code>swap(&amp;a, &amp;b)</code>.',
            'Hàm nhận hai biến con trỏ <code>int *px</code> (giữ <code>0xFFA3C</code>) và <code>int *py</code> (giữ <code>0xFFA40</code>). Bản thân địa chỉ vẫn được truyền tham trị, nhưng nhờ biết chính xác địa chỉ, hàm tìm tới đúng ô nhớ của <code>main</code>.'
          ],
          changes: [
            '+ Nơi gọi truyền &a (0xFFA3C) và &b (0xFFA40)',
            '+ Con trỏ px, py trỏ thẳng về hai ô nhớ thật của main'
          ],
          metrics: {
            main: { val: 'a = 3, b = 8', level: '' },
            param: { val: 'px=0xFFA3C, py=0xFFA40', level: 'good' },
            op: { val: 'Toán tử lấy địa chỉ &', level: 'good' },
            effect: { val: 'Đã trỏ đúng biến gốc', level: 'good' }
          },
          scene: {
            entities: {
              ma: D.block(-10, 3.5, { color: 'blue', glyph: 'memory', label: ['main: a = 3'], sub: '0xFFA3C' }),
              mb: D.block(-10, -3.5, { color: 'teal', glyph: 'memory', label: ['main: b = 8'], sub: '0xFFA40' }),
              px: D.block(9, 3.5, { color: 'violet', glyph: 'code', label: ['int *px'], sub: 'Lưu 0xFFA3C' }),
              py: D.block(9, -3.5, { color: 'violet', glyph: 'code', label: ['int *py'], sub: 'Lưu 0xFFA40' })
            },
            links: {
              p_a: D.link('px', 'ma', { label: 'Trỏ tới a', tone: 'green' }),
              p_b: D.link('py', 'mb', { label: 'Trỏ tới b', tone: 'green' })
            },
            flows: [
              D.flow(['p_a'], { rate: 1.6, kind: 'req' }),
              D.flow(['p_b'], { rate: 1.6, kind: 'req' })
            ]
          }
        },
        {
          short: 'Ghi qua *px, *py & scanf',
          chapter: 'summary',
          title: 'Toán tử truy cập qua con trỏ (*) sửa thẳng ô nhớ gốc — giải thích luôn scanf(&n)',
          body: [
            'Bên trong <code>swap</code>, viết <code>int t = *px; *px = *py; *py = t;</code>: toán tử truy cập qua con trỏ <code>*</code> lần theo địa chỉ để đọc và ghi trực tiếp vào hai ô nhớ <code>a</code>, <code>b</code> của <code>main</code>.',
            'Đây cũng chính là lý do <code>scanf("%d", &amp;n)</code> bắt buộc cần dấu <code>&amp;</code>: nếu truyền <code>n</code> thiếu <code>&amp;</code> (như <code>n = 0</code>), <code>scanf</code> hiểu nhầm giá trị đó là địa chỉ và gây lỗi dừng chương trình ngay.'
          ],
          metrics: {
            main: { val: 'a = 8, b = 3 (đã đổi!)', level: 'good' },
            param: { val: 'Ghi qua *px và *py', level: 'good' },
            op: { val: 'Toán tử * và &', level: 'good' },
            effect: { val: 'Thành công & hiểu scanf', level: 'good' }
          },
          scene: {
            entities: {
              ma: D.block(-10, 3.5, { color: 'green', glyph: 'check', label: ['main: a = 8'], sub: '0xFFA3C (đã đổi!)' }),
              mb: D.block(-10, -3.5, { color: 'green', glyph: 'check', label: ['main: b = 3'], sub: '0xFFA40 (đã đổi!)' }),
              sw: D.srv(9, 0, ['swap(&a, &b)'], { color: 'green', glyph: 'code', sub: 't=*px; *px=*py; *py=t;', tags: [{ text: 'Tương tự scanf("%d", &n)', tone: 'green' }] })
            },
            links: {
              s_a: D.link('sw', 'ma', { label: 'Ghi *px = 8', tone: 'green' }),
              s_b: D.link('sw', 'mb', { label: 'Ghi *py = 3', tone: 'green' })
            },
            flows: [
              D.flow(['s_a'], { rate: 1.8, kind: 'write' }),
              D.flow(['s_b'], { rate: 1.8, kind: 'write' })
            ]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 5 — 10. NGĂN XẾP LỜI GỌI (CALL STACK) & ĐỆ QUY
     * ======================================================================== */
    {
      id: 'recursion-call-stack',
      ch: 5,
      videos: ['V28', 'V29'],
      videoHref: '../V28/index.html',
      videoTitle: 'Đệ quy: trường hợp cơ sở và ngăn xếp lời gọi',
      title: 'Ngăn xếp lời gọi (Call Stack) & Đệ quy',
      summary: 'Quan sát các khung ngăn xếp (stack frame) đẩy vào và rút ra khi tính giai thừa, Tháp Hà Nội 2ⁿ−1 và cái giá của Fibonacci đệ quy.',
      minutes: 8,
      level: 'Trung bình',
      ref: 'Chương 5 · Đệ quy & Ngăn xếp lời gọi (Sedgewick)',
      metrics: [
        { id: 'depth', label: 'ĐỘ SÂU NGĂN XẾP' },
        { id: 'top', label: 'KHUNG ĐỈNH STACK' },
        { id: 'base', label: 'TRƯỜNG HỢP CƠ SỞ' },
        { id: 'cost', label: 'CHI PHÍ THỜI GIAN' }
      ],
      legend: ['req', 'res', 'heavy', 'kill'],
      goals: [
        { text: 'Hiểu mỗi lần gọi hàm đẩy một khung ngăn xếp mới (tham số, địa chỉ trở về) vào Call Stack', step: 0 },
        { text: 'Thấy vai trò bắt buộc của trường hợp cơ sở (n <= 1) để bắt đầu thu hồi kết quả', step: 1 },
        { text: 'Nắm công thức Tháp Hà Nội (2ⁿ − 1 bước) và rủi ro tràn ngăn xếp (Stack Overflow)', step: 2 },
        { text: 'Nhận diện tính thừa lặp lại ở Fibonacci đệ quy O(2ⁿ) so với vòng lặp O(n)', step: 3 }
      ],
      steps: [
        {
          short: 'Đẩy khung vào Stack',
          chapter: 'setup',
          title: 'Gọi fact(4) → fact(3) → fact(2) → fact(1): Ngăn xếp lớn dần theo chiều sâu',
          body: [
            'Mỗi lần hàm <code>fact(n)</code> tự gọi <code>fact(n - 1)</code>, hệ thống chưa biết ngay kết quả nên phải giữ lại biến <code>n</code> hiện tại và địa chỉ quay về trong một <b>khung ngăn xếp</b> mới trên đỉnh <b>Call Stack</b>.',
            'Bốn lời gọi lồng nhau tạo thành 4 khung xếp chồng lên nhau trong bộ nhớ ngăn xếp.'
          ],
          metrics: {
            depth: { val: '4 khung (LIFO)', level: '' },
            top: { val: 'fact(1) ở đỉnh', level: 'good' },
            base: { val: 'Chạm n == 1', level: 'good' },
            cost: { val: 'O(n) bộ nhớ stack', level: '' }
          },
          scene: {
            entities: {
              f4: D.block(-11, 0, { color: 'blue', label: ['fact(4)'], sub: 'Chờ 4 * ?' }),
              f3: D.block(-4, 0, { color: 'blue', label: ['fact(3)'], sub: 'Chờ 3 * ?' }),
              f2: D.block(3, 0, { color: 'teal', label: ['fact(2)'], sub: 'Chờ 2 * ?' }),
              f1: D.block(11, 0, { color: 'green', glyph: 'check', label: ['fact(1) = 1'], sub: 'Trường hợp cơ sở!', tags: [{ text: 'Đỉnh Stack', tone: 'green' }] })
            },
            links: {
              l1: D.link('f4', 'f3', { label: 'Push' }),
              l2: D.link('f3', 'f2', { label: 'Push' }),
              l3: D.link('f2', 'f1', { label: 'Push', tone: 'green' })
            },
            flows: [D.flow(['l1', 'l2', 'l3'], { rate: 1.8, kind: 'req' })]
          }
        },
        {
          short: 'Rút khung & Trả kết quả',
          chapter: 'technique',
          title: 'Gỡ ngăn xếp theo thứ tự LIFO: 1 → 2 → 6 → 24',
          body: [
            'Khi <code>fact(1)</code> trả về <code>1</code>, khung đỉnh được rút ra (Pop) trả quyền về cho <code>fact(2)</code> tính <code>2 × 1 = 2</code>, rồi <code>fact(3)</code> tính <code>3 × 2 = 6</code>, cuối cùng <code>fact(4)</code> trả về <b><code>24</code></b> cho <code>main()</code>.',
            'Toàn bộ 4 khung được giải phóng sạch sẽ theo đúng nguyên lý <b>Vào sau – Ra trước (LIFO)</b>.'
          ],
          metrics: {
            depth: { val: '4 → 3 → 2 → 1 → 0', level: 'good' },
            top: { val: 'Trả 24 về main()', level: 'good' },
            base: { val: 'Đã kích hoạt', level: 'good' },
            cost: { val: '4 phép nhân', level: 'good' }
          },
          scene: {
            entities: {
              f4: D.block(-11, 0, { color: 'green', glyph: 'check', label: ['fact(4) → 24'], sub: 'Hoàn tất!' }),
              f3: D.block(-3, 0, { color: 'green', label: ['fact(3) → 6'], sub: '3 × 2' }),
              f2: D.block(5, 0, { color: 'green', label: ['fact(2) → 2'], sub: '2 × 1' }),
              f1: D.block(12, 0, { color: 'gray', label: ['fact(1)'], sub: 'Đã Pop (=1)' })
            },
            links: {
              r1: D.link('f1', 'f2', { label: 'Trả 1', tone: 'green' }),
              r2: D.link('f2', 'f3', { label: 'Trả 2', tone: 'green' }),
              r3: D.link('f3', 'f4', { label: 'Trả 6', tone: 'green' })
            },
            flows: [D.flow(['r1', 'r2', 'r3'], { rate: 2.0, kind: 'res' })]
          }
        },
        {
          short: 'Thiếu cơ sở → Tràn Stack',
          chapter: 'problem',
          title: 'Quên trường hợp cơ sở (hoặc đệ quy quá sâu): Tràn ngăn xếp 0xC00000FD',
          body: [
            'Vùng nhớ Call Stack của tiến trình có dung lượng hữu hạn (thường chỉ vài MB trên Windows/Linux).',
            'Nếu thiếu trường hợp cơ sở hoặc tham số không tiến về trường hợp cơ sở (ví dụ gọi <code>fact(-1)</code>), hàng chục nghìn khung bị đẩy vào liên tục cho tới khi <b>tràn ngăn xếp (Stack Overflow)</b> — chương trình bị hệ điều hành chấm dứt đột ngột.'
          ],
          callout: {
            kind: 'warn',
            text: 'Mọi hàm đệ quy đúng đều cần hai điều kiện: (1) có <b>trường hợp cơ sở</b> không gọi đệ quy, và (2) mỗi lời gọi phải <b>giảm kích thước</b> tiến chặt về trường hợp cơ sở.'
          },
          metrics: {
            depth: { val: '> 50 000 khung!', level: 'bad' },
            top: { val: 'Vượt giới hạn Stack', level: 'bad' },
            base: { val: 'Không bao giờ tới', level: 'bad' },
            cost: { val: 'Crash 0xC00000FD', level: 'bad' }
          },
          scene: {
            entities: {
              call: D.block(-10, 0, { color: 'red', glyph: 'replay', label: ['Đệ quy vô hạn'], sub: 'Thiếu điều kiện dừng' }),
              stk: D.queue(1, 0, 'Call Stack (đầy cứng!)', { n: 6, slots: 6, color: 'red', tags: [{ text: 'Stack Overflow!', tone: 'red' }] }),
              os: D.srv(11, 0, ['Hệ điều hành'], { color: 'red', heat: 0.85, glyph: 'alert', sub: 'Dừng tiến trình (RE)' })
            },
            links: {
              c_s: D.link('call', 'stk', { label: 'Push liên tục', tone: 'red' }),
              s_o: D.link('stk', 'os', { label: 'Tràn bộ nhớ ngăn xếp', tone: 'red', fail: 0.85 })
            },
            flows: [D.flow(['c_s', 's_o'], { rate: 2.8, kind: 'kill', fail: 0.85 })]
          }
        },
        {
          short: 'Tháp Hà Nội & Fibonacci',
          chapter: 'summary',
          title: 'Đệ quy tự nhiên (Tháp Hà Nội) vs Đệ quy tính thừa (Fibonacci)',
          body: [
            'Với <b>Tháp Hà Nội</b> (<code>n</code> đĩa), bài toán tự tách gọn thành chuyển <code>n−1</code> đĩa sang cọc phụ, chuyển đĩa đáy, rồi chuyển <code>n−1</code> đĩa sang cọc đích (đúng <code>2ⁿ − 1</code> bước) — đệ quy diễn đạt ngắn gọn, tự nhiên.',
            'Ngược lại, <code>fib(n) = fib(n-1) + fib(n-2)</code> gọi lặp lại cùng một bài toán con hàng triệu lần (<code>O(2ⁿ)</code>), trong khi một vòng lặp <code>for</code> đơn giản chỉ mất <b><code>O(n)</code></b> và <code>O(1)</code> bộ nhớ!'
          ],
          metrics: {
            depth: { val: 'Tháp Hà Nội: O(n) stack', level: 'good' },
            top: { val: 'Fib vòng lặp: O(1) RAM', level: 'good' },
            base: { val: 'Chọn đúng công cụ', level: 'good' },
            cost: { val: 'Fib lặp O(n) ≪ O(2ⁿ)', level: 'good' }
          },
          scene: {
            entities: {
              fib: D.block(-10, 0, { color: 'red', label: ['fib(40) đệ quy'], sub: '~330 triệu lời gọi (O(2ⁿ))', tags: [{ text: 'Tính lặp lại bài toán con', tone: 'red' }] }),
              iter: D.block(10, 0, { color: 'green', glyph: 'check', label: ['fib(40) vòng lặp'], sub: 'Chỉ 40 bước · O(n)!', tags: [{ text: 'Nhanh hơn triệu lần', tone: 'green' }] })
            },
            links: {
              cmp: D.link('fib', 'iter', { label: 'Khử tính thừa bằng vòng lặp', tone: 'green' })
            },
            flows: [D.flow(['cmp'], { rate: 1.8, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 6 — 11. MẢNG MỘT CHIỀU: SẮP XẾP CHÈN & TÌM KIẾM NHỊ PHÂN
     * ======================================================================== */
    {
      id: 'array-sort-binsearch',
      ch: 6,
      videos: ['V30', 'V31', 'V32', 'V33'],
      videoHref: '../V33/index.html',
      videoTitle: 'Mảng một chiều: tìm kiếm nhị phân',
      title: 'Mảng một chiều: Sắp xếp chèn & Tìm kiếm nhị phân',
      summary: 'Mảng lưu liên tiếp trong RAM, sắp xếp chèn như xếp bài trên tay (CLRS) và tìm kiếm nhị phân tránh lỗi vòng lặp vô hạn & tràn chỉ số (Bloch).',
      minutes: 8,
      level: 'Trung bình',
      ref: 'Chương 6 · Mảng một chiều, Sắp xếp & Tìm kiếm (K&R, CLRS, Bloch)',
      metrics: [
        { id: 'mem', label: 'ĐỊA CHỈ PHẦN TỬ' },
        { id: 'inv', label: 'BẤT BIẾN THUẬT TOÁN' },
        { id: 'mid', label: 'CÔNG THỨC MID' },
        { id: 'cplx', label: 'ĐỘ PHỨC TẠP' }
      ],
      legend: ['req', 'write', 'res', 'kill'],
      goals: [
        { text: 'Hiểu mảng một chiều nằm trên vùng nhớ liên tiếp và tính địa chỉ a[i] trong O(1)', step: 0 },
        { text: 'Nắm cơ chế sắp xếp chèn (Insertion Sort): duy trì đoạn trái luôn có thứ tự như xếp bài', step: 1 },
        { text: 'Hiểu bất biến của tìm kiếm nhị phân và lỗi treo vòng lặp nếu viết nhầm low = mid', step: 2 },
        { text: 'Khắc phục lỗi tràn số (low + high) / 2 của Bloch (2006) bằng low + (high - low) / 2', step: 3 }
      ],
      steps: [
        {
          short: 'Mảng liên tiếp O(1)',
          chapter: 'setup',
          title: 'Mảng một chiều: Mọi phần tử nằm sát nhau — truy cập a[i] trong đúng 1 phép cộng',
          body: [
            'Khai báo <code>int a[6]</code> cấp phát <code>6 × 4 = 24 byte</code> liên tiếp nhau trong bộ nhớ. Địa chỉ của phần tử thứ <code>i</code> là <code>base + i × sizeof(int)</code>.',
            'Chính vì thế truy cập <code>a[i]</code> mất <b><code>O(1)</code></b> — nhưng C không tự kiểm tra biên chỉ số, ghi quá <code>a[6]</code> sẽ đè sang biến lân cận.'
          ],
          metrics: {
            mem: { val: 'base + i × 4 byte', level: 'good' },
            inv: { val: 'Chỉ số 0 .. n-1', level: 'good' },
            mid: { val: 'Truy cập ngẫu nhiên O(1)', level: 'good' },
            cplx: { val: 'Đọc a[i]: O(1)', level: 'good' }
          },
          scene: {
            entities: {
              a0: D.block(-12, 0, { color: 'blue', label: ['a[0] = 12'], sub: '+0 B' }),
              a1: D.block(-4, 0, { color: 'blue', label: ['a[1] = 25'], sub: '+4 B' }),
              a2: D.block(4, 0, { color: 'teal', label: ['a[2] = 41'], sub: '+8 B' }),
              a3: D.block(12, 0, { color: 'green', label: ['a[3] = 58'], sub: '+12 B', tags: [{ text: 'Ô nhớ sát nhau', tone: 'green' }] })
            },
            links: {
              l1: D.link('a0', 'a1', { label: '+4B' }),
              l2: D.link('a1', 'a2', { label: '+4B' }),
              l3: D.link('a2', 'a3', { label: '+4B' })
            },
            flows: [D.flow(['l1', 'l2', 'l3'], { rate: 1.4, kind: 'req' })]
          }
        },
        {
          short: 'Sắp xếp chèn (CLRS)',
          chapter: 'technique',
          title: 'Sắp xếp chèn như xếp bài trên tay: Dịch phải các lá lớn hơn rồi chèn key',
          body: [
            'Ở bước <code>i</code>, đoạn bên trái <code>a[0..i-1]</code> luôn đã có thứ tự tăng dần. Ta nhấc lá bài <code>key = a[i]</code>, dịch các phần tử lớn hơn <code>key</code> sang phải 1 ô, rồi đặt <code>key</code> vào chỗ trống.',
            'Rất nhanh với mảng nhỏ hoặc gần như đã sắp xếp (<code>O(n)</code> tốt nhất, <code>O(n²)</code> xấu nhất).'
          ],
          metrics: {
            mem: { val: 'Sắp xếp tại chỗ O(1) RAM', level: 'good' },
            inv: { val: 'a[0..i-1] luôn tăng dần', level: 'good' },
            mid: { val: 'Dịch phải & chèn key', level: 'good' },
            cplx: { val: 'O(n) tốt nhất · O(n²) xấu nhất', level: 'warn' }
          },
          scene: {
            entities: {
              sorted: D.block(-10, 0, { color: 'green', glyph: 'check', label: ['Đoạn đã sắp [12, 25, 41]'], sub: 'Luôn tăng dần' }),
              key: D.block(1, 3.5, { color: 'amber', glyph: 'code', label: ['key = 19'], sub: 'Dịch 25, 41 sang phải', tags: [{ text: 'Chèn giữa 12 và 25', tone: 'amber' }] }),
              rest: D.block(11, 0, { color: 'gray', label: ['Chưa xét [58, 7]'], sub: 'Chờ lượt tiếp theo' })
            },
            links: {
              k_s: D.link('key', 'sorted', { label: 'Chèn đúng vị trí', tone: 'green' }),
              r_k: D.link('rest', 'key', { label: 'Nhấc lá tiếp theo', dashed: true })
            },
            flows: [D.flow(['r_k', 'k_s'], { rate: 1.8, kind: 'write' })]
          }
        },
        {
          short: 'Tìm kiếm nhị phân & Bẫy lặp',
          chapter: 'problem',
          title: 'binsearch (K&R): Sai 1 ký tự (low = mid thay vì mid + 1) gây treo vô hạn!',
          body: [
            'Bentley thống kê chỉ khoảng 10% lập trình viên viết đúng tìm kiếm nhị phân ngay lần đầu. Bất biến cốt lõi: phần tử cần tìm <code>x</code>, nếu có, <b>luôn nằm trong đoạn <code>[low..high]</code></b> và đoạn phải thu hẹp chặt sau mỗi lượt.',
            'Nếu viết nhầm <code>low = mid</code> (thiếu <code>+ 1</code>), khi còn 2 phần tử thì <code>mid == low</code> mãi mãi — vòng lặp chạy vô hạn!'
          ],
          callout: {
            kind: 'warn',
            text: 'Luôn cập nhật <code>low = mid + 1</code> (khi <code>a[mid] < x</code>) và <code>high = mid - 1</code> (khi <code>a[mid] > x</code>) để chắc chắn loại bỏ <code>mid</code> đã kiểm tra.'
          },
          metrics: {
            mem: { val: 'Đoạn [low .. high]', level: 'good' },
            inv: { val: 'Thu hẹp chặt mỗi bước', level: 'good' },
            mid: { val: 'low = mid+1 | high = mid-1', level: 'good' },
            cplx: { val: 'O(log n)', level: 'good' }
          },
          scene: {
            entities: {
              lo: D.block(-11, 0, { color: 'gray', label: ['Đoạn trái (loại)'], sub: 'Nhỏ hơn x' }),
              mid: D.block(0, 0, { color: 'amber', glyph: 'search', label: ['a[mid] < x'], sub: 'Cập nhật low = mid + 1', tags: [{ text: 'Loại hẳn mid!', tone: 'green' }] }),
              hi: D.block(11, 0, { color: 'green', label: ['Đoạn [mid+1 .. high]'], sub: 'Vùng tìm kiếm mới' })
            },
            links: {
              m_h: D.link('mid', 'hi', { label: 'Thu hẹp còn một nửa', tone: 'green' }),
              m_l: D.link('mid', 'lo', { label: 'Bỏ hoàn toàn', dashed: true, tone: 'gray' })
            },
            flows: [D.flow(['m_h'], { rate: 1.8, kind: 'res' })]
          }
        },
        {
          short: 'Lỗi tràn số Bloch (2006)',
          chapter: 'summary',
          title: 'Vá lỗi tồn tại 9 năm trong thư viện chuẩn: low + (high - low) / 2',
          body: [
            'Khi mảng cực lớn (trên 1 tỷ phần tử) và <code>low, high</code> cùng gần <code>INT_MAX</code>, phép cộng <code>(low + high) / 2</code> bị <b>tràn số nguyên có dấu</b> thành số âm — lỗi kinh điển mà Joshua Bloch phát hiện trong <code>Arrays.binarySearch</code> năm 2006!',
            'Viết <b><code>int mid = low + (high - low) / 2;</code></b> cho cùng giá trị toán học nhưng tuyệt đối không bao giờ tràn.'
          ],
          metrics: {
            mem: { val: 'An toàn tới INT_MAX', level: 'good' },
            inv: { val: 'low <= mid <= high', level: 'good' },
            mid: { val: 'low + (high - low) / 2', level: 'good' },
            cplx: { val: 'O(log n) chuẩn mực', level: 'good' }
          },
          scene: {
            entities: {
              bug: D.block(-10, 0, { color: 'red', glyph: 'alert', label: ['(low + high) / 2'], sub: 'Tràn INT_MAX → mid âm!' }),
              fix: D.block(10, 0, { color: 'green', glyph: 'check', label: ['low + (high - low) / 2'], sub: 'Không bao giờ tràn số', tags: [{ text: 'Chuẩn thực chiến', tone: 'green' }] })
            },
            links: {
              bf: D.link('bug', 'fix', { label: 'Khử phép cộng tràn', tone: 'green' })
            },
            flows: [D.flow(['bf'], { rate: 1.8, kind: 'res' })]
          }
        }
      ]
    },

    /* ========================================================================
     * CHƯƠNG 6 — 12. MẢNG HAI CHIỀU, CHUỖI KÝ TỰ '\0' & MẢNG CẤU TRÚC STRUCT
     * ======================================================================== */
    {
      id: 'matrix-strings-structs',
      ch: 6,
      videos: ['V34', 'V35', 'V36', 'V37', 'V38', 'V39'],
      videoHref: '../V36/index.html',
      videoTitle: 'Chuỗi ký tự: mảng char và ký tự kết thúc chuỗi',
      title: 'Mảng hai chiều, Chuỗi ký tự \'\\0\' & Mảng Cấu trúc (struct)',
      summary: 'Lưu trữ mảng hai chiều theo hàng (Game of Life), chuỗi kết thúc bằng \'\\0\' và fgets chống tràn bộ đệm, cùng quản lý kho hàng bằng struct.',
      minutes: 8,
      level: 'Trung bình',
      ref: 'Chương 6 · Ma trận, Chuỗi ký tự & Cấu trúc (K&R, King)',
      metrics: [
        { id: 'grid', label: 'MA TRẬN 2 CHIỀU' },
        { id: 'str', label: 'KẾT THÚC CHUỖI' },
        { id: 'safe', label: 'NHẬP CHUỖI AN TOÀN' },
        { id: 'rec', label: 'BẢN GHI DỮ LIỆU' }
      ],
      legend: ['req', 'write', 'res', 'kill'],
      goals: [
        { text: 'Hiểu mảng hai chiều a[R][C] trải phẳng theo từng hàng và dùng hai bảng luân phiên trong Game of Life', step: 0 },
        { text: 'Nhớ chuỗi C là mảng char kết thúc bằng byte \'\\0\' (cần mảng kích thước N + 1)', step: 1 },
        { text: 'Hiểu bài học sâu Morris (1988): bỏ gets(), luôn dùng fgets(buf, sizeof(buf), stdin)', step: 2 },
        { text: 'Tổ chức nhiều trường khác kiểu thành một bản ghi struct và mảng cấu trúc (bài toán kho hàng)', step: 3 }
      ],
      steps: [
        {
          short: 'Ma trận & Game of Life',
          chapter: 'setup',
          title: 'Mảng hai chiều trải phẳng theo hàng — Game of Life dùng hai bảng luân phiên',
          body: [
            'Mảng hai chiều <code>int grid[8][8]</code> thực chất là 8 hàng nằm nối đuôi nhau trong RAM (hàng 0 xong đến hàng 1).',
            'Trong <b>Game of Life</b> của Conway, trạng thái thế hệ sau của mọi ô phụ thuộc đồng thời vào 8 ô láng giềng hiện tại: phải đọc từ bảng <code>cur</code> và ghi sang bảng <code>next</code> rồi mới đổi chỗ, tránh ghi đè làm hỏng phép đếm láng giềng.'
          ],
          metrics: {
            grid: { val: 'cur[8][8] → next[8][8]', level: 'good' },
            str: { val: 'Mảng lưu theo hàng', level: '' },
            safe: { val: 'Kiểm biên 0..7', level: 'good' },
            rec: { val: 'Mô phỏng trạng thái', level: 'good' }
          },
          scene: {
            entities: {
              cur: D.block(-10, 0, { color: 'blue', glyph: 'layers', label: ['Bảng hiện tại (cur)'], sub: 'Đếm 8 ô láng giềng' }),
              rule: D.srv(0, 0, ['Luật Conway'], { color: 'teal', glyph: 'cpu', sub: 'Sống: 2–3 · Sinh: 3' }),
              nxt: D.block(10, 0, { color: 'green', glyph: 'layers', label: ['Bảng thế hệ sau (next)'], sub: 'Không ghi đè cur!', tags: [{ text: 'Hoán đổi sau 1 lượt', tone: 'green' }] })
            },
            links: {
              c_r: D.link('cur', 'rule', { label: 'Đọc trạng thái cũ' }),
              r_n: D.link('rule', 'nxt', { label: 'Ghi thế hệ mới', tone: 'green' })
            },
            flows: [D.flow(['c_r', 'r_n'], { rate: 1.8, kind: 'write' })]
          }
        },
        {
          short: 'Chuỗi ký tự & byte \'\\0\'',
          chapter: 'technique',
          title: 'Chuỗi trong C không lưu độ dài — hàm strlen() quét tới khi gặp \'\\0\'',
          body: [
            'Chuỗi <code>"PTIT"</code> nằm trong mảng <code>char s[5]</code> gồm 5 byte: <code>\'P\', \'T\', \'I\', \'T\', \'\\0\'</code> (byte 0 kết thúc chuỗi).',
            'Hàm <code>strlen(s)</code> đếm từng byte cho tới khi gặp <code>\'\\0\'</code>. Nếu quên chừa 1 ô cho <code>\'\\0\'</code>, <code>strlen</code> và <code>printf("%s")</code> sẽ đọc tràn sang các vùng nhớ rác xung quanh.'
          ],
          metrics: {
            grid: { val: 'Mảng char liên tiếp', level: '' },
            str: { val: "Byte '\\0' (giá trị 0)", level: 'good' },
            safe: { val: 'Cấp đủ N + 1 byte', level: 'good' },
            rec: { val: 'Mật mã Caesar / Chuẩn hóa', level: 'good' }
          },
          scene: {
            entities: {
              c1: D.block(-11, 0, { color: 'blue', label: ["'P' 'T' 'I' 'T'"], sub: 'Chỉ số 0..3 (4 byte)' }),
              z: D.block(0, 0, { color: 'amber', glyph: 'check', label: ["'\\0' (0x00)"], sub: 'Chỉ số 4 · Dấu dừng!', tags: [{ text: 'Bắt buộc có!', tone: 'amber' }] }),
              fn: D.srv(11, 0, ['strlen() / printf()'], { color: 'green', sub: 'Dừng đúng tại ô 4 → 4' })
            },
            links: {
              l1: D.link('c1', 'z', { label: 'Quét tuần tự' }),
              l2: D.link('z', 'fn', { label: "Gặp '\\0' → dừng", tone: 'green' })
            },
            flows: [D.flow(['l1', 'l2'], { rate: 1.8, kind: 'res' })]
          }
        },
        {
          short: 'fgets thay gets (Morris)',
          chapter: 'problem',
          title: 'Sâu Morris (1988) & Lý do C11 xóa bỏ hoàn toàn hàm gets()',
          body: [
            'Hàm cũ <code>gets(buf)</code> không nhận tham số kích thước mảng: người dùng nhập 200 ký tự vào <code>char buf[16]</code> sẽ ghi đè lên các biến và địa chỉ trở về trên Call Stack — lỗ hổng tràn bộ đệm mà <b>sâu Morris (1988)</b> đã khai thác.',
            'Luôn dùng <b><code>fgets(buf, sizeof(buf), stdin)</code></b> để khóa chặt số byte đọc tối đa (chừa sẵn 1 ô cho <code>\'\\0\'</code>).'
          ],
          callout: {
            kind: 'warn',
            text: 'Từ chuẩn C11/C17, <code>gets()</code> đã bị loại bỏ vĩnh viễn khỏi thư viện chuẩn. Luôn dùng <code>fgets</code> và <code>snprintf</code> có tham số kích thước.'
          },
          metrics: {
            grid: { val: 'char buf[16]', level: '' },
            str: { val: "Tự gắn '\\0' cuối", level: 'good' },
            safe: { val: 'fgets(..., sizeof(buf), ...)', level: 'good' },
            rec: { val: 'Chặn tràn bộ đệm', level: 'good' }
          },
          scene: {
            entities: {
              inp: D.dev(-11, 0, 'Đầu vào dài 200 ký tự'),
              bad: D.block(0, 4, { color: 'red', glyph: 'alert', label: ['gets(buf) — CẤM'], sub: 'Ghi đè hỏng Call Stack!', heat: 0.7 }),
              ok: D.block(0, -4, { color: 'green', glyph: 'shield', label: ['fgets(buf, 16, stdin)'], sub: 'Cắt an toàn 15 ký tự + \\0', tags: [{ text: 'An toàn bộ nhớ', tone: 'green' }] }),
              mem: D.block(11, 0, { color: 'green', glyph: 'memory', label: ['buf[16] nguyên vẹn'], sub: 'Không đè biến lân cận' })
            },
            links: {
              i_b: D.link('inp', 'bad', { label: 'Tràn 184 byte', tone: 'red', fail: 0.85 }),
              i_o: D.link('inp', 'ok', { label: 'Khóa giới hạn 16B', tone: 'green' }),
              o_m: D.link('ok', 'mem', { label: 'Ghi gọn trong khung', tone: 'green' })
            },
            flows: [
              D.flow(['i_o', 'o_m'], { rate: 1.8, kind: 'res' }),
              D.flow(['i_b'], { rate: 1.0, kind: 'kill', fail: 0.85 })
            ]
          }
        },
        {
          short: 'Mảng cấu trúc kho hàng',
          chapter: 'summary',
          title: 'struct & Mảng cấu trúc (King §16.3): Gom nhiều trường khác kiểu thành một bản ghi',
          body: [
            'Bài toán quản lý kho hàng cần lưu mỗi phụ tùng gồm mã số (<code>int number</code>), tên (<code>char name[26]</code>) và số lượng tồn (<code>int on_hand</code>). Từ khóa <b><code>struct</code></b> (kèm <code>typedef</code>) gom trọn 3 thành viên này thành một kiểu dữ liệu <code>Part</code> thống nhất.',
            'Một mảng cấu trúc <code>Part inventory[100]</code> cho phép thêm, tìm kiếm, cập nhật số lượng và gán nguyên bản ghi (<code>p2 = p1;</code> chép cả mảng <code>name</code> bên trong!).'
          ],
          metrics: {
            grid: { val: 'Part inventory[100]', level: 'good' },
            str: { val: 'char name[26] trong struct', level: 'good' },
            safe: { val: 'Truy cập p.on_hand / p->on_hand', level: 'good' },
            rec: { val: 'Thêm · Tìm · Cập nhật · In', level: 'good' }
          },
          scene: {
            entities: {
              ui: D.dev(-11, 0, 'Menu Kho hàng (CLI)', { tags: [{ text: 'i: thêm · s: tìm · u: sửa', tone: 'blue' }] }),
              st: D.block(0, 0, { color: 'violet', glyph: 'code', label: ['typedef struct Part'], sub: 'number · name[26] · on_hand' }),
              arr: D.db(11, 0, 'Part inventory[100]', { color: 'green', sub: 'Mảng bản ghi đồng bộ', tags: [{ text: 'Quản lý danh sách thật', tone: 'green' }] })
            },
            links: {
              u_s: D.link('ui', 'st', { label: 'Đóng gói bản ghi' }),
              s_a: D.link('st', 'arr', { label: 'Lưu / Tra theo number', tone: 'green' })
            },
            flows: [D.flow(['u_s', 's_a'], { rate: 1.8, kind: 'write' })]
          }
        }
      ]
    }
  ];

  global.ELEARNING_COURSE = {
    courseId: 'INT11117',
    code: 'INT11117',
    title: 'Nhập môn Tin học và Lập trình',
    titleEn: 'Introduction to Computing and Programming',
    instructor: 'TS. Đặng Ngọc Hùng',
    modules: [
      { ch: 1, title: 'Cơ bản về máy tính', color: 'blue' },
      { ch: 2, title: 'Lập trình và trình biên dịch', color: 'teal' },
      { ch: 3, title: 'Các ngôn ngữ lập trình', color: 'amber' },
      { ch: 4, title: 'Ngôn ngữ lập trình C cơ bản', color: 'green' },
      { ch: 5, title: 'Tổ chức chương trình C', color: 'violet' },
      { ch: 6, title: 'Cấu trúc dữ liệu cơ bản với C', color: 'red' }
    ],
    lessons: LESSONS
  };
})(typeof window !== 'undefined' ? window : globalThis);
