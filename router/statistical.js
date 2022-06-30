// 项目模块路由
const express = require('express');
const statistical = express.Router()
const statisticalControl = require('../control/statistical');


statistical.get('/', statisticalControl.getStatistical)

module.exports = statistical;