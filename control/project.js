let { defaultPageNum, defaultPageSize } = require('../config');
const { Project } = require('../model');
module.exports = {
	// 查询项目列表
	getList: async (req, res) => {
		console.log('查询项目列表')
		try {
			let { pageNum = defaultPageNum, pageSize = defaultPageSize, userId } = req.query;
			pageNum = Number(pageNum);
			pageSize = Number(pageSize);
			let list = await Project.find({ userId: userId }).sort({ creatAt: -1 })
				.skip((pageNum - 1) * pageSize)
				.limit(pageSize)
				.exec()
			let size = await Project.find({ userId: userId }).count()
			res.json({
				code: 200,
				max: size,
				desc: '查询成功',
				data: list,
			})
		} catch (e) {
			res.json({
				code: 400,
				desc: `查询失败,错误${e}`
			});
		}
	},
	// 新增项目
	addProject: async (req, res) => {
		try {
			let list = req.body;
			await Project.insertMany(list);
			res.json({
				code: 200,
				desc: `添加成功`
			});
		} catch (e) {
			res.json({
				code: 400,
				desc: `新增失败,错误${e}`
			});
		}

	},
	// 删除项目
	delete: async (req, res) => {
		try {
			await Project.findByIdAndRemove(req.params.id).exec()
			res.json({
				code: 200,
				desc: '删除成功'
			});
		} catch (e) {
			res.json({
				code: 400,
				desc: `删除失败,错误${e}`
			});
		}
	},
	// 修改项目信息
	update: async (req, res) => {
		let { projectId } = req.body;
		try {
			let data = await Project.findOneAndUpdate({ _id: projectId }, req.body, { new: true });
			res.json({
				code: 200,
				desc: `修改成功`,
				data
			});
		} catch (err) {
			console.log(err);
		}

	},

}