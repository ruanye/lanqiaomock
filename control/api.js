// 学生信息管理
const { ApiInfo, Project } = require("../model");
let { defaultPageNum, defaultPageSize } = require("../config");
module.exports = {
  // 获取/查询接口列表
  getApiList: async (req, res) => {
    try {
      let {
        pageNum = defaultPageNum,
        pageSize = defaultPageSize,
        apiName = "",
        apiUrl = "",
        userId,
      } = req.query;
      pageNum = Number(pageNum);
      pageSize = Number(pageSize);
      let list = await ApiInfo.find({ userId: userId })
        .sort({ creatAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .exec();
      res.json({
        code: 200,
        desc: "查询接口列表成功",
        projectId: "62be577daa62280023ac8e4e",
        projectUrl: "/app",
        data: list,
      });
    } catch (e) {
      res.json({
        code: 400,
        desc: `查询失败,错误${e}`,
      });
    }
  },
  addApi: async (req, res) => {
    let list = req.body;
    try {
      await ApiInfo.insertMany(list);
      res.json({
        code: 200,
        desc: `添加成功`,
      });
    } catch (e) {
      res.json({
        code: 400,
        desc: `新增失败,错误${e}`,
      });
    }
  },
  //接口信息修改
  update: async (req, res) => {
    let { id } = req.body;
    try {
      let data = await ApiInfo.findOneAndUpdate({ _id: id }, { ...req.body });
      res.json({
        code: 200,
        desc: `修改成功`,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // 删除接口
  delete: async (req, res) => {
    try {
      await ApiInfo.findByIdAndRemove(req.params.id).exec();
      res.json({
        code: 200,
        desc: "删除成功",
      });
    } catch (e) {
      res.json({
        code: 400,
        desc: `删除失败,错误${e}`,
      });
    }
  },
};
