const express=require('express'); //to include express that we installed by "npm install express --save"
const app =express();

// app.get('/',(req,res)=>{
//   res.send("HELLO WEB 2.0")     // By this we can able tp see on the chrome brower,ie on server
// });

app.post('/',(req,res)=>{
  var email=req.body.email;
  var amount =req.body.amount;

  res.send({"amount" : amount,"email" : email });
});



app.listen(3000,()=>{
  console.log('server is running on port 3000')
});
