const express = require("express");
const router = express.Router();

router.post("/", (request, response) => {
  const { message }  = request.body
  let result = "";

  mobilePhones = [
    { 
      productUrl : 'https://www.bajajfinservmarkets.in/emi-store/lg-w10-32-gb-smoky-gray-3-gb-ram-smartphone.html',
      productName : 'LG W10 32 GB Storage Smoky Gray (3 GB RAM)',
      productPrice : 'Rs. 9999',
      productImage : 'https://www.91-img.com/pictures/134581-v5-lg-w10-mobile-phone-large-1.jpg?tr=q-60',
    },
    {
      productUrl : 'https://www.bajajfinservmarkets.in/emi-store/oppo-a15s-64-gb-fancy-white-4-gb-ram-smartphone.html',
      productName : 'Oppo A15s 64 GB Storage Fancy White (4 GB RAM)',
      productPrice : 'Rs. 12,490',
      productImage : 'https://images-na.ssl-images-amazon.com/images/I/71UnRvRqfxL._SX679_.jpg',
    },
  ];

  if(message == "I need best budget mobile phone") {
      result = mobilePhones[0];
  }
  else if(message == "I need a best budget phone") {
      result = mobilePhones[0];
  }
  else if(message == "I want latest smartphones") {
      result = mobilePhones[0];
  }
  else if(message == "I want a new mobile phone") {
      result = mobilePhones[1];
  }
  else if(message == "I want good mobile phone") {
      result = mobilePhones[1];
  }
  else if(message == "I want latest budget phone") {
      result = mobilePhones[0];
  }
  else if(message == "I want latest android phones") {
      result = mobilePhones[1];
  }
  else if(message == "Can you please suggest me best smartphone") {
      result = mobilePhones[0];
  }
  else if(message == "What is the best recommended phone") {
      result = mobilePhones[1];
  }
  else if(message == "Which phone should I buy") {
      result = mobilePhones[0];
  }
  else if(message == "I want phone under 15000") {
      result = mobilePhones[1];
  }
  else if(message == "I want to buy smartphones under 10000") {
      result = mobilePhones[0];
  }
  else if(message == "I need mobile phones under 10000") {
      result = mobilePhones[1];
  }
  else if(message == "") {
      result = mobilePhones[0];
  }
  else {
      result = "NULL";
  }

  response.status(200).json({ product : result });

});

module.exports = router;