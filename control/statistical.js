const { ApiInfo, Project, User } = require('../model');


module.exports = {
	getStatistical: async (req, res) => {
		let apiCount = await ApiInfo.find().estimatedDocumentCount()
		let projectCount = await Project.find().estimatedDocumentCount()
		let userCount = await User.find().estimatedDocumentCount()
		res.json({
			code: 200,
			desc: '查询成功',
			data: {
				apiCount,
				projectCount,
				userCount
			}
		})
	}
}