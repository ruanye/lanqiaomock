module.exports = {
	upload: function (req, res) {
		console.log(req.file, req.body)
		res.json({
			path: req.file.filename,
		})
	}
}
