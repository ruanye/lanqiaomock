// 学生信息管理
const { ApiInfo, Project } = require('../model');
let { defaultPageNum, defaultPageSize } = require('../config');
module.exports = {
  // 获取/查询接口列表
  getApiList: async (req, res) => {
    try {
      let { pageNum = defaultPageNum, pageSize = defaultPageSize, apiName = '', apiUrl = '', projectId } = req.query;
      pageNum = Number(pageNum);
      pageSize = Number(pageSize);
      let size = await ApiInfo.find({ projectId: projectId }).count();
      let list = await ApiInfo.find({ apiName: { $regex: apiName }, apiUrl: { $regex: apiUrl }, projectId: projectId }).sort({ creatAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .exec()
      res.json({
        code: 200,
        desc: '查询成功',
        max: size,
        data: list,
      })
    } catch (e) {
      res.json({
        code: 400,
        desc: `查询失败,错误${e}`
      });
    }
  },
  addApi: async (req, res) => {
    let list = req.body;
    let searhResult = await ApiInfo.find({ projectId: list.projectId, apiUrl: list.apiUrl, apiMehod: list.apiMehod });
    let project = await Project.findById(list.projectId);
    let baseUrl = project.projectBaseUrl
    if (searhResult.length > 0) {
      res.json({
        code: 400,
        desc: `接口已存在`
      });
    } else {
      try {
        list.apiMockUrl = `/mock/${list.projectId}${baseUrl}${list.apiUrl}`;
        await ApiInfo.insertMany(list);
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
    }
  },
  //接口信息修改
  update: async (req, res) => {
    let { id } = req.body;
    try {
      let apiMockUrl;
      if (req.body.apiUrl) {
        let result = await ApiInfo.findOne({ _id: id });
        let projectId = result.projectId;
        let project = await Project.findById(projectId);
        let baseUrl = project.projectBaseUrl
        apiMockUrl = `/mock/${projectId}${baseUrl}${req.body.apiUrl}`;

      }
      let data = await ApiInfo.findOneAndUpdate({ _id: id }, req.body.apiUrl ? { ...req.body, apiMockUrl } : { ...req.body }, { new: true });
      res.json({
        code: 200,
        desc: `修改成功`,
        data
      });
    } catch (err) {
      console.log(err);
    }

  },
  // 删除接口
  delete: async (req, res) => {
    try {
      await ApiInfo.findByIdAndRemove(req.params.id).exec()
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
  }
};
