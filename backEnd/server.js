var express = require( 'express' );
const bodyParser = require('body-parser');
var cors = require( 'cors' );
var app = express();

var databaseTemp = [];  // 서버가 돌아갈동안 살아있는 정보...

//app.use( cors() );
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// GET API #1 - 단순 테스트
app.get( '/basic', function( req, res) {

   // database에서 가저온 유저 정보:
   var dbData = 'james test user list count: 5'; 
   
   res.send( 'Hi, this is backend for simpleJS. 지금시간: ' + new Date().toDateString() + ', 다른정보: ' + dbData );
});


// GET API #2 - index.html 소환
app.get('/getIndex', function (req, res) {
   console.log( 'test' );
   console.log( __dirname );
   res.sendFile( __dirname + "/public/" + "index.html" );
});


// GET API #4 - 회원가입
app.post('/memberSignUp', function (req, res) {

   // check if this person is already in the list <-- (X)

   // req.body.---
   console.log( req.body );

   var newUser = req.body;
   
   //var newUser = {
   //   name: req.body.name,
   //   age: req.body.age
   //};

   databaseTemp.push( newUser );

   res.sendStatus(200);
});

// GET API #5 - 회원들 정보
app.get('/members', function (req, res) {

   res.end(JSON.stringify(databaseTemp));
});


// GET API #3 - 'myInfo' json get
app.get( '/myInfo', function( req, res) {

   var resJson = {};

   // DB에 가서, 이 유저 찾아서 정보 가저와서, 여기 resJson에 넣으면 좋음..

   if ( req.query.username === 'james' ) { 
      resJson.name = 'James';
      resJson.age = '33';
      resJson.city ='Busan';
   }
   else
   {
      resJson.name = 'Unknown';
      resJson.age = 'Unknown';
      resJson.city ='Unknown';
   }

   console.log(resJson);

   res.end(JSON.stringify(resJson));
});

var server = app.listen( 3331, function() {
   var host = server.address().address
   var port = server.address().port
   console.log("SimpeJS backend nodejs listening at http://%s:%s", host, port);
});