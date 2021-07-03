const express = require('express'); //express module 가져옴
const app = express() 
const port = 5000

const bodyParser = require('body-parser'); // express 최신 버전에서는 바디파서 기능 내장
const config = require('./config/key');

const{ User } = require("./models/User");

//application/x-www-form-urlencoded 타입 해석 가능
app.use(express.urlencoded({ extended: true }));

//application/json 타입 해석 가능
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { //git에 올라가면 내 정보가 다 올라감
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! jong hyeon')
})

//client에서 넘어온 method 처리
app.post('/register', (req, res) => {

  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // DB에 넣어줌
  /*{
    id: "hello",
    password:"123"
  } 형식으로 넘어옴*/

  console.log(req.body);

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})