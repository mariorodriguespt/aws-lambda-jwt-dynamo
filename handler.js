'use strict';

const faker = require( 'faker' );
const AWS = require( 'aws-sdk' );
const JWT = require( 'jsonwebtoken' );
const dynamoose = require( 'dynamoose' );

const JWT_SECRET = "f46ab500ecf9de1df68d9475df3020fc7da0a61a";

AWS.config.update({
  region: "us-west-2",
  accessKeyId : "YOUR_ACCESS_KEY",
  secretAccessKey : "YOUR_SECRET_KEY"
});

//const dynamoClient = AWS.DynamoDB.DocumentClient();
const UserModel = dynamoose.model( 'Users' , {
  email : String,
  password : String
});

module.exports.createUser = (event, context, callback) => {
  //TODO salt password
  const { email , password } = event;

//TODO check if user already exists
  const user = new UserModel({
      email : email,
      password : password
  });

  let userId = user.save(( error )=>{
    let response;

      if( error ){
        console.log(error);
        response = {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
        };

      }
      else{
        response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        };      
      }

      callback(null, response);
  });

  
}; 

module.exports.login = (event, context, callback) => {
  //TODO salt password
  //Validate username/password combination
  UserModel.get({
    email : event.email,
    password : event.password
  }, ( error , user )=>{
    let response;

    if ( error ){
      response = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      };
    }
    else{
      //Generate JWT token
      const token = JWT.sign( event.token , JWT_SECRET , {
        expiresIn : 60 * 60 * 10 //10 hours
      });

      response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          token: token
        })
      };

  
    }  

    callback(null, response);
  });
}; 

module.exports.nextHolidayCountry = (event, context, callback) => {
  
  /*
    NOTE You need to config AWS Proxy to pass the HTTP Headers as parameters to your Lambda function
    This code is for educational purpose only.

    How to test this function:
    Terminal> SLS_DEBUG=* serverless invoke local --function nextHolidayCountry --data '{"token":"YOUR_TOKEN"}'



  */

  //Validate JWT token
  JWT.verify( event.token , JWT_SECRET , function(error , decoded){
    let response;

    if( error ){
      response = {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      };
    }
    else{
      response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify({
          message: faker.address.country()
        }),
      };

    }

    callback(null, response);
  });
}; 
