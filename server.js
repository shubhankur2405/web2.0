const express=require('express'); //to include express that we installed by "npm install express --save"
const app =express();
const bodyParser=require('body-parser');

/*handling all the parsing*/
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//   res.send("HELLO WEB 2.0")     // By this we can able tp see on the chrome browser,ie on server
// });

app.post('/',(req,res)=>{    //We are posting email and amount
  var email=req.body.email;   //And we are catching them
  var amount =req.body.amount;

  res.send({'amount' : amount,'email' : email });  //and then taking the email and amount and sending it back to user
 //later on it will be visible on the browser.
});



app.listen(3000,()=>{
  console.log('server is running on port 3000')
});
