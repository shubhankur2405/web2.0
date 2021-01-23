// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const {save_user_information, get_list_of_participants, delete_users} = require('./models/server_db');
// const path = require('path');
// const publicPath = path.join(__dirname, './public');
// const paypal = require('paypal-rest-sdk');
// const session = require('express-session');
//
// app.use(session(
//   {secret: 'my web app',
//   cookie :{maxAge: 60000}
//   }
// ));
//
//
// /* handling all the parsing */
// app.use(bodyParser.json());
// app.use(express.static(publicPath));
//
// /* paypal configuration */
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'AU2x9uy5inLhXNjv33NCRI0nxyKUZjerrnDPsv0qhQ1jDz-EX0xUTnBjJEpWIk6Ar7gLEAXnKIiqIZOL',
//   'client_secret': 'EGuzKALUhQp0gCowB1JxIG9E6TIYRD_vwtfA28Rvep-avWTtK_kR0mfhEJoKMkojHhpmd2Q83EWi6dS7'
// });
// app.post('/post_info', async (req,res)=>{
//   var email = req.body.email;
//   var amount = req.body.amount;
//
//   if(amount <= 1){
//     return_info = {};
//     return_info.error = true;
//     return_info.message = "The amount should be greater than 1";
//     return res.send(return_info);
//   }
//   var fee_amount = amount * 0.9;
//   var result = await save_user_information({"amount" : fee_amount, "email" : email});
//   req.session.paypal_amount = amount;
//   var create_payment_json = {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://localhost:3000/success",
//         "cancel_url": "http://localhost:3000/cancel"
//     },
//     "transactions": [{
//         "item_list": {
//             "items": [{
//                 "name": "Lottery",
//                 "sku": "Funding",
//                 "price": amount,
//                 "currency": "USD",
//                 "quantity": 1
//             }]
//         },
//         "amount": {
//             "currency": "USD",
//             "total": amount
//         },
//         'payee' : {
//           'email' : 'lottery_manager@lotteryapp.com'
//         },
//         "description": "Lottery purchase"
//     }]
// };
//
//
// paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//         throw error;
//     } else {
//         console.log("Create Payment Response");
//         console.log(payment);
//         for(var i = 0; i< payment.links.length; i++){
//           if(payment.links[i].rel =='approval_url'){
//             return res.send(payment.links[i].href);
//           }
//         }
//     }
//   });
// });
//
// app.get('/success', async (req,res)=>{
//   const payerId = req.query.PayerID;
//   const paymentId = req.query.paymentId;
//   var execute_payment_json = {
//     "payer_id": payerId,
//     "transactions": [{
//         "amount": {
//             "currency": "USD",
//             "total": req.session.paypal_amount
//         }
//     }]
//   };
//
//   paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//       if (error) {
//           console.log(error.response);
//           throw error;
//       } else {
//           console.log(payment);
//
//       }
//   });
  // /* delete all mysql users */
  // if(req.session.winner_picked){
  //   var deleted = await delete_users();
  // }
  // req.session.winner_picked = false;
  // res.redirect('http://localhost:3000');
// });
//
// app.get('/get_total_amount', async (req,res)=>{
//   var result = await get_total_amount();
//   res.send(result);
// });
//
// app.get('/pick_winner', async (req,res)=>{
//   var result = await get_total_amount();
//   var total_amount = result[0].total_amount;
//   req.session.paypal_amount = total_amount;
//
//   /* Placeholder for picking the winner ,
//   1) We need to write a query to get a list of all the participants
//   2) we need to pick a winner */
//   var list_of_participants = await get_list_of_participants();
//   list_of_participants = JSON.parse(JSON.stringify(list_of_participants));
//   var email_array = [];
//   list_of_participants.forEach(function(element){
//     email_array.push(element.email);
//   });
//   var winner_email = email_array[Math.floor(Math.random()* email_array.length)];
//   req.session.winner_picked = true;
//
//
//   /* Create paypal payment */
//   var create_payment_json = {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://localhost:3000/success",
//         "cancel_url": "http://localhost:3000/cancel"
//     },
//     "transactions": [{
//         "item_list": {
//             "items": [{
//                 "name": "Lottery",
//                 "sku": "Funding",
//                 "price": req.session.paypal_amount,
//                 "currency": "INR",
//                 "quantity": 1
//             }]
//         },
//         "amount": {
//             "currency": "USD",
//             "total": req.session.paypal_amount
//         },
//         'payee' : {
//           'email' : winner_email
//         },
//         "description": "Paying the winner of the lottery application"
//     }]
//   };
//
//   paypal.payment.create(create_payment_json, function (error, payment) {
//       if (error) {
//           throw error;
//       } else {
//           console.log("Create Payment Response");
//           console.log(payment);
//           for(var i = 0; i< payment.links.length; i++){
//             if(payment.links[i].rel =='approval_url'){
//               return res.redirect(payment.links[i].href);
//             }
//           }
//       }
//     });
//
// });
//
//
//
//
//
//
//
//
//
//
//
// app.listen(3000,()=>{
//   console.log('server is running on port 3000');
// });


























/*TRIAL RUN */
const express=require('express'); //to include express that we installed by "npm install express --save"
const app =express();
const bodyParser=require('body-parser');
const {save_user_information,get_list_of_participants,
delete_users} =require('./models/server_db');
const path = require('path');
const publicPath = path.join(__dirname, './public');
const paypal = require('paypal-rest-sdk');
const session = require('express-session');



app.use(session(
  {secret: 'my web app',
  cookie :{maxAge: 60000}
  }
));
/*handling all the parsing*/
app.use(bodyParser.json());
app.use(express.static(publicPath));

/* paypal configuration */
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AU2x9uy5inLhXNjv33NCRI0nxyKUZjerrnDPsv0qhQ1jDz-EX0xUTnBjJEpWIk6Ar7gLEAXnKIiqIZOL',
  'client_secret': 'EGuzKALUhQp0gCowB1JxIG9E6TIYRD_vwtfA28Rvep-avWTtK_kR0mfhEJoKMkojHhpmd2Q83EWi6dS7'
});


// app.get('/',(req,res)=>{
//   res.send("HELLO WEB 2.0")     // By this we can able to see on the chrome browser,ie on server
// });

app.post('/post_info', async (req,res)=>{    //We are posting email and amount
  var email=req.body.email;   //And we are catching them
  var amount =req.body.amount;

  if(amount<=1){
    return_info={};
    return_info.error=true;
    return_info.message="The amount should be greater than 1";
    return res.send(return_info);
  }

  var fee_amount=amount*0.9
  var result=await save_user_information({"amount" :fee_amount,"email" : email});
  req.session.paypal_amount = amount;

  var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Lottery",
                  "sku": "Funding",
                  "price": amount,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": amount
          },
          'payee' :{
            'email' : 'lotteryman@gmail.com'
          },
          "description": "Lottery Purchase"
      }]
  };


  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
          for(var i = 0; i< payment.links.length; i++){
                      if(payment.links[i].rel =='approval_url'){
                       return res.send(payment.links[i].href);
                     }
        }
      }
  });

  // res.send(result);  //and then taking the email and amount and sending it back to user
  //later on it will be visible on the browser.
});


app.get('/success', async (req,res)=>{
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  var execute_payment_json={
    "payer_id" : payerId,
    "transactions" : [{
      "amount" :{
        "currency" : "USD",
        "total" :  req.session.paypal_amount
      }
    }]
  };
  paypal.payment.execute(paymentId,execute_payment_json,function(err,payment){
    if(err){
      console.log(error.response);
      throw error;
    }else{
      console.log(payment);
    }
  });
  /* delete all mysql users */
  if(req.session.winner_picked){
    var deleted = await delete_users();
  }
  req.session.winner_picked = false;
  res.redirect('http://localhost:3000');

});


app.get('/get_total_amount', async (req,res)=>{
  var result = await get_total_amount();
  res.send(result);

});

app.get('/pick_winner', async (req,res)=>{
  var result = await get_total_amount();
  var total_amount = result[0].total_amount;
  req.session.paypal_amount = total_amount;

  /* Placeholder for picking the winner ,
  1) We need to write a query to get a list of all the participants
  2) we need to pick a winner */
  var list_of_participants = await get_list_of_participants();
  list_of_participants = JSON.parse(JSON.stringify(list_of_participants));
  var email_array = [];
  list_of_participants.forEach(function(element){
    email_array.push(element.email);
  });
  var winner_email = email_array[Math.floor(Math.random()* email_array.length)];
  req.session.winner_picked = true;


  /* Create paypal payment */
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Lottery",
                "sku": "Funding",
                "price": req.session.paypal_amount,
                "currency": "INR",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": req.session.paypal_amount
        },
        'payee' : {
          'email' : winner_email
        },
        "description": "Paying the winner of the lottery application"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
          for(var i = 0; i< payment.links.length; i++){
            if(payment.links[i].rel =='approval_url'){
              return res.send(payment.links[i].href);
            }
          }
      }
    });

});

app.listen(3000,()=>{
  console.log('server is running on port 3000')
});

/*TRIAL RUN END*/
