const express=require('express'); //to include express that we installed by "npm install express --save"
const app =express();
const bodyParser=require('body-parser');
const {save_user_information} =require('./models/server_db');

/*handling all the parsing*/
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//   res.send("HELLO WEB 2.0")     // By this we can able tp see on the chrome browser,ie on server
// });

app.post('/', async (req,res)=>{    //We are posting email and amount
  var email=req.body.email;   //And we are catching them
  var amount =req.body.amount;

  if(amount<=1){
    return_info={};
    return_info.error=true;
    return_info.message="The amount should be greater than 1";
    return res.send(return_info);
  }


  var result=await save_user_information({"amount" :amount,"email" : email});


  res.send(result);  //and then taking the email and amount and sending it back to user
 //later on it will be visible on the browser.
});


app.get('/get_total_amount', async (req,res)=>{
  var result = await get_total_amount();
  res.send(result);

});


app.listen(3000,()=>{
  console.log('server is running on port 3000')
});
