// 项目模块路由
const express = require('express');
const project = express.Router()
const projectControl = require('../control/project');
// 获取项目列表

project.get('/list', projectControl.getList);

project.post('/add', projectControl.addProject);

project.put('/update', projectControl.update);

project.delete('/delete/:id', projectControl.delete);

module.exports = project;