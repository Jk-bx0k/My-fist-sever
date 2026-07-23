const http = require('http');
// 1. เรียกใช้งาน Pool จากไลบรารี pg สำหรับจัดการการเชื่อมต่อฐานข้อมูล
const { Pool } = require('pg');
// 2. ตั้งค่าการเชื่อมต่อ โดยดึง URL มาจาก Environment Variable ของ Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const port = process.env.PORT || 3000;

// สไตล์ธีมแดง-ดำ ใส่เป็น CSS แยกไว้ให้อ่านง่าย
const styles = `
<style>
  * { box-sizing: border-box; }
  html, body {
    height: 100%;
  }
  body {
    position: relative;
    background: #000000;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(255,0,0,0.12) 0%, transparent 40%),
      radial-gradient(circle at 80% 0%, rgba(255,0,0,0.10) 0%, transparent 45%),
      radial-gradient(circle at 50% 100%, rgba(255,0,0,0.15) 0%, transparent 50%),
      linear-gradient(135deg, #1a0000, #000000, #200000);
    background-size: 200% 200%, 200% 200%, 200% 200%, 400% 400%;
    animation: bgShift 12s ease-in-out infinite;
    color: #f5f5f5;
    font-family: 'Segoe UI', 'Sarabun', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    min-height: 100vh;
    margin: 0;
    overflow-x: hidden;
  }
  #embers {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @keyframes bgShift {
    0%   { background-position: 0% 0%, 100% 0%, 50% 100%, 0% 50%; }
    50%  { background-position: 20% 30%, 80% 20%, 40% 80%, 100% 50%; }
    100% { background-position: 0% 0%, 100% 0%, 50% 100%, 0% 50%; }
  }
  h1 {
    color: #ff1a1a;
    text-shadow: 0 0 8px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.4);
    letter-spacing: 1px;
    margin-bottom: 30px;
    text-align: center;
    animation: glowPulse 2.5s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%, 100% { text-shadow: 0 0 8px rgba(255,0,0,0.7), 0 0 20px rgba(255,0,0,0.4); }
    50%      { text-shadow: 0 0 16px rgba(255,40,40,0.95), 0 0 40px rgba(255,0,0,0.7); }
  }
  table {
    border-collapse: collapse;
    background: rgba(17, 17, 17, 0.9);
    backdrop-filter: blur(2px);
    border: 1px solid #ff1a1a;
    box-shadow: 0 0 25px rgba(255, 0, 0, 0.35);
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    max-width: 700px;
    animation: fadeInUp 0.6s ease-out;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(15px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #330000;
  }
  th {
    background: linear-gradient(90deg, #4d0000, #1a0000);
    color: #ff4d4d;
    text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 1px;
  }
  tr td {
    transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }
  tr:hover td {
    background: #1f0000;
    color: #ff6666;
    transform: scale(1.01);
  }
  tr:last-child td {
    border-bottom: none;
  }
  .error-box {
    background: #1a0000;
    border: 1px solid #ff0000;
    color: #ff6666;
    padding: 20px 30px;
    border-radius: 8px;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 0 20px rgba(255,0,0,0.4);
    animation: fadeInUp 0.6s ease-out;
  }
</style>
`;

// สคริปต์เอฟเฟคประกายไฟลอยขึ้น วาดบน canvas พื้นหลัง
const emberScript = `
<canvas id="embers"></canvas>
<script>
  const canvas = document.getElementById('embers');
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const embers = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: h + Math.random() * h,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 0.6 + 0.2,
    drift: Math.random() * 0.6 - 0.3,
    alpha: Math.random() * 0.5 + 0.3
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    embers.forEach(e => {
      e.y -= e.speed;
      e.x += e.drift;
      if (e.y < -10) {
        e.y = h + 10;
        e.x = Math.random() * w;
      }
      const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
      grad.addColorStop(0, 'rgba(255,80,40,' + e.alpha + ')');
      grad.addColorStop(1, 'rgba(255,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
</script>
`;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  try {
    // 3. ขอเชื่อมต่อและส่งคำสั่ง SQL ไปดึงข้อมูลจากตาราง students
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM students');
    client.release(); // คืนการเชื่อมต่อเมื่อใช้งานเสร็จ

    // 4. นำข้อมูลที่ได้ (result.rows) มาประกอบเป็นตาราง HTML
    let html = `<!DOCTYPE html><html lang="th"><head><meta charset="UTF-8">${styles}</head><body>`;
    html += emberScript;
    html += `<div class="content">`;
    html += `<h1>ฐานข้อมูลนักศึกษา (ทดสอบการเชื่อมต่อ)</h1>`;
    html += `<table>`;
    html += `<tr><th>รหัสนักศึกษา</th><th>ชื่อ-นามสกุล</th></tr>`;

    // วนลูปนำข้อมูลแต่ละแถวมาแสดง
    result.rows.forEach(row => {
      html += `<tr><td>${row.student_id}</td><td>${row.student_name}</td></tr>`;
    });

    html += `</table></div></body></html>`;
    res.end(html);
  } catch (err) {
    // กรณีเชื่อมต่อไม่ได้หรือเขียนชื่อตารางผิด
    console.error(err);
    res.end(`<!DOCTYPE html><html lang="th"><head><meta charset="UTF-8">${styles}</head><body>
      ${emberScript}
      <div class="content">
        <div class="error-box">
          <h1>เกิดข้อผิดพลาด!</h1>
          <p>${err.message}</p>
        </div>
      </div>
    </body></html>`);
  }
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
