# Serverless DynamoDB with JWT

This is repo for educational purposes only. 
You shouldn't use this code for production enviroments.

Don't user for user JWT for sessions.

### How to run this application

1. npm install
2. use serverless commands

### Test locally

Create an AWS account and create a user with permissions for Lambda and DynamoDB

#### Create a User
    SLS_DEBUG=* serverless invoke local --function createUser --data '{"email":"mario@rodrigues.com", "password":"portugal"}'

#### Login
    SLS_DEBUG=* serverless invoke local --function login --data '{"email":"mario@rodrigues.com", "password":"portugal"}'

#### The next country you should visit
    serverless invoke local --function nextHolidayCountry --data '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjo0MzQsImlhdCI6MTQ5NjIxMDcyMSwiZXhwIjoxNDk2MjQ2NzIxfQ.tpTNs_cStUEqA-hOhk4r7FW3MEQ39OYpCndiFDYKrm8"}'
