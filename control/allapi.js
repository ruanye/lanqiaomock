// 学生信息管理
const { ApiInfo } = require('../model');
module.exports = {
  // 查询范围的接口
  getallApi: async (req, res) => {
    let url = `/${req.params[0]}`;
    let projectId = req.params.id;
    let method = req.method.toLowerCase();
    let result = await ApiInfo.findOne({ projectId: projectId, apiUrl: url, apiMehod: method, })

    if (result && result.apiJson) {
      let apiJSON
      try {
        apiJSON = JSON.parse(result.apiJson);
      } catch (err) {
        res.json({
          code: 400,
          desc: `接口的json格式错误`,
        })
      }
      res.json({
        code: 200,
        desc: '请求成功',
        data: apiJSON
      })
    } else {
      res.json({
        code: 400,
        desc: '请求失败,未查询到接口数据',
        data: `${result}`
      })
    }
  },
};
