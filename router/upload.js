
// 用户模块路由配置
const express = require('express');
const multer = require('multer')
let path = require('path')
const uploadRouter = express.Router()
const uploadControl = require('../control/upload');


const storage = multer.diskStorage({
	destination: './uploads',
	filename(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({ storage: storage })

uploadRouter.post('/', upload.single('uploaded_file'), uploadControl.upload);

module.exports = uploadRouter;