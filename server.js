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
  body {
    background: radial-gradient(circle at top, #1a0000 0%, #0a0000 60%, #000000 100%);
    color: #f5f5f5;
    font-family: 'Segoe UI', 'Sarabun', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    min-height: 100vh;
    margin: 0;
  }
  h1 {
    color: #ff1a1a;
    text-shadow: 0 0 8px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.4);
    letter-spacing: 1px;
    margin-bottom: 30px;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    background: #111111;
    border: 1px solid #ff1a1a;
    box-shadow: 0 0 25px rgba(255, 0, 0, 0.35);
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    max-width: 700px;
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
  tr:hover td {
    background: #1f0000;
    color: #ff6666;
    transition: 0.2s ease-in-out;
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
  }
</style>
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
    html += `<h1>ฐานข้อมูลนักศึกษา (ทดสอบการเชื่อมต่อ)</h1>`;
    html += `<table>`;
    html += `<tr><th>รหัสนักศึกษา</th><th>ชื่อ-นามสกุล</th></tr>`;

    // วนลูปนำข้อมูลแต่ละแถวมาแสดง
    result.rows.forEach(row => {
      html += `<tr><td>${row.student_id}</td><td>${row.student_name}</td></tr>`;
    });

    html += `</table></body></html>`;
    res.end(html);
  } catch (err) {
    // กรณีเชื่อมต่อไม่ได้หรือเขียนชื่อตารางผิด
    console.error(err);
    res.end(`<!DOCTYPE html><html lang="th"><head><meta charset="UTF-8">${styles}</head><body>
      <div class="error-box">
        <h1>เกิดข้อผิดพลาด!</h1>
        <p>${err.message}</p>
      </div>
    </body></html>`);
  }
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
