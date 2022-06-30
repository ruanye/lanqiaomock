// 学生查询路由
// 用户模块路由配置
const express = require('express');
const allapi = express.Router()

const allapiContorl = require('../control/allapi');
//获取学生列表
allapi.all('/:id/:baseurl/*', allapiContorl.getallApi);

module.exports = allapi;

