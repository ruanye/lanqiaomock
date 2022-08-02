// 用户模块请求
const { User, UserInfo } = require('../model');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    // 用户注册
    register: async (req, res) => {
        let userinfo = req.body;
        try {
            let user = await User.findOne({ username: userinfo.username });
            if (user) {
                res.json({
                    code: 400,
                    desc: `注册失败，用户名已存在`
                });
            } else {
                user = await User.create(userinfo);
                res.json({
                    code: 200,
                    desc: `注册成功，用户名是${user.username}`
                });
            }
        } catch (err) {
            res.json({
                code: 400,
                desc: `注册失败，原因是${err}`
            });
        }

    },
    creatUser: async (req, res) => {
        let username = uuidv4();
        const user = await User.create({ username: username, password: 123456 });
        res.json({
            code: 200,
            desc: `用户 ID 创建成功`,
            userId: user._id,
        })
    },
    // 持久化登录验证
    validate: (ctx, next) => {
        let token = ctx.request.headers.authorization;
        console.log(token);
        jwt.verify(token, 'abcd', function (err, decode) {
            if (err) {
                res.json({
                    code: 400,
                    desc: '用户未登录'
                });
            } else {
                //证明用户已经登录 只要用户有操作就要延长过期时间
                res.json({
                    code: 200,
                    desc: '用户已登录',
                    userid: decode.user._id,
                    token: jwt.sign({ user: decode.user }, 'abcd', {
                        expiresIn: '1h'
                    })
                });

            }
        });
    },

  // 用户登录
  signin: async (req, res) => {
    try {
      let { username, password } = req.body;
      if (username) {
        let one = await User.findOne({ username: username });
        if (one && one.password == password) {
          res.json({
            code: 200,
            desc: "请求成功",
            data: {
              userId: one._id,
              username,
            },
          });
        } else {
          res.json({
            code: 400,
            desc: `登录失败，用户名或者密码错误`,
          });
        }
      } else {
        res.json({
          code: 400,
          desc: `登录失败，用户名或者密码不存在`,
        });
      }
    } catch (err) {
      res.json({
        code: 400,
        desc: `登录失败，原因是${err}`,
      });
    }
  },
  // 获取用户信息
  getuserinfo: async (req, res) => {
    let { userid } = req.query;
    try {
      let userinfo = await UserInfo.find({ userid });
      res.json({
        code: 200,
        desc: `请求成功`,
        userinfo,
      });
    } catch (e) {
      res.json({
        code: 400,
        desc: `错误是${err}`,
      });
    }
  },
  // 修改密码
  resetpassword: async (req, res) => {
    let { oldPassword, newPassword, userid } = req.body;
    try {
      let { password: oldpassword } = await User.findById(userid);
      console.log(oldpassword);
      //  旧密码输入不正确
      if (oldPassword !== oldpassword) {
        res.json({
          code: 201,
          desc: "旧密码输入错误",
        });
        return;
      } else {
        //旧密码输入正确
        await User.updateOne(
          { _id: userid },
          { $set: { password: newPassword } }
        );
        res.json({
          code: 200,
          desc: "密码修改成功",
        });
        return;
      }
    } catch (e) {
      res.json({
        code: 400,
        desc: `错误是${e}`,
      });
    }
  },
};
