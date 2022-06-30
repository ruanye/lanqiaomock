// 接口路由
// 用户模块路由配置
const express = require('express');
const api = express.Router()

const apiContorl = require('../control/api');
// 获取接口列表

api.get('/list', apiContorl.getApiList);
// 添加接口
api.post('/add', apiContorl.addApi);
// 修改接口
api.put('/update', apiContorl.update);
// 删除接口
api.delete('/delete/:id', apiContorl.delete);

module.exports = api;

