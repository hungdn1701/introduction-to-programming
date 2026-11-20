/* ============================================================================
 * INT11117/workbench/lessons.js — 12 Mô phỏng tương tác 2.5D
 * (Nhập môn Tin học và Lập trình — C17 & GCC)
 * ============================================================================
 * Phủ đủ 6 chương của INT11117/plan.yaml, bám sát INT11117/glossary.yaml và
 * INT11117/classic-examples.md (K&R, King, CS:APP, OSTEP, Knuth, CLRS).
 * Thiết kế trực quan 2.5D kết hợp frame bộ nhớ/bit/mảng/stack, panel bảng vết,
 * zone cách ly chế độ, firewall bảo vệ bộ nhớ và rack phần cứng.
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
              io: D.dev(-11.5, 2.2, 'Thiết bị I/O', { halo: 'blue', tags: [{ text: 'Nhập 7 và 5', tone: 'blue' }] }),
              cpu: D.rack(0, 2.2, 'CPU', { color: 'blue', glyph: 'cpu', sub: 'CU · ALU · Thanh ghi' }),
              ram: D.rack(11.5, 2.2, 'RAM (Ô 00..99)', { color: 'purple', glyph: 'memory', sub: 'Lệnh & Dữ liệu chung', tags: [{ text: 'Stored Program', tone: 'violet' }] }),
              fr: D.frame(0, -4.6, 'Bố trí ô nhớ Little Man Computer (LMC) trong cùng RAM', [
                { label: 'Ô 00..02', sub: 'INP · STA 90 · INP', tone: 'blue' },
                { label: 'Ô 03', sub: '190 (ADD 90)', tone: 'amber', active: true },
                { label: 'Ô 04..05', sub: 'OUT · HLT', tone: 'blue' },
                { label: 'Ô 90', sub: 'Dữ liệu = 7', tone: 'violet' }
              ], { icon: 'memory' })
            },
            links: {
              i_c: D.link('io', 'cpu', { label: 'Bus I/O' }),
              c_r: D.link('cpu', 'ram', { label: 'Address / Data Bus', both: true })
            },
            flows: [D.flow(['i_c', 'c_r'], { rate: 1.5, kind: 'req' })]
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
              cpuZ: D.zone(-13.8, 3.8, -1.6, 8.6, 'BÊN TRONG CPU (PHA FETCH)', { tone: 'blue' }),
              pc: D.block(-9.8, 5.2, { color: 'blue', glyph: 'code', label: ['PC = 03 → 04'], sub: 'Địa chỉ lệnh kế' }),
              ir: D.block(-9.8, 0.2, { color: 'amber', glyph: 'code', label: ['IR = 190'], sub: 'Nhận lệnh ADD 90' }),
              cu: D.block(-0.5, 3.0, { color: 'blue', glyph: 'cpu', label: ['Khối CU'], sub: 'Đọc ô 03, tăng PC' }),
              ram: D.rack(11.5, 2.6, 'RAM', { color: 'purple', glyph: 'memory', sub: 'Ô 03: 190 · Ô 90: 7' }),
              fr: D.frame(0, -5.0, 'Thanh ghi & Ô nhớ sau bước Fetch', [
                { label: 'PC', sub: '03 → 04', tone: 'blue' },
                { label: 'IR', sub: '190 (ADD 90)', tone: 'amber', active: true },
                { label: 'ACC', sub: '5 (đang giữ)', tone: 'paper' },
                { label: 'RAM[90]', sub: '7 (số thứ nhất)', tone: 'violet' }
              ], { icon: 'cpu' })
            },
            links: {
              p_c: D.link('pc', 'cu', { label: 'Địa chỉ 03' }),
              c_r: D.link('cu', 'ram', { label: 'Đọc ô 03' }),
              r_i: D.link('ram', 'ir', { label: 'Trả mã 190', tone: 'green', via: [[0, -1.8]] })
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
            phase: { val: 'DECODE → EXEC', level: 'good' }
          },
          scene: {
            entities: {
              ram: D.rack(-11, 2.2, 'RAM ô 90', { color: 'purple', glyph: 'memory', sub: 'Giá trị = 7' }),
              alu: D.block(0, 2.2, { color: 'green', glyph: 'cpu', halo: 'green', label: ['ALU (Số học)'], sub: '5 + 7 = 12', tags: [{ text: 'Thực thi ADD', tone: 'green' }] }),
              acc: D.block(11, 2.2, { color: 'green', glyph: 'code', label: ['Thanh ghi ACC'], sub: 'Giá trị mới: 12', tags: [{ text: 'Sẵn sàng OUT', tone: 'green' }] }),
              fr: D.frame(0, -4.6, 'Giải mã lệnh máy 190 (Opcode + Địa chỉ toán hạng)', [
                { label: 'Opcode: 1', sub: 'Lệnh cộng ADD', tone: 'blue' },
                { label: 'Địa chỉ: 90', sub: 'Đọc RAM[90] = 7', tone: 'violet' },
                { label: 'ALU: 5 + 7', sub: 'Ghi ACC = 12 ✓', tone: 'green', active: true }
              ], { icon: 'cpu' })
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
            pc: { val: 'Đổi địa chỉ nhảy', level: 'good' },
            ir: { val: 'BRZ / BRA / HLT', level: 'good' },
            acc: { val: '12 (đã OUT)', level: 'good' },
            phase: { val: 'Lặp đến HLT', level: 'good' }
          },
          scene: {
            entities: {
              alu: D.block(-10.5, 2.2, { color: 'amber', glyph: 'cpu', label: ['Kiểm ACC == 0?'], sub: 'Lệnh nhảy BRZ' }),
              pc: D.block(0.5, 2.2, { color: 'blue', glyph: 'code', halo: 'blue', label: ['Thanh ghi PC'], sub: 'Đổi hướng luồng', tags: [{ text: 'Tạo rẽ nhánh & lặp', tone: 'green' }] }),
              out: D.dev(11, 2.2, 'Màn hình OUT = 12', { halo: 'green', tags: [{ text: 'Dừng khi gặp HLT', tone: 'paper' }] }),
              pn: D.panel(0, -4.5, 'Cầu nối từ phần cứng LMC lên ngôn ngữ C', [
                '+ if / else  → lệnh nhảy có điều kiện (BRZ / BRP) ghi đè PC',
                '+ while / for → nhảy ngược PC về đầu vòng lặp cho tới khi sai'
              ], { icon: 'code' })
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
            lat: { val: '1ns → 100ns → 50µs', level: '' },
            hit: { val: 'Theo tính cục bộ', level: '' },
            order: { val: '4 tầng phân cấp', level: '' },
            speed: { val: 'Cân bằng tốc/giá', level: 'good' }
          },
          scene: {
            entities: {
              reg: D.block(-12, 2.2, { color: 'green', glyph: 'cpu', label: ['Thanh ghi'], sub: '~0,5 ns · Vài trăm B' }),
              ca: D.block(-4, 2.2, { color: 'teal', glyph: 'cache', label: ['Cache L1–L3'], sub: '1–15 ns · KB–MB' }),
              ram: D.rack(4.5, 2.2, 'RAM chính', { color: 'blue', glyph: 'memory', sub: '~100 ns · 16 GB' }),
              ssd: D.db(12.5, 2.2, 'SSD / Đĩa', { color: 'purple', sub: '~50 µs · 1 TB' }),
              fr: D.frame(0, -4.6, 'Đánh đổi Tốc độ ↔ Dung lượng qua 4 tầng bộ nhớ (CS:APP)', [
                { label: 'Thanh ghi', sub: '0,5 ns (nhanh nhất)', tone: 'green', active: true },
                { label: 'Cache L1–L3', sub: '1–15 ns (SRAM)', tone: 'teal' },
                { label: 'RAM chính', sub: '~100 ns (DRAM)', tone: 'blue' },
                { label: 'SSD / Đĩa', sub: '~50 000 ns (lưu bền)', tone: 'violet' }
              ], { icon: 'memory' })
            },
            links: {
              l1: D.link('reg', 'ca', { label: 'Nhanh nhất', tone: 'green' }),
              l2: D.link('ca', 'ram', { label: 'Cache line 64B' }),
              l3: D.link('ram', 'ssd', { label: 'Trang 4 KB', style: 'dashed' })
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
              cpu: D.rack(-11, 2.2, 'CPU Core', { color: 'green', glyph: 'cpu', halo: 'green', sub: 'Đọc a[0][0..15]' }),
              l1: D.block(0, 2.2, { color: 'green', glyph: 'cache', label: ['Cache L1 (64B)'], sub: 'Sẵn 16 int liền kề!', tags: [{ text: '15 lần Hit liên tiếp', tone: 'green' }] }),
              ram: D.rack(11, 2.2, 'RAM', { color: 'blue', glyph: 'memory', sub: 'Đọc đúng 1 lần' }),
              fr: D.frame(0, -4.6, 'Một Cache Line 64 byte kéo sẵn 16 phần tử int liên tiếp lên L1', [
                { label: 'a[0][0]', sub: 'Miss đầu (nạp line)', tone: 'amber' },
                { label: 'a[0][1]', sub: 'HIT ~1 ns ✓', tone: 'green', active: true },
                { label: 'a[0][2]', sub: 'HIT ~1 ns ✓', tone: 'green' },
                { label: 'a[0][3..15]', sub: '13 lần HIT nữa ✓', tone: 'green' }
              ], { icon: 'cache' })
            },
            links: {
              c_l: D.link('cpu', 'l1', { label: 'Hit ~1 ns', tone: 'green' }),
              r_l: D.link('ram', 'l1', { label: 'Nạp 1 line 64B', style: 'dashed' })
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
            order: { val: 'Theo cột (nhảy xa)', level: 'bad' },
            speed: { val: 'Chậm 5–10 lần', level: 'bad' }
          },
          scene: {
            entities: {
              cpu: D.rack(-11, 2.2, 'CPU (chờ RAM)', { color: 'red', heat: 0.75, glyph: 'cpu', sub: 'a[0][0] → a[1][0]' }),
              l1: D.block(0, 2.2, { color: 'red', glyph: 'cache', label: ['Cache L1'], sub: 'Miss liên tiếp!', tags: [{ text: 'Bỏ phí 60B mỗi line', tone: 'red' }] }),
              ram: D.rack(11, 2.2, 'RAM chính', { color: 'amber', glyph: 'memory', cpu: 0.92, sub: 'Nghẽn đọc liên tục' }),
              fr: D.frame(0, -4.6, 'Nhảy cóc theo cột bỏ phí 15 phần tử vừa nạp trong mỗi Cache Line', [
                { label: 'a[0][0]', sub: 'MISS (100 ns)', tone: 'red', active: true },
                { label: 'a[0][1..N-1]', sub: 'Bỏ phí không đọc!', tone: 'gray' },
                { label: 'a[1][0]', sub: 'MISS lại (100 ns)', tone: 'red', active: true },
                { label: 'a[2][0]', sub: 'MISS lại (100 ns)', tone: 'red' }
              ], { icon: 'alert' })
            },
            links: {
              c_l: D.link('cpu', 'l1', { label: 'Cache Miss!', tone: 'red', fail: 0.6 }),
              l_r: D.link('l1', 'ram', { label: 'Chờ 100 ns/lần', tone: 'red' })
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
            order: { val: 'Theo hàng (Row)', level: 'good' },
            speed: { val: 'Tối ưu phần cứng', level: 'good' }
          },
          scene: {
            entities: {
              cpu: D.rack(-11, 2.2, 'CPU (hết tốc)', { color: 'green', glyph: 'cpu', halo: 'green', sub: 'a[0][0] → a[0][1]' }),
              l1: D.block(0, 2.2, { color: 'green', glyph: 'cache', label: ['Cache L1 + Prefetch'], sub: 'Trúng đích liên tục', tags: [{ text: 'Khai thác trọn 64B', tone: 'green' }] }),
              ram: D.rack(11, 2.2, 'RAM (Row-major)', { color: 'blue', glyph: 'memory', cpu: 0.25, sub: 'Đọc tuần tự êm mượt' }),
              fr: D.frame(0, -4.6, 'Quét tuần tự theo hàng + Hardware Prefetcher nạp trước', [
                { label: 'a[0][0]', sub: '+0 B', tone: 'green' },
                { label: 'a[0][1]', sub: '+4 B · HIT ✓', tone: 'green', active: true },
                { label: 'a[0][2]', sub: '+8 B · HIT ✓', tone: 'green' },
                { label: 'Line kế tiếp', sub: 'Prefetch sẵn ✓', tone: 'teal' }
              ], { icon: 'cache' })
            },
            links: {
              c_l: D.link('cpu', 'l1', { label: 'Hit liên tiếp', tone: 'green' }),
              r_l: D.link('ram', 'l1', { label: 'Prefetch sẵn', tone: 'green', style: 'dashed' })
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
            ex: { val: '0100 0001₂ = 65', level: 'good' },
            bytes: { val: '1 byte = 8 bit', level: 'good' },
            compat: { val: 'Nền tảng phần cứng', level: '' }
          },
          scene: {
            entities: {
              bits: D.block(-10.5, 2.2, { color: 'blue', glyph: 'binary', label: ['0100 0001₂'], sub: '2⁶ + 2⁰ = 64 + 1' }),
              dec: D.block(0.5, 2.2, { color: 'green', glyph: 'code', label: ['Giá trị = 65'], sub: "Số nguyên hoặc 'A'" }),
              ram: D.rack(11.5, 2.2, '1 ô Byte RAM', { color: 'purple', glyph: 'memory', sub: '0..255 (2⁸ mức)' }),
              fr: D.frame(0, -4.6, 'Trọng số 8 bit trong 1 byte (0100 0001₂ = 64 + 1 = 65)', [
                { label: '0', sub: '128', tone: 'gray' },
                { label: '1', sub: '64 ✓', tone: 'blue', active: true },
                { label: '0', sub: '32', tone: 'gray' },
                { label: '0', sub: '16', tone: 'gray' },
                { label: '0', sub: '8', tone: 'gray' },
                { label: '0', sub: '4', tone: 'gray' },
                { label: '0', sub: '2', tone: 'gray' },
                { label: '1', sub: '1 ✓', tone: 'green', active: true }
              ], { icon: 'binary' })
            },
            links: {
              b_d: D.link('bits', 'dec', { label: 'Cộng trọng số 2^k' }),
              d_r: D.link('dec', 'ram', { label: 'Lưu 1 byte', tone: 'green' })
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
            base: { val: 'Hệ 16 (Hex 0x)', level: 'good' },
            ex: { val: '0100·0001 → 0x41', level: 'good' },
            bytes: { val: '2 số hex = 1 byte', level: 'good' },
            compat: { val: 'Địa chỉ & hex dump', level: 'good' }
          },
          scene: {
            entities: {
              hi: D.block(-10, 5.0, { color: 'blue', glyph: 'binary', label: ['4 bit cao: 0100'], sub: '= 4 (hex)' }),
              lo: D.block(-10, -0.5, { color: 'teal', glyph: 'binary', label: ['4 bit thấp: 0001'], sub: '= 1 (hex)' }),
              hex: D.block(3.5, 2.2, { color: 'green', glyph: 'terminal', halo: 'green', label: ['Byte 0x41'], sub: "Thập phân 65 · 'A'", tags: [{ text: 'Gọn 4× so với nhị phân', tone: 'green' }] }),
              fr: D.frame(0, -5.0, 'Gom từng cụm 4 bit (nibble) thành 1 chữ số thập lục phân', [
                { label: '0111', sub: '→ 7', tone: 'blue' },
                { label: '1110', sub: '→ E (14)', tone: 'violet', active: true },
                { label: '1010', sub: '→ A (10)', tone: 'teal' },
                { label: 'Kết quả', sub: '0x7EA', tone: 'green', active: true }
              ], { icon: 'binary' })
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
            ex: { val: 'à=U+00E0 ộ=U+1ED9', level: 'good' },
            bytes: { val: 'Cần chuẩn mã hóa', level: 'warn' },
            compat: { val: '128 mã trùng ASCII', level: 'good' }
          },
          scene: {
            entities: {
              asc: D.block(-9.5, 2.2, { color: 'amber', glyph: 'code', label: ['ASCII (0..127)'], sub: 'Chỉ chữ không dấu', tags: [{ text: 'Thiếu tiếng Việt', tone: 'amber' }] }),
              uni: D.block(8.5, 2.2, { color: 'violet', glyph: 'globe', halo: 'violet', label: ['Bảng mã Unicode'], sub: 'Mọi chữ viết thế giới', tags: [{ text: '> 149 000 ký tự', tone: 'violet' }] }),
              fr: D.frame(0, -4.6, 'Ánh xạ ký tự tiếng Việt sang mã hiệu Unicode (Code Point)', [
                { label: "'H'", sub: 'U+0048 (ASCII)', tone: 'green' },
                { label: "'à'", sub: 'U+00E0 (Latin-1)', tone: 'blue', active: true },
                { label: "'ộ'", sub: 'U+1ED9 (Việt)', tone: 'violet', active: true },
                { label: "'i'", sub: 'U+0069 (ASCII)', tone: 'green' }
              ], { icon: 'globe' })
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
            ex: { val: '48 C3 A0 20 4E...', level: 'good' },
            bytes: { val: '9 byte / 6 ký tự', level: 'good' },
            compat: { val: '100% khớp ASCII', level: 'good' }
          },
          scene: {
            entities: {
              b1: D.block(-11, 2.2, { color: 'green', glyph: 'code', label: ["'H' ' ' 'N' 'i'"], sub: 'Mỗi ký tự 1 byte' }),
              b2: D.block(0, 2.2, { color: 'blue', glyph: 'code', label: ["'à' (U+00E0)"], sub: '2 byte: C3 A0' }),
              b3: D.block(11, 2.2, { color: 'purple', glyph: 'code', label: ["'ộ' (U+1ED9)"], sub: '3 byte: E1 BB 99', tags: [{ text: 'strlen() = 9!', tone: 'violet' }] }),
              fr: D.frame(0, -4.6, '9 byte thật sự của chuỗi "Hà Nội" trong bộ nhớ UTF-8', [
                { label: 'H', sub: '48 (1B)', tone: 'green' },
                { label: 'à', sub: 'C3 A0 (2B)', tone: 'blue', active: true },
                { label: '␣', sub: '20 (1B)', tone: 'paper' },
                { label: 'N', sub: '4E (1B)', tone: 'green' },
                { label: 'ộ', sub: 'E1 BB 99 (3B)', tone: 'violet', active: true },
                { label: 'i', sub: '69 (1B)', tone: 'green' }
              ], { icon: 'binary', note: 'Tổng: 1 + 2 + 1 + 1 + 3 + 1 = 9 byte (chưa tính \'\\0\')' })
            },
            links: {
              l1: D.link('b1', 'b2', { label: 'Nối byte' }),
              l2: D.link('b2', 'b3', { label: 'strlen() = 9', tone: 'green' })
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
            proc: { val: '3 tiến trình A,B,C', level: 'good' },
            iso: { val: 'Độc lập theo PID', level: 'good' },
            mode: { val: 'User Mode', level: '' },
            role: { val: 'Nạp & cấp phát', level: 'good' }
          },
          scene: {
            entities: {
              disk: D.db(-11.5, 0.5, 'cpu.exe trên SSD', { color: 'purple', sub: 'Chương trình tĩnh' }),
              os: D.rack(-1.5, 0.5, 'Nhân Hệ điều hành', { color: 'orange', glyph: 'gear', sub: 'Tạo 3 Process' }),
              ramZ: D.zone(4.8, 14.4, -6.6, 9.0, 'TIẾN TRÌNH TRONG RAM', { tone: 'blue' }),
              p1: D.block(9.8, 4.8, { color: 'blue', label: ['Tiến trình A'], sub: 'PID 101' }),
              p2: D.block(9.8, 0.2, { color: 'green', label: ['Tiến trình B'], sub: 'PID 102' }),
              p3: D.block(9.8, -4.4, { color: 'teal', label: ['Tiến trình C'], sub: 'PID 103' })
            },
            links: {
              d_o: D.link('disk', 'os', { label: 'Nạp mã máy' }),
              o_1: D.link('os', 'p1', { label: 'Cấp PID 101' }),
              o_2: D.link('os', 'p2', { label: 'Cấp PID 102' }),
              o_3: D.link('os', 'p3', { label: 'Cấp PID 103' })
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
            proc: { val: 'A, B, C xen kẽ', level: 'good' },
            iso: { val: 'PC riêng từng PID', level: 'good' },
            mode: { val: 'Time-sharing', level: 'good' },
            role: { val: 'Lập lịch CPU', level: 'good' }
          },
          scene: {
            entities: {
              p1: D.block(-11.5, 4.8, { color: 'blue', label: ['Tiến trình A'], sub: 'In "A"' }),
              p2: D.block(-11.5, -0.4, { color: 'green', label: ['Tiến trình B'], sub: 'In "B"' }),
              sch: D.router(-0.5, 2.2, 'OS Scheduler', { color: 'orange', wifi: false, sub: 'Chuyển lát thời gian' }),
              cpu: D.rack(11, 2.2, 'CPU Vật lý', { color: 'blue', glyph: 'cpu', halo: 'blue', sub: 'Chạy luân phiên' }),
              fr: D.frame(0, -5.0, 'Trục thời gian trên 1 lõi CPU (Context Switch mỗi vài ms)', [
                { label: 'Chạy A', sub: 'Lưu PC_A', tone: 'blue' },
                { label: 'Chạy B', sub: 'Nạp PC_B', tone: 'green', active: true },
                { label: 'Chạy A', sub: 'Tiếp tục A', tone: 'blue' },
                { label: 'Chạy B', sub: 'Tiếp tục B', tone: 'green' }
              ], { icon: 'cpu' })
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
            proc: { val: 'An toàn chéo PID', level: 'good' },
            iso: { val: 'Trang ảo → vật lý', level: 'good' },
            mode: { val: 'Bảo vệ MMU', level: 'good' },
            role: { val: 'Quản lý bộ nhớ', level: 'good' }
          },
          scene: {
            entities: {
              p1: D.block(-11.5, 4.8, { color: 'blue', label: ['Tiến trình A'], sub: 'Ảo 0x1000' }),
              p2: D.block(-11.5, -0.4, { color: 'green', label: ['Tiến trình B'], sub: 'Ảo 0x1000' }),
              mmu: D.firewall(-0.5, 2.2, 'Kernel + MMU', { color: 'violet', glyph: 'shield', sub: 'Bảng trang độc lập' }),
              ram: D.rack(11, 2.2, 'RAM Vật lý', { color: 'purple', glyph: 'memory', sub: 'Khung A ≠ Khung B', tags: [{ text: 'Cách ly hoàn toàn', tone: 'green' }] }),
              fr: D.frame(0, -5.0, 'Cùng địa chỉ ảo 0x1000 nhưng ánh xạ sang 2 khung RAM tách rời', [
                { label: 'PID A · 0x1000', sub: '→ Khung vật lý #12', tone: 'blue' },
                { label: 'MMU Guard', sub: 'Chặn truy cập chéo ✓', tone: 'violet', active: true },
                { label: 'PID B · 0x1000', sub: '→ Khung vật lý #47', tone: 'green' }
              ], { icon: 'shield' })
            },
            links: {
              a_m: D.link('p1', 'mmu', { label: '0x1000 (A)' }),
              b_m: D.link('p2', 'mmu', { label: '0x1000 (B)' }),
              m_r: D.link('mmu', 'ram', { label: '2 khung RAM riêng', tone: 'green' })
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
            mode: { val: 'System Call write()', level: 'good' },
            role: { val: 'Quản lý I/O & Tệp', level: 'good' }
          },
          scene: {
            entities: {
              uz: D.zone(-14.2, -5.5, -1.8, 7.2, 'USER MODE', { tone: 'blue' }),
              kz: D.zone(-3.8, 14.0, -1.8, 7.2, 'KERNEL MODE & PHẦN CỨNG', { tone: 'amber' }),
              app: D.dev(-10, 2.2, 'Chương trình C', { sub: 'printf()', halo: 'blue' }),
              ker: D.firewall(0.5, 2.2, 'Nhân Hệ điều hành', { color: 'orange', glyph: 'shield', sub: 'Kiểm quyền · Driver' }),
              hw: D.db(10.5, 2.2, 'Màn hình & SSD', { color: 'green', sub: 'Hệ thống tệp' }),
              pn: D.panel(0, -4.8, 'Lộ trình an toàn từ hàm C tới phần cứng', [
                '> User Mode: printf("Hi") → thư viện C gọi system call write()',
                '+ Kernel Mode: kiểm quyền hạn → driver ghi màn hình / tệp đĩa'
              ], { icon: 'shield' })
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
              s1: D.block(-11, 2.2, { color: 'blue', glyph: 'code', label: ['1071 % 462'], sub: 'r = 147' }),
              s2: D.block(0, 2.2, { color: 'teal', glyph: 'code', label: ['462 % 147'], sub: 'r = 21' }),
              s3: D.block(11, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['147 % 21 = 0'], sub: 'ƯCLN = 21', tags: [{ text: 'Dừng sau 3 bước', tone: 'green' }] }),
              pn: D.panel(0, -4.5, 'Bảng vết thuật toán Euclid (a = 1071, b = 462)', [
                '> Bước 1: a = 1071, b = 462  → r = 147',
                '> Bước 2: a =  462, b = 147  → r =  21',
                '+ Bước 3: a =  147, b =  21  → r =   0  ⇒ Trả về 21'
              ], { icon: 'code' })
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
            scale: { val: 'Chậm hơn 1 000×', level: 'bad' }
          },
          scene: {
            entities: {
              q: D.dev(-11, 2.2, 'Cần tìm "Hùng"'),
              arr: D.queue(0, 2.2, 'Danh bạ 1 tỷ mục', { n: 6, slots: 6, color: 'red', tags: [{ text: 'Duyệt 0 → n-1', tone: 'red' }] }),
              res: D.rack(11, 2.2, '1 tỷ phép so sánh', { color: 'red', heat: 0.7, sub: 'Tăng tuyến tính n' }),
              fr: D.frame(0, -4.6, 'Quét tuần tự O(n): kiểm từng mục một từ đầu đến cuối', [
                { label: 'Mục 0', sub: 'Sai', tone: 'gray' },
                { label: 'Mục 1', sub: 'Sai', tone: 'gray' },
                { label: '...', sub: '500 triệu bước', tone: 'amber' },
                { label: 'Mục n-1', sub: '1 tỷ bước (xấu nhất)!', tone: 'red', active: true }
              ], { icon: 'search' })
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
              s1: D.block(-11, 2.2, { color: 'blue', label: ['1 000 000 000'], sub: 'Mở giữa → bỏ 50%' }),
              s2: D.block(0, 2.2, { color: 'teal', label: ['500 000 000'], sub: '→ 250M → 125M...' }),
              s3: D.block(11, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['Còn 1 mục'], sub: 'Sau ≤ 30 bước!', tags: [{ text: 'O(log₂ n)', tone: 'green' }] }),
              fr: D.frame(0, -4.6, 'Không gian tìm kiếm co theo lũy thừa 2 (2³⁰ > 1 000 000 000)', [
                { label: 'Bước 0', sub: '1 tỷ mục', tone: 'blue' },
                { label: 'Bước 1', sub: '500 triệu', tone: 'teal' },
                { label: 'Bước 10', sub: '~1 triệu', tone: 'teal' },
                { label: 'Bước 20', sub: '~1 000', tone: 'green' },
                { label: 'Bước 30', sub: '1 mục ✓', tone: 'green', active: true }
              ], { icon: 'search' })
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
            scale: { val: '1000× n → 10⁶× t', level: 'bad' }
          },
          scene: {
            entities: {
              o1: D.block(-11, 2.2, { color: 'green', label: ['O(log n)'], sub: '2n → +1 bước' }),
              on: D.block(0, 2.2, { color: 'amber', label: ['O(n)'], sub: '2n → thời gian ×2' }),
              on2: D.block(11, 2.2, { color: 'red', heat: 0.65, label: ['O(n²)'], sub: '2n → thời gian ×4!', tags: [{ text: 'Hai vòng lặp lồng', tone: 'red' }] }),
              pn: D.panel(0, -4.6, 'Thí nghiệm nhân đôi (Doubling Ratio) khi tăng n gấp 1 000 lần', [
                '+ O(log n): chỉ thêm ~10 bước (gần như không đổi)',
                '~ O(n):     tăng 1 000 lần',
                '! O(n²):    tăng 1 000 000 lần (1 giây → 11,5 ngày!)'
              ], { icon: 'cpu' })
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
            cmd: { val: 'gcc -E hello.c', level: '' },
            file: { val: 'hello.i (văn bản)', level: 'good' },
            err: { val: 'Thiếu tệp header', level: '' },
            verdict: { val: 'Đang biên dịch', level: '' }
          },
          scene: {
            entities: {
              src: D.block(-11, 5.0, { color: 'blue', glyph: 'code', label: ['hello.c'], sub: '#include <stdio.h>' }),
              hdr: D.block(-11, -0.4, { color: 'gray', glyph: 'code', label: ['stdio.h'], sub: 'Khai báo printf' }),
              cpp: D.rack(0, 2.2, 'Tiền xử lý (cpp)', { color: 'teal', glyph: 'gear', sub: 'gcc -E' }),
              out: D.block(11, 2.2, { color: 'green', glyph: 'code', label: ['hello.i'], sub: 'Mã C đã mở rộng' }),
              fr: D.frame(0, -5.0, '4 công đoạn của hệ thống biên dịch GCC (CS:APP)', [
                { label: '1. -E (cpp)', sub: 'hello.c → hello.i', tone: 'green', active: true },
                { label: '2. -S (cc1)', sub: 'hello.i → hello.s', tone: 'paper' },
                { label: '3. -c (as)', sub: 'hello.s → hello.o', tone: 'paper' },
                { label: '4. Linker (ld)', sub: 'hello.o → hello.exe', tone: 'paper' }
              ], { icon: 'terminal' })
            },
            links: {
              s_c: D.link('src', 'cpp', { label: 'Mã nguồn' }),
              h_c: D.link('hdr', 'cpp', { label: 'Chèn #include', style: 'dashed' }),
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
            cmd: { val: 'gcc -S hello.i', level: 'good' },
            file: { val: 'hello.s (x86-64)', level: 'good' },
            err: { val: 'Cú pháp / Kiểu → CE', level: 'warn' },
            verdict: { val: 'Qua kiểm tĩnh', level: 'good' }
          },
          scene: {
            entities: {
              hi: D.block(-11, 2.2, { color: 'blue', glyph: 'code', label: ['hello.i'], sub: 'pos = init + rate * 60' }),
              cc: D.rack(0, 2.2, 'Trình biên dịch cc1', { color: 'violet', glyph: 'cpu', halo: 'violet', sub: '-Wall -Wextra', tags: [{ text: 'Bắt lỗi trước khi chạy', tone: 'violet' }] }),
              hs: D.block(11, 2.2, { color: 'green', glyph: 'terminal', label: ['hello.s'], sub: 'Hợp ngữ mov · add' }),
              fr: D.frame(0, -4.6, '4 pha phân tích bên trong trình biên dịch cc1 (Dragon Book)', [
                { label: 'Từ vựng', sub: 'Tách Token', tone: 'blue' },
                { label: 'Cú pháp', sub: 'Dựng cây AST', tone: 'teal' },
                { label: 'Ngữ nghĩa', sub: 'Kiểm kiểu dữ liệu', tone: 'violet', active: true },
                { label: 'Tối ưu & Sinh mã', sub: 'Xuất hello.s ✓', tone: 'green' }
              ], { icon: 'code' })
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
            cmd: { val: 'gcc -c → ld', level: 'good' },
            file: { val: 'hello.o → .exe', level: 'good' },
            err: { val: 'Undefined ref', level: 'warn' },
            verdict: { val: 'Tệp chạy hoàn chỉnh', level: 'good' }
          },
          scene: {
            entities: {
              ho: D.block(-11, 5.0, { color: 'blue', glyph: 'binary', label: ['hello.o'], sub: 'Mã máy (U printf)' }),
              lib: D.db(-11, -0.5, 'Thư viện chuẩn C', { color: 'purple', sub: 'printf · qsort' }),
              ld: D.rack(0, 2.2, 'Trình liên kết ld', { color: 'orange', glyph: 'layers', sub: 'Giải ký hiệu U' }),
              exe: D.block(11, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['hello.exe'], sub: 'Chạy trên OS', tags: [{ text: 'Mã máy sẵn sàng', tone: 'green' }] }),
              pn: D.panel(0, -5.0, 'Giải quyết ký hiệu lúc liên kết (nm / objdump)', [
                '~ Trong hello.o: ký hiệu printf có nhãn U (Undefined)',
                '+ Linker ghép printf từ libc/UCRT → xuất hello.exe hoàn chỉnh'
              ], { icon: 'layers' })
            },
            links: {
              o_l: D.link('ho', 'ld', { label: 'Tệp đối tượng' }),
              b_l: D.link('lib', 'ld', { label: 'Hàm thư viện', style: 'dashed' }),
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
            cmd: { val: 'Chạy N tệp test', level: 'good' },
            file: { val: 'stdin → stdout', level: 'good' },
            err: { val: 'CE · RE · TLE · WA', level: 'warn' },
            verdict: { val: 'AC (Accepted)', level: 'good' }
          },
          scene: {
            entities: {
              tc: D.queue(-11, 2.2, 'Bộ ca kiểm thử biên', { n: 5, slots: 6, color: 'blue', tags: [{ text: '2 2 2 · 1 2 3 · 3 4 5', tone: 'blue' }] }),
              run: D.rack(0, 2.2, 'Bộ chấm tự động', { color: 'teal', glyph: 'terminal', sub: 'Chạy + Hẹn giờ' }),
              ok: D.block(11, 5.0, { color: 'green', glyph: 'check', label: ['AC (Đúng hết)'], sub: 'Khớp mọi ca' }),
              err: D.block(11, -0.5, { color: 'red', glyph: 'alert', label: ['WA / TLE / RE / CE'], sub: 'Lỗi cụ thể' }),
              fr: D.frame(0, -5.0, '5 mã phán quyết chuẩn của hệ thống chấm bài tự động', [
                { label: 'AC', sub: 'Đúng hết ✓', tone: 'green', active: true },
                { label: 'WA', sub: 'Sai kết quả', tone: 'red' },
                { label: 'TLE', sub: 'Quá thời gian', tone: 'amber' },
                { label: 'RE', sub: 'Lỗi chạy (crash)', tone: 'red' },
                { label: 'CE', sub: 'Lỗi biên dịch', tone: 'gray' }
              ], { icon: 'terminal' })
            },
            links: {
              t_r: D.link('tc', 'run', { label: 'Nạp đầu vào' }),
              r_o: D.link('run', 'ok', { label: 'Đầu ra khớp', tone: 'green' }),
              r_e: D.link('run', 'err', { label: 'Sai biên / quá giờ', tone: 'red', style: 'dashed' })
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
            lvl: { val: 'Máy → C → Python', level: 'good' },
            style: { val: 'Biên dịch / Thông dịch', level: '' },
            ctrl: { val: 'C sát phần cứng', level: 'good' },
            dep: { val: 'Chuẩn ISO C17', level: 'good' }
          },
          scene: {
            entities: {
              py: D.block(-11, 2.2, { color: 'amber', glyph: 'code', label: ['Python / Java'], sub: 'Trừu tượng cao · VM' }),
              c: D.block(0, 2.2, { color: 'green', glyph: 'code', halo: 'green', label: ['Ngôn ngữ C17'], sub: 'Sát phần cứng · Nhanh', tags: [{ text: 'Biên dịch thẳng mã máy', tone: 'green' }] }),
              hw: D.rack(11, 2.2, 'Hợp ngữ & Mã máy', { color: 'purple', glyph: 'cpu', sub: 'x86-64 / ARM' }),
              fr: D.frame(0, -4.6, 'Cùng 1 phép cộng ở 4 bậc trừu tượng ngôn ngữ', [
                { label: 'Mã máy', sub: '190 (nhị phân)', tone: 'violet' },
                { label: 'Hợp ngữ', sub: 'addl %eax, %edx', tone: 'blue' },
                { label: 'Ngôn ngữ C', sub: 'c = a + b; (nhanh)', tone: 'green', active: true },
                { label: 'Python', sub: 'c = a + b (gọn)', tone: 'amber' }
              ], { icon: 'layers' })
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
            ctrl: { val: '1 lối vào · 1 lối ra', level: 'good' },
            dep: { val: 'Không cần goto rối', level: 'good' }
          },
          scene: {
            entities: {
              seq: D.block(-11, 2.2, { color: 'blue', glyph: 'layers', label: ['1. Tuần tự'], sub: 'Lệnh nối lệnh' }),
              br: D.block(0, 2.2, { color: 'amber', glyph: 'layers', label: ['2. Rẽ nhánh'], sub: 'if / else / switch' }),
              lp: D.block(11, 2.2, { color: 'green', glyph: 'replay', halo: 'green', label: ['3. Vòng lặp'], sub: 'while · for · do-while', tags: [{ text: 'Đủ mọi thuật toán', tone: 'green' }] }),
              pn: D.panel(0, -4.6, 'Định lý Böhm–Jacopini (1966) & Phân rã từ trên xuống', [
                '+ Mọi khối có đúng 1 lối vào và 1 lối ra → dễ kiểm chứng đúng',
                '+ Loại bỏ lệnh nhảy goto chằng chịt ("spaghetti code")'
              ], { icon: 'layers' })
            },
            links: {
              l1: D.link('seq', 'br', { label: 'Ghép khối' }),
              l2: D.link('br', 'lp', { label: 'Lồng nhau kỷ luật', tone: 'green' })
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
            lvl: { val: 'Encapsulation', level: 'good' },
            style: { val: 'Cấu trúc vs OOP', level: '' },
            ctrl: { val: 'private bảo vệ số dư', level: 'good' },
            dep: { val: 'Nền cho môn OOP', level: 'good' }
          },
          scene: {
            entities: {
              cz: D.zone(-14.0, -4.5, -2.2, 8.2, 'C CẤU TRÚC (TÁCH RỜI)', { tone: 'amber' }),
              c_fn: D.block(-9.2, 5.0, { color: 'blue', label: ['withdraw(&acc)'], sub: 'Hàm tách ngoài' }),
              c_st: D.block(-9.2, -0.2, { color: 'amber', label: ['struct Account'], sub: 'balance công khai' }),
              oop: D.firewall(8.5, 2.2, 'Account (OOP)', { color: 'green', glyph: 'shield', halo: 'green', sub: 'private balance + method', tags: [{ text: 'Đóng gói bất biến', tone: 'green' }] }),
              pn: D.panel(0.5, -5.2, 'Khác biệt cốt lõi trong kiểm soát dữ liệu', [
                '! C: mọi hàm đều có thể gán trực tiếp acc.balance = -999',
                '+ OOP: chỉ withdraw() được phép sửa sau khi kiểm tra balance >= amount'
              ], { icon: 'shield' })
            },
            links: {
              fc: D.link('c_fn', 'c_st', { label: 'Truyền &acc' }),
              cmp: D.link('c_st', 'oop', { label: 'Tiến hóa đóng gói', style: 'dashed' })
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
            style: { val: 'Stdlib & Package', level: 'good' },
            ctrl: { val: 'Giảm rủi ro nguồn', level: 'good' },
            dep: { val: 'qsort (<stdlib.h>)', level: 'good' }
          },
          scene: {
            entities: {
              app: D.dev(-11.5, 2.2, 'Ứng dụng của bạn', { sub: 'Gọi qsort()' }),
              std: D.firewall(0, 5.2, 'Thư viện chuẩn C', { color: 'green', glyph: 'shield', sub: 'stdlib · string · math', tags: [{ text: 'Ổn định lâu dài', tone: 'green' }] }),
              pkg: D.cloud(0, -1.0, ['Gói ngoài left-pad'], { color: 'red', glyph: 'alert', heat: 0.55, sub: '11 dòng bị gỡ → gãy!' }),
              out: D.rack(11.5, 2.2, 'Bản build bền vững', { color: 'green', glyph: 'check', sub: 'Ít phụ thuộc thừa' }),
              pn: D.panel(0, -5.2, 'Bài học quản trị phụ thuộc (left-pad 2016)', [
                '+ Ưu tiên hàm thư viện chuẩn đã kiểm chứng (qsort, bsearch)',
                '! Không kéo gói ngoài cho vài dòng logic nhỏ lẻ; luôn khóa phiên bản'
              ], { icon: 'shield' })
            },
            links: {
              a_s: D.link('app', 'std', { label: 'Ưu tiên dùng sẵn', tone: 'green' }),
              s_o: D.link('std', 'out', { label: 'Liên kết tin cậy', tone: 'green' }),
              a_p: D.link('app', 'pkg', { label: 'Phụ thuộc mong manh', tone: 'red', style: 'cut', fail: 0.7 })
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
            type: { val: '5/9=0 vs 5.0/9.0', level: 'warn' },
            cond: { val: 'sizeof(int) = 4B', level: '' },
            loop: { val: 'Kiểm kiểu trước', level: '' },
            trap: { val: 'Tràn int có dấu', level: 'bad' }
          },
          scene: {
            entities: {
              bad: D.block(-10.5, 4.8, { color: 'red', glyph: 'alert', label: ['5 / 9 * (f - 32)'], sub: 'Chia nguyên → luôn = 0!' }),
              ok: D.block(-10.5, -0.4, { color: 'green', glyph: 'check', label: ['5.0 / 9.0 * (f - 32)'], sub: 'Số thực double chính xác' }),
              out: D.dev(10, 2.2, 'Bảng độ C (printf)', { sub: '100°F → 37.78°C', halo: 'green', tags: [{ text: 'Định dạng %.2f', tone: 'green' }] }),
              fr: D.frame(0, -5.0, 'Hai bẫy kiểu dữ liệu kinh điển trong C (K&R)', [
                { label: '5 / 9', sub: '== 0 (cắt phần lẻ!)', tone: 'red' },
                { label: '5.0 / 9.0', sub: '== 0.5556 (double ✓)', tone: 'green', active: true },
                { label: '50000 * 50000', sub: 'Tràn int 32-bit → long long!', tone: 'amber' }
              ], { icon: 'alert' })
            },
            links: {
              b_o: D.link('bad', 'out', { label: 'Sai: 0.00°C', tone: 'red', style: 'cut', fail: 0.7 }),
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
            cond: { val: 'Sai → Đều → Cân', level: 'good' },
            loop: { val: '1 nhánh duy nhất', level: 'good' },
            trap: { val: 'Đảo Đều và Cân', level: 'warn' }
          },
          scene: {
            entities: {
              inp: D.dev(-11.5, 2.2, 'Đầu vào: 2, 2, 2'),
              c1: D.block(-1, 5.2, { color: 'amber', label: ['1. Hợp lệ?'], sub: 'a+b>c → Đúng' }),
              c2: D.block(-1, -0.4, { color: 'green', label: ['2. a==b && b==c?'], sub: 'Đều trước Cân!', tags: [{ text: 'Đúng thứ tự', tone: 'green' }] }),
              res: D.block(11, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['EQUILATERAL'], sub: 'Tam giác đều (AC)' }),
              fr: D.frame(0, -5.2, 'Chuỗi thứ tự nhánh else-if chuẩn (bài toán tam giác Myers)', [
                { label: '1. Không hợp lệ', sub: 'a+b <= c', tone: 'red' },
                { label: '2. Đều (chặt)', sub: 'a==b && b==c ✓', tone: 'green', active: true },
                { label: '3. Cân (rộng)', sub: 'a==b || b==c...', tone: 'blue' },
                { label: '4. Thường', sub: 'else', tone: 'paper' }
              ], { icon: 'layers' })
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
            type: { val: 'Nguyên / char', level: 'good' },
            cond: { val: 'Khớp hằng case', level: 'good' },
            loop: { val: 'Thoát nhờ break', level: 'good' },
            trap: { val: 'Quên break (trôi)', level: 'warn' }
          },
          scene: {
            entities: {
              sw: D.block(-11, 2.2, { color: 'blue', glyph: 'code', label: ['switch (day = 3)'], sub: 'Nhảy thẳng case 3' }),
              c3: D.block(0, 2.2, { color: 'green', label: ['case 3: case 23:'], sub: 'printf("rd"); break;', tags: [{ text: 'break chặn trôi', tone: 'green' }] }),
              end: D.dev(11, 2.2, '"3rd day"', { halo: 'green', sub: 'Thoát switch sạch' }),
              fr: D.frame(0, -4.6, 'Gộp nhãn case có chủ đích vs bẫy quên break', [
                { label: 'case 1,21,31:', sub: '"st" + break;', tone: 'blue' },
                { label: 'case 2,22:', sub: '"nd" + break;', tone: 'teal' },
                { label: 'case 3,23:', sub: '"rd" + break; ✓', tone: 'green', active: true },
                { label: 'default:', sub: '"th"', tone: 'paper' }
              ], { icon: 'code' })
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
            cond: { val: 'Kiểm ở cuối vòng', level: 'good' },
            loop: { val: 'Chạy ít nhất 1 lần', level: 'good' },
            trap: { val: 'while cho 0 chữ số!', level: 'good' }
          },
          scene: {
            entities: {
              st: D.block(-11, 2.2, { color: 'blue', label: ['n = 0, digits = 0'], sub: 'Khởi tạo ca biên' }),
              body: D.block(0, 2.2, { color: 'green', glyph: 'replay', halo: 'green', label: ['do { n/=10; d++; }'], sub: 'Chạy 1 lần → d = 1' }),
              chk: D.block(11, 2.2, { color: 'green', glyph: 'check', label: ['while (n > 0)? Sai'], sub: 'Thoát · Kết quả = 1', tags: [{ text: 'Đúng ca biên n=0', tone: 'green' }] }),
              pn: D.panel(0, -4.6, 'Chọn đúng 1 trong 3 vòng lặp của C', [
                '+ for:      biết rõ số lượt đếm (duyệt mảng, in kim tự tháp *)',
                '+ while:    lặp theo điều kiện, có thể chạy 0 lần (Euclid)',
                '+ do-while: luôn chạy ít nhất 1 lần (đếm chữ số của n = 0, menu)'
              ], { icon: 'replay' })
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
            op: { val: '4 byte / biến int', level: '' },
            effect: { val: 'Mục tiêu: a=8, b=3', level: '' }
          },
          scene: {
            entities: {
              z: D.zone(-11.5, 11.5, -1.6, 6.8, 'KHUNG NGĂN XẾP CỦA MAIN()', { tone: 'blue' }),
              va: D.block(-5, 2.2, { color: 'blue', glyph: 'memory', label: ['a = 3'], sub: 'Địa chỉ 0xFFA3C' }),
              vb: D.block(5, 2.2, { color: 'teal', glyph: 'memory', label: ['b = 8'], sub: 'Địa chỉ 0xFFA40' }),
              fr: D.frame(0, -4.6, 'Bản đồ bộ nhớ cục bộ trong main() (mỗi int chiếm 4 byte)', [
                { label: 'Biến a = 3', sub: '0xFFA3C', tone: 'blue', active: true },
                { label: 'Biến b = 8', sub: '0xFFA40 (+4B)', tone: 'teal', active: true }
              ], { icon: 'memory' })
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
            main: { val: 'a=3, b=8 (y nguyên!)', level: 'bad' },
            param: { val: 'Bản sao x, y', level: 'bad' },
            op: { val: 'Sao chép giá trị', level: 'warn' },
            effect: { val: 'Hoán đổi thất bại', level: 'bad' }
          },
          scene: {
            entities: {
              mz: D.zone(-14.2, -5.2, -3.4, 8.2, 'KHUNG MAIN()', { tone: 'blue' }),
              sz: D.zone(4.5, 14.2, -3.4, 8.2, 'KHUNG SWAP() (SẮP HỦY)', { tone: 'red' }),
              ma: D.block(-9.7, 4.8, { color: 'blue', label: ['a = 3'], sub: '0xFFA3C (nguyên)' }),
              mb: D.block(-9.7, -0.6, { color: 'teal', label: ['b = 8'], sub: '0xFFA40 (nguyên)' }),
              sx: D.block(9.3, 4.8, { color: 'red', label: ['x = 8'], sub: 'Bản sao cục bộ' }),
              sy: D.block(9.3, -0.6, { color: 'red', label: ['y = 3'], sub: 'Bản sao cục bộ' }),
              pn: D.panel(0, -5.2, 'Tại sao swap(a, b) thất bại trong C?', [
                '! C chỉ chép giá trị 3 và 8 sang hai ô nhớ x, y khác hoàn toàn',
                '! Khi swap() kết thúc, khung x, y bị thu hồi → a, b không đổi'
              ], { icon: 'alert' })
            },
            links: {
              ax: D.link('ma', 'sx', { label: 'Chép giá trị 3', style: 'dashed' }),
              by: D.link('mb', 'sy', { label: 'Chép giá trị 8', style: 'dashed' })
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
            param: { val: 'px=&a, py=&b', level: 'good' },
            op: { val: 'Lấy địa chỉ (&)', level: 'good' },
            effect: { val: 'Trỏ đúng biến gốc', level: 'good' }
          },
          scene: {
            entities: {
              mz: D.zone(-14.2, -5.2, -3.4, 8.2, 'KHUNG MAIN()', { tone: 'blue' }),
              sz: D.zone(4.5, 14.2, -3.4, 8.2, 'CON TRỎ TRONG SWAP()', { tone: 'violet' }),
              ma: D.block(-9.7, 4.8, { color: 'blue', glyph: 'memory', label: ['a = 3'], sub: '0xFFA3C' }),
              mb: D.block(-9.7, -0.6, { color: 'teal', glyph: 'memory', label: ['b = 8'], sub: '0xFFA40' }),
              px: D.block(9.3, 4.8, { color: 'violet', glyph: 'code', label: ['int *px'], sub: 'Lưu 0xFFA3C' }),
              py: D.block(9.3, -0.6, { color: 'violet', glyph: 'code', label: ['int *py'], sub: 'Lưu 0xFFA40' }),
              fr: D.frame(0, -5.2, 'Toán tử & lấy địa chỉ nạp vào biến con trỏ int *', [
                { label: 'px = &a', sub: 'Giữ 0xFFA3C → a', tone: 'violet', active: true },
                { label: 'py = &b', sub: 'Giữ 0xFFA40 → b', tone: 'violet', active: true }
              ], { icon: 'code' })
            },
            links: {
              p_a: D.link('px', 'ma', { label: 'Trỏ về 0xFFA3C', tone: 'green' }),
              p_b: D.link('py', 'mb', { label: 'Trỏ về 0xFFA40', tone: 'green' })
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
            main: { val: 'a = 8, b = 3 (đổi!)', level: 'good' },
            param: { val: 'Ghi qua *px, *py', level: 'good' },
            op: { val: 'Toán tử * và &', level: 'good' },
            effect: { val: 'Hiểu cả scanf(&n)', level: 'good' }
          },
          scene: {
            entities: {
              ma: D.block(-10, 4.8, { color: 'green', glyph: 'check', label: ['main: a = 8'], sub: '0xFFA3C (đã đổi!)' }),
              mb: D.block(-10, -0.6, { color: 'green', glyph: 'check', label: ['main: b = 3'], sub: '0xFFA40 (đã đổi!)' }),
              sw: D.rack(9.5, 2.2, 'swap(&a, &b)', { color: 'green', glyph: 'code', halo: 'green', sub: '*px ↔ *py', tags: [{ text: 'Như scanf("%d", &n)', tone: 'green' }] }),
              fr: D.frame(0, -5.0, '3 dòng truy cập qua con trỏ (*) sửa thẳng RAM của main()', [
                { label: 'int t = *px;', sub: 't = 3', tone: 'blue' },
                { label: '*px = *py;', sub: 'a ← 8 ✓', tone: 'green', active: true },
                { label: '*py = t;', sub: 'b ← 3 ✓', tone: 'green', active: true }
              ], { icon: 'memory' })
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
              f4: D.block(-12, 2.2, { color: 'blue', label: ['fact(4)'], sub: 'Chờ 4 * ?' }),
              f3: D.block(-4, 2.2, { color: 'blue', label: ['fact(3)'], sub: 'Chờ 3 * ?' }),
              f2: D.block(4, 2.2, { color: 'teal', label: ['fact(2)'], sub: 'Chờ 2 * ?' }),
              f1: D.block(12, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['fact(1) = 1'], sub: 'Cơ sở dừng!', tags: [{ text: 'Đỉnh Stack', tone: 'green' }] }),
              fr: D.frame(0, -4.5, 'Các khung ngăn xếp (Stack Frames) đang xếp trên Call Stack', [
                { label: 'main()', sub: 'Đáy stack', tone: 'gray' },
                { label: 'fact(4)', sub: 'n=4 · chờ', tone: 'blue' },
                { label: 'fact(3)', sub: 'n=3 · chờ', tone: 'blue' },
                { label: 'fact(2)', sub: 'n=2 · chờ', tone: 'teal' },
                { label: 'fact(1)', sub: 'Trả 1 ✓', tone: 'green', active: true }
              ], { icon: 'stack', pointers: [{ idx: 4, label: 'Stack Top', tone: 'green' }] })
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
              f4: D.block(-12, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['fact(4) → 24'], sub: 'Hoàn tất!' }),
              f3: D.block(-4, 2.2, { color: 'green', label: ['fact(3) → 6'], sub: '3 × 2' }),
              f2: D.block(4, 2.2, { color: 'green', label: ['fact(2) → 2'], sub: '2 × 1' }),
              f1: D.block(12, 2.2, { color: 'gray', label: ['fact(1)'], sub: 'Đã Pop (=1)' }),
              fr: D.frame(0, -4.6, 'Thứ tự thu hồi khung ngăn xếp (LIFO — Vào sau Ra trước)', [
                { label: 'Pop fact(1)', sub: 'Trả 1', tone: 'gray' },
                { label: 'Pop fact(2)', sub: '2 × 1 = 2', tone: 'teal' },
                { label: 'Pop fact(3)', sub: '3 × 2 = 6', tone: 'blue' },
                { label: 'Pop fact(4)', sub: '4 × 6 = 24 ✓', tone: 'green', active: true }
              ], { icon: 'stack' })
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
            top: { val: 'Vượt trần Stack', level: 'bad' },
            base: { val: 'Không bao giờ tới', level: 'bad' },
            cost: { val: 'Crash 0xC00000FD', level: 'bad' }
          },
          scene: {
            entities: {
              call: D.block(-11, 2.2, { color: 'red', glyph: 'replay', label: ['fact(-1) vô hạn'], sub: 'Thiếu điều kiện dừng' }),
              stk: D.queue(0, 2.2, 'Call Stack (đầy cứng!)', { n: 6, slots: 6, color: 'red', tags: [{ text: 'Stack Overflow!', tone: 'red' }] }),
              os: D.firewall(11, 2.2, 'Hệ điều hành', { color: 'red', heat: 0.85, glyph: 'alert', sub: 'Dừng tiến trình (RE)' }),
              pn: D.panel(0, -4.6, 'Hai điều kiện sống còn để đệ quy luôn dừng', [
                '+ 1. Có trường hợp cơ sở (Base case: n <= 1) trả thẳng không gọi tiếp',
                '+ 2. Mỗi lời gọi phải tiến chặt về trường hợp cơ sở (n → n - 1)'
              ], { icon: 'alert' })
            },
            links: {
              c_s: D.link('call', 'stk', { label: 'Push liên tục', tone: 'red' }),
              s_o: D.link('stk', 'os', { label: 'Tràn ngăn xếp', tone: 'red', style: 'cut', fail: 0.85 })
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
            depth: { val: 'Hà Nội: O(n) stack', level: 'good' },
            top: { val: 'Fib lặp: O(1) RAM', level: 'good' },
            base: { val: 'Chọn đúng công cụ', level: 'good' },
            cost: { val: 'O(n) ≪ O(2ⁿ)', level: 'good' }
          },
          scene: {
            entities: {
              fib: D.block(-9.5, 2.2, { color: 'red', heat: 0.55, label: ['fib(40) đệ quy'], sub: '~330 triệu lời gọi!', tags: [{ text: 'O(2ⁿ) tính thừa', tone: 'red' }] }),
              iter: D.block(9.5, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['fib(40) vòng lặp'], sub: 'Đúng 40 bước · O(n)!', tags: [{ text: 'Nhanh hơn triệu lần', tone: 'green' }] }),
              fr: D.frame(0, -4.6, 'Khi nào nên dùng đệ quy vs vòng lặp', [
                { label: 'Tháp Hà Nội', sub: '2ⁿ−1 bước · Đệ quy gọn ✓', tone: 'blue' },
                { label: 'fib(40) đệ quy', sub: '331 160 281 lời gọi ✕', tone: 'red' },
                { label: 'fib(40) vòng lặp', sub: '40 lượt · O(1) RAM ✓', tone: 'green', active: true }
              ], { icon: 'code' })
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
            mem: { val: 'base + i × 4 B', level: 'good' },
            inv: { val: 'Chỉ số 0 .. n-1', level: 'good' },
            mid: { val: 'Truy cập O(1)', level: 'good' },
            cplx: { val: 'Đọc a[i]: O(1)', level: 'good' }
          },
          scene: {
            entities: {
              a0: D.block(-12, 2.2, { color: 'blue', label: ['a[0] = 12'], sub: '+0 B' }),
              a1: D.block(-4, 2.2, { color: 'blue', label: ['a[1] = 25'], sub: '+4 B' }),
              a2: D.block(4, 2.2, { color: 'teal', label: ['a[2] = 41'], sub: '+8 B' }),
              a3: D.block(12, 2.2, { color: 'green', label: ['a[3] = 58'], sub: '+12 B', tags: [{ text: 'Ô nhớ sát nhau', tone: 'green' }] }),
              fr: D.frame(0, -4.5, 'Địa chỉ vật lý của int a[4] (1 phép cộng tính thẳng a[i])', [
                { label: 'a[0] = 12', sub: '0x1000', tone: 'blue' },
                { label: 'a[1] = 25', sub: '0x1004', tone: 'blue' },
                { label: 'a[2] = 41', sub: '0x1008', tone: 'teal', active: true },
                { label: 'a[3] = 58', sub: '0x100C', tone: 'green' }
              ], { icon: 'memory', pointers: [{ idx: 2, label: 'base + 2×4', tone: 'teal' }] })
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
            mem: { val: 'Tại chỗ O(1) RAM', level: 'good' },
            inv: { val: 'a[0..i-1] tăng dần', level: 'good' },
            mid: { val: 'Dịch phải & chèn', level: 'good' },
            cplx: { val: 'O(n) .. O(n²)', level: 'warn' }
          },
          scene: {
            entities: {
              sorted: D.block(-10.5, 2.2, { color: 'green', glyph: 'check', label: ['Đã sắp [12, 25, 41]'], sub: 'Luôn tăng dần' }),
              key: D.block(0.5, 5.2, { color: 'amber', glyph: 'code', halo: 'amber', label: ['key = 19'], sub: 'Dịch 25, 41 sang phải' }),
              rest: D.block(11, 2.2, { color: 'gray', label: ['Chưa xét [58, 7]'], sub: 'Chờ lượt kế' }),
              fr: D.frame(0, -4.5, 'Trạng thái mảng khi chèn key = 19 vào đoạn đã sắp [12, 25, 41]', [
                { label: '12', sub: 'a[0] giữ', tone: 'green' },
                { label: '19 (key)', sub: 'Chèn a[1] ✓', tone: 'amber', active: true },
                { label: '25 →', sub: 'Dịch a[2]', tone: 'blue' },
                { label: '41 →', sub: 'Dịch a[3]', tone: 'blue' },
                { label: '58 · 7', sub: 'Chưa xét', tone: 'gray' }
              ], { icon: 'layers', pointers: [{ idx: 1, label: 'Đúng vị trí', tone: 'amber' }] })
            },
            links: {
              k_s: D.link('key', 'sorted', { label: 'Chèn giữa 12 & 25', tone: 'green' }),
              r_k: D.link('rest', 'key', { label: 'Nhấc lá tiếp', style: 'dashed' })
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
            inv: { val: 'Thu hẹp chặt mỗi lượt', level: 'good' },
            mid: { val: 'low=mid+1 | hi=mid-1', level: 'good' },
            cplx: { val: 'O(log n)', level: 'good' }
          },
          scene: {
            entities: {
              lo: D.block(-11, 2.2, { color: 'gray', label: ['Đoạn trái (loại)'], sub: 'Nhỏ hơn x' }),
              mid: D.block(0, 2.2, { color: 'amber', glyph: 'search', halo: 'amber', label: ['a[mid] < x'], sub: 'low = mid + 1', tags: [{ text: 'Loại hẳn mid!', tone: 'green' }] }),
              hi: D.block(11, 2.2, { color: 'green', label: ['[mid+1 .. high]'], sub: 'Vùng tìm kiếm mới' }),
              fr: D.frame(0, -4.5, 'Thu hẹp đoạn tìm x = 41 trên mảng đã sắp xếp', [
                { label: '7', sub: 'loại', tone: 'gray' },
                { label: '12', sub: 'loại', tone: 'gray' },
                { label: '25', sub: 'mid (<41)', tone: 'amber' },
                { label: '41', sub: 'low = mid+1 ✓', tone: 'green', active: true },
                { label: '58', sub: 'high', tone: 'green' }
              ], {
                icon: 'search',
                pointers: [
                  { idx: 2, label: 'bỏ mid', tone: 'amber' },
                  { idx: 3, label: 'low mới', tone: 'green' },
                  { idx: 4, label: 'high', tone: 'blue' }
                ]
              })
            },
            links: {
              m_h: D.link('mid', 'hi', { label: 'Thu hẹp còn nửa', tone: 'green' }),
              m_l: D.link('mid', 'lo', { label: 'Bỏ hoàn toàn', style: 'dashed', tone: 'gray' })
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
            mid: { val: 'low + (hi-low)/2', level: 'good' },
            cplx: { val: 'O(log n) chuẩn mực', level: 'good' }
          },
          scene: {
            entities: {
              bug: D.block(-9.5, 2.2, { color: 'red', heat: 0.55, glyph: 'alert', label: ['(low + high) / 2'], sub: 'Tràn INT_MAX → âm!' }),
              fix: D.block(9.5, 2.2, { color: 'green', glyph: 'check', halo: 'green', label: ['low + (high-low)/2'], sub: 'Không bao giờ tràn', tags: [{ text: 'Chuẩn thực chiến', tone: 'green' }] }),
              pn: D.panel(0, -4.6, 'Ví dụ số học với INT_MAX = 2 147 483 647 (Bloch 2006)', [
                '! low = 1,5 tỷ, high = 2,0 tỷ → low + high = 3,5 tỷ > INT_MAX (tràn âm!)',
                '+ high - low = 500 triệu → low + 250 triệu = 1,75 tỷ (luôn hợp lệ)'
              ], { icon: 'shield' })
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
            grid: { val: 'cur[8][8]→next', level: 'good' },
            str: { val: 'Trải phẳng theo hàng', level: '' },
            safe: { val: 'Kiểm biên 0..7', level: 'good' },
            rec: { val: 'Mô phỏng trạng thái', level: 'good' }
          },
          scene: {
            entities: {
              cur: D.block(-10.5, 2.2, { color: 'blue', glyph: 'layers', label: ['Bảng cur[8][8]'], sub: 'Đếm 8 ô láng giềng' }),
              rule: D.rack(0, 2.2, 'Luật Conway', { color: 'teal', glyph: 'cpu', sub: 'Sống 2–3 · Sinh 3' }),
              nxt: D.block(10.5, 2.2, { color: 'green', glyph: 'layers', halo: 'green', label: ['Bảng next[8][8]'], sub: 'Không ghi đè cur!', tags: [{ text: 'Đổi bảng sau 1 lượt', tone: 'green' }] }),
              fr: D.frame(0, -4.6, 'Bố trí Row-Major của mảng hai chiều a[R][C] trong RAM tuyến tính', [
                { label: 'Hàng 0', sub: 'a[0][0..C-1]', tone: 'blue' },
                { label: 'Hàng 1', sub: 'a[1][0..C-1]', tone: 'teal' },
                { label: '...', sub: 'Liên tiếp nhau', tone: 'paper' },
                { label: 'Địa chỉ a[r][c]', sub: 'base + (r*C + c)*4B', tone: 'green', active: true }
              ], { icon: 'memory' })
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
            str: { val: "Byte '\\0' (0x00)", level: 'good' },
            safe: { val: 'Cấp đủ N + 1 byte', level: 'good' },
            rec: { val: 'Caesar / Chuẩn hóa', level: 'good' }
          },
          scene: {
            entities: {
              c1: D.block(-11, 2.2, { color: 'blue', label: ["'P' 'T' 'I' 'T'"], sub: 'Chỉ số 0..3 (4B)' }),
              z: D.block(0, 2.2, { color: 'amber', glyph: 'check', halo: 'amber', label: ["'\\0' (0x00)"], sub: 'Chỉ số 4 · Dấu dừng!', tags: [{ text: 'Bắt buộc có!', tone: 'amber' }] }),
              fn: D.rack(11, 2.2, 'strlen() / printf()', { color: 'green', sub: 'Dừng tại ô 4 → 4' }),
              fr: D.frame(0, -4.5, 'Mảng char s[5] = "PTIT" trong RAM (cần N + 1 = 5 ô)', [
                { label: "'P'", sub: 's[0]=80', tone: 'blue' },
                { label: "'T'", sub: 's[1]=84', tone: 'blue' },
                { label: "'I'", sub: 's[2]=73', tone: 'blue' },
                { label: "'T'", sub: 's[3]=84', tone: 'blue' },
                { label: "'\\0'", sub: 's[4]=0x00', tone: 'amber', active: true }
              ], { icon: 'binary', pointers: [{ idx: 4, label: 'strlen dừng ở đây!', tone: 'amber' }] })
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
            safe: { val: 'fgets(buf, 16, stdin)', level: 'good' },
            rec: { val: 'Chặn tràn bộ đệm', level: 'good' }
          },
          scene: {
            entities: {
              inp: D.dev(-11.5, 2.2, 'Đầu vào 200 ký tự'),
              bad: D.block(0, 5.2, { color: 'red', glyph: 'alert', heat: 0.7, label: ['gets(buf) — CẤM'], sub: 'Tràn đè Call Stack!' }),
              ok: D.firewall(0, -0.8, 'fgets(buf, 16)', { color: 'green', glyph: 'shield', halo: 'green', sub: 'Khóa biên 15 + \\0' }),
              mem: D.rack(11.5, 2.2, 'buf[16] nguyên vẹn', { color: 'green', glyph: 'memory', sub: 'Không đè biến cạnh' }),
              pn: D.panel(0, -5.2, 'Phòng thủ tràn bộ đệm (Buffer Overflow — Sâu Morris 1988)', [
                '! gets(buf): không biết mảng dài 16B → ghi tràn 184 byte sang Stack',
                '+ fgets(buf, sizeof(buf), stdin): đọc tối đa 15 ký tự + tự gắn \'\\0\''
              ], { icon: 'shield' })
            },
            links: {
              i_b: D.link('inp', 'bad', { label: 'Tràn 184 byte', tone: 'red', style: 'cut', fail: 0.85 }),
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
            str: { val: 'char name[26]', level: 'good' },
            safe: { val: 'p.on_hand / p->...', level: 'good' },
            rec: { val: 'Thêm · Tìm · Sửa · In', level: 'good' }
          },
          scene: {
            entities: {
              ui: D.dev(-11, 2.2, 'Menu Kho hàng CLI', { halo: 'blue', tags: [{ text: 'i: thêm · s: tìm · u: sửa', tone: 'blue' }] }),
              st: D.block(0, 2.2, { color: 'violet', glyph: 'code', label: ['typedef struct Part'], sub: 'number · name · on_hand' }),
              arr: D.db(11, 2.2, 'Part inventory[100]', { color: 'green', sub: 'Mảng bản ghi đồng bộ', tags: [{ text: 'Gán p2 = p1 nguyên khối', tone: 'green' }] }),
              fr: D.frame(0, -4.6, 'Bố trí bộ nhớ của 1 bản ghi struct Part (King §16.3)', [
                { label: 'int number', sub: '4 byte · Mã phụ tùng', tone: 'blue' },
                { label: 'char name[26]', sub: '26 byte (+2B đệm)', tone: 'violet', active: true },
                { label: 'int on_hand', sub: '4 byte · Tồn kho', tone: 'green' }
              ], { icon: 'memory' })
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
