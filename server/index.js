const userApi = require('./api/userApi');
const companyApi = require('./api/companyApi');
const login = require('./api/login')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 处理CORB
app.use(cors({
  'allowedHeaders': ['Content-Type', 'token'],
  'exposedHeaders': ['token'],
  'origin': '*',
  'methods': 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  'prefilghtContinue': false
}))
// 生成session
// const session = require('express-session');
// const FileStore = require('session-file-store')(session)
// app.use(session({
//   secret: 'sessionUser',
//   resave: false,
//   store: new FileStore(),
//   saveUninitialized: true,
//   cookie: {
//     user: 'default',
//     maxAge: 60*1000
//   }
// }))

// 处理跨域
app.use(function(req, res, next){
  // 允许链接的网站
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 允许的请求方式
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  // 允许的请求头
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, token');
  // 如果需要网站在发送到API的请求中包含cookie（例如，在使用会话的情况下），请设置为true。
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type','applicaition/json;charset=UTF-8')
  // 对登录用户执行session校验
  console.log('req----')
  console.log(req.headers)
  if (req.headers.token) {
    next();
  } else {
    // 判断请求是否为 登录，注册，登出，如果是不做token验证
    const arr = req.url.split('/')
    console.log(arr)
    if (['login', 'logout', 'register'].includes(arr[arr.length - 1])) {
      console.log('登录')
      next()
    } else {
      console.log('没有token')
      const data = {
        code: '401',
        message: '用户登录状态失效'
      }
      res.json(data)
    }
  }
})
app.use('/api/user', userApi);
app.use('/api/company', companyApi)
app.use('/api/login', login)

app.listen(3000);
console.log('success listen at port:3000');
// module.exports = app;

