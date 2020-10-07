const AWS = require('aws-sdk');
//const AWSXRay = require('aws-xray-sdk-core');

exports.handler = function(event, context, callback) {

fibo(40);
console.log(event);
const response = {
    statusCode: 200,
    headers: {
        "x-custom-header": "My Header Value",
    },
    body: JSON.stringify({message: "Hello World!"
    }),
};
callback(null, response);
};

function fibo(n) { 
    if (n < 2)
        return 1;
    else   return fibo(n - 2) + fibo(n - 1);
}









