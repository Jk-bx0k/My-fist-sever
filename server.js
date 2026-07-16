const http = require('http');

const port = process.env.PORT || 3000;


const server = http.createServer((req, res) => {


res.statusCode = 200;

res.setHeader(
'Content-Type',
'text/html; charset=utf-8'
);



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


linear-gradient(
rgba(0,0,0,0.75),
rgba(100,0,0,0.75)
),



url("https://images.unsplash.com/photo-1518770660439-4636190af475");



background-size:cover;


background-position:center;



color:white;


overflow:hidden;


}



/* กล่องหลัก */

.container{


width:90%;


max-width:700px;


padding:40px;


text-align:center;



background:

rgba(10,10,10,0.85);



border:

2px solid red;



border-radius:20px;



box-shadow:

0 0 30px red;



transition:.2s;



}




h1{


font-size:40px;


color:#ff0033;


text-shadow:

0 0 10px red,
0 0 30px red;


margin-bottom:20px;


}



p{

font-size:18px;

color:#ddd;

}



.card{


margin-top:30px;


padding:25px;


background:#111;


border-left:

5px solid red;



border-radius:15px;


}



.status{


display:inline-block;


margin-top:20px;


padding:12px 30px;



background:red;


border-radius:30px;


box-shadow:

0 0 25px red;



font-weight:bold;


animation:pulse 1.5s infinite;


}




@keyframes pulse{


50%{

box-shadow:

0 0 50px red;

}


}




.footer{


margin-top:30px;


color:#aaa;


font-size:14px;


}



</style>


</head>



<body>



<div class="container">



<h1>

🔥 MY FIRST SERVER 🔥

</h1>



<p>

Web Server ของ

<br>


<b style="color:red">

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


เครื่องแม่ข่ายทำงานปกติ


</div>



</div>





<script>


// แสงตามเมาส์

var glow=document.createElement("div");


glow.style.position="fixed";

glow.style.width="250px";

glow.style.height="250px";

glow.style.borderRadius="50%";

glow.style.pointerEvents="none";


glow.style.background=

"radial-gradient(circle,rgba(255,0,0,.4),transparent 70%)";


glow.style.transform=

"translate(-50%,-50%)";


document.body.appendChild(glow);




document.addEventListener("mousemove",function(e){



glow.style.left=e.clientX+"px";


glow.style.top=e.clientY+"px";



var x=(window.innerWidth/2-e.clientX)/40;


var y=(window.innerHeight/2-e.clientY)/40;



document.querySelector(".container").style.transform=

"rotateY("+x+"deg) rotateX("+y+"deg)";


});





document.addEventListener("mouseleave",function(){


document.querySelector(".container").style.transform=

"rotateY(0deg) rotateX(0deg)";


});



</script>



</body>

</html>


`);


});



server.listen(port,()=>{


console.log(
"Server is running on port "+port
);


});
