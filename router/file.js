const Router = require('koa-router');

const file = new Router({
  prefix: '/file'
});
const fileContorl = require('../control/file');
const { uploadfile } = require('../util/uploadfile');
//路由
file.post('/upload', uploadfile, fileContorl.upload);

module.exports = file;
