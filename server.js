// เรียกใช้ Module http ของ Node.js
const http = require('http');

// กำหนด Port
const port = process.env.PORT || 3000;

// สร้าง Server
const server = http.createServer((req, res) => {

    res.statusCode = 200;

    // รองรับ HTML และภาษาไทย
    res.setHeader('Content-Type', 'text/html; charset=utf-8');


    // หน้าเว็บไซต์
    res.end(`
<!DOCTYPE html>
<html lang="th">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>My First Server</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',sans-serif;
}


body{

    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;

    background:
    radial-gradient(circle at top,#8b0000,transparent 40%),
    linear-gradient(135deg,#050505,#1a0000);

    color:white;
}


/* กล่องหลัก */

.container{

    width:90%;
    max-width:700px;

    background:rgba(20,20,20,0.85);

    border:1px solid #ff0033;

    border-radius:20px;

    padding:40px;

    text-align:center;

    box-shadow:
    0 0 20px #ff0033,
    inset 0 0 20px rgba(255,0,50,.2);


    animation:show 1s ease;

}



@keyframes show{

from{
    opacity:0;
    transform:translateY(50px);
}

to{
    opacity:1;
    transform:translateY(0);
}

}



/* หัวข้อ */

h1{

    font-size:35px;

    color:#ff1744;

    text-shadow:
    0 0 10px red,
    0 0 20px red;

    margin-bottom:20px;

}



p{

    font-size:18px;

    color:#ddd;

}



/* Card */

.card{

    margin-top:30px;

    padding:20px;

    border-radius:15px;

    background:#111;

    border-left:5px solid red;

}



.status{

    margin-top:20px;

    display:inline-block;

    padding:10px 25px;

    border-radius:30px;

    background:#b00020;

    box-shadow:0 0 15px red;

    font-weight:bold;

}



.footer{

    margin-top:30px;

    font-size:14px;

    color:#888;

}


</style>


</head>


<body>


<div class="container">


<h1>
🔥 MY FIRST SERVER 🔥
</h1>


<p>
โย่วสวัสดีครับ! นี่คือ Web Server ของ
<br>

<b style="color:#ff0033;">
นายจตุรภุช กลับส่ง
</b>

</p>


<div class="card">


<h2>
🚀 Railway Cloud Server
</h2>


<p>
รหัสนักศึกษา : 69319010191
</p>


<div class="status">

SERVER ONLINE ✓

</div>


</div>


<div class="footer">

Node.js + Railway Deployment

<br>

ระบบทำงานปกติ พร้อมให้บริการ

</div>


</div>


</body>

</html>

`);

});


// เปิด Server

server.listen(port, () => {

console.log(
`Server is running! เครื่องแม่ข่ายเปิดทำงานแล้วที่ช่องทาง: ${port}`
);

});
