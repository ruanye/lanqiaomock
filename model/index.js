let mongoose = require("mongoose");
let { dburl } = require("../config");
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)
let db = mongoose.createConnection(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  useFindAndModify: false
});
db.then(
  (data) => {
    console.log("连接成功");
  },
  (err) => {
    console.log("连接失败");
    console.log(err);
  }
);
let userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
//用户模块
const User = db.model("user", userSchema);

// 用户信息
let userInfo = new Schema({
  //用户简介
  info: {
    type: String,
    default: "这个家伙很懒什么也没留下",
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  avatar: String, //用户头像
});

const UserInfo = db.model("userinfo", userInfo);

// 项目模块
let projectSchema = new Schema({
  projectName: { type: String, required: true },
  projectBaseUrl: { type: String, required: true },
  projectDesc: { type: String, required: true },
  creatAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Project = db.model("project", projectSchema);

// 接口模块
let apiinfo = new Schema({
  apiName: String,
  apiUrl: {
    type: String,
    required: true,
  }, // 接口地址
  apiMehod: {
    type: String,
    enum: ["get", "post", "put", "delete"],
    required: true,
  }, // 接口地址
  apiDescribe: String, // 接口简介
  apiJson: {
    type: Schema.Types.Mixed,
    required: true,
  }, // JSON 数据
  creatAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const ApiInfo = db.model("ApiInfo", apiinfo);
module.exports = {
  User,
  UserInfo,
  ApiInfo,
  Project,
};
