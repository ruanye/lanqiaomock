// 用户模块路由配置
const express = require('express');
const user = express.Router()


const userContorl = require('../control/user');
user.get('/',(req,res)=>{
  res.json('用户模块')
})
user.post('/register', userContorl.register);
// 用户登录
user.post('/signin', userContorl.signin);
// 持久化登录验证
user.post('/validate', userContorl.validate);
// 获取用户信息
user.get('/userinfo', userContorl.getuserinfo);
user.get("/creatuser", userContorl.creatUser);
// 修改密码
user.post('/resetpassword', userContorl.resetpassword);
module.exports = user;
