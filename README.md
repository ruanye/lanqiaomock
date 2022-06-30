# 蓝桥 mock 接口文档

## 用户模块

服务器地址：http://43.138.50.102:80 
当服务器为 80 端口时 可以省略端口号 

1.  用户注册
    接口地址 : `/user/register`
    请求方式：`post`
    参数:

| 参数名   | 类型   | 是否必须 | 说明     |
| -------- | ------ | -------- | -------- |
| username | String | 是       | 用户名   |
| password | String | 是       | 用户密码 |

---

返回值：

| 值   | 类型   | 说明               |
| ---- | ------ | ------------------ |
| code | int    | 200 成功，400 失败 |
| desc  | string | 请求成功/失败原因  |

请求示例

```js
axios.post('/user/register', {
  username: 'lili',
  password: '123456'
});
```
------
2.  用户登录

    接口地址 : `/user/signin`
    请求方式：`post`
    参数:

    | 参数名   | 类型   | 是否必须 | 说明     |
    | -------- | ------ | -------- | -------- |
    | username | String | 是       | 用户名   |
    | password | String | 是       | 用户密码 |

    ***

    返回值：

    | 值     | 类型   | 说明                 |
    | ------ | ------ | -------------------- |
    | code   | int    | 200 成功，400 失败   |
    | desc    | string | 提示信息             |
    | token  | string | 进行登录验证的 token |
     |data| object | 用户信息对象 其中 `userid`是用户 ID，username是用户名  |

请求示例

```js
axios.post('/user/signin', {
  username: 'lili',
  password: '123456'
});
```
------
3.  持久化登录验证的接口
    接口地址 : `/validate`
    请求方式：`post`
    参数:
    无
    请求头携带信息：
    token：此 `token` 为登录后返回的 `token`

    ***

    返回值：

    | 值     | 类型   | 说明                 |
    | ------ | ------ | -------------------- |
    | code   | int    | 200 成功，400 失败   |
    | userid | int    | 用户的 id            |
    | desc    | string | 提示信息             |
    | token  | string | 进行登录验证的 token |

请求示例

```js
// 1 token设置
// token ->后端返回的token axios设置方式如下
axios.defaults.headers.common['Authorization'] = token;
//或者使用拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common.Authorization = token;
    return config;
  },
  err => Promise.reject(err)
);
//2.请求发送
axios.post('/validate');
```
------

4.  修改密码

    接口地址 : `/user/resetpassword`
    请求方式：`post`
    参数:

| 参数名      | 类型   | 是否必须 | 说明    |
| ----------- | ------ | -------- | ------- |
| userid      | int    | 是       | 用户 id |
| oldPassword | String | 是       | 旧密码  |
| newPassword | String | 是       | 新密码  |

返回值：

| 值   | 类型   | 说明                               |
| ---- | ------ | ---------------------------------- |
| code | int    | 200 成功，201 旧密码错误，400 失败 |
| desc  | string | 请求成功/失败原因                  |

请求示例

```js
axios.post(`/user/resetpassword`, {
  userid: '5df197faf405c10f0e0a49c7',
  oldPassword: '1123',
  newPassword: '1111111'
});
```
------
5.  获取用户基本信息
    接口地址 : user/getuserinfo
    请求方式：get
    参数:

| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| userid | int  | 是       | 用户 id |

---

返回值：

| 值     | 类型   | 说明               |
| ------ | ------ | ------------------ |
| code   | int    | 200 成功，400 失败 |
| avatar | string | 用户头像图片地址   |
| desc    | string | 请求成功/失败原因  |

请求示例

```js
let userid = `5df197faf405c10f0e0a49c7`;
axios.get(`/user/getuserinfo?userid=${userid}`);
```
------

## 项目模块

1. 新增项目

  - 接口地址 : `/project/add`
  - 请求方式：`post`
  - 参数:

| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| projectName | String  | 是   |  项目名称|  
| projectBaseUrl | String  | 是  |接口基础路径 | 
| projectDesc | String  | 是   |项目描述 |
| userId | String  | 是   | 当前登录用户 id |

  

请求示例

```js
axios.post('/project/add',{   
    "projectName":"项目名称10",
    "projectBaseUrl":"/tes",
    "projectDesc":"post",
    "userId":"61d6a8199a40ae532bf89a2e"
});
```
------
2. 修改项目信息 

接口地址 : `project/update`

| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| projectId | String  | 是   |  项目id| 
| projectName | String  | 否   |  项目名称|  
| projectBaseUrl | String  | 否  |接口基础路径 | 
| projectDesc | String  | 否   |项目描述 |

返回值：

| 值     | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| code   | int    | 200 成功，400 失败   |
| desc    | string | 提示信息             |
| token  | string | 进行登录验证的 token |
|data| object | 单条项目更新后数据  |


`data` 中的数据说明：

| 值     | 类型   | 说明               |
| ------ | ------ | ------------------ |
| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| _id | String  | 是   |  项目id| 
| projectName | String  | 否   |  项目名称|  
| projectBaseUrl | String  | 否  |接口基础路径 | 
| projectDesc | String  | 否   |项目描述 |
| userId | String  | 否   |用户id |


请求示例：

```js
axios.put('/project/update', {   
    "projectId":"62a6a987bd97cd0cebcd7e02",
    "projectName":"项目名称100",
    "projectBaseUrl":"/tes",
    "projectDesc":"xijdjlajl jaljljalfj"
});
```
------
3. 获取项目列表 
  - 接口地址 : `/project/list`
  - 请求方式：`get`
  - 参数:

| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| userId | String  | 是   |  用户id| 
| pageNum | int  | 否  |页码 | 
| pageSize | int  | 否  |每页条数，不传默认显示20条 | 

返回值：

| 值     | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| code   | int    | 200 成功，400 失败   |
| desc    | string | 提示信息             |
| token  | string | 进行登录验证的 token |
| data| Array |  项目列表数据集合  |

`data` 中的单条数据说明：参考修改项目信息接口 t`data` 中的数据说明： 


4. 删除项目

  - 接口地址 : `api/delete`
  - 请求方式：`delete/${项目id}`
  - 参数:无

请求示例：

```js
let projectID= `61d6a8199a40ae532bf89a2e`;
axios.delete(`/api/delete/${projectID}`);
```
------


## 接口模块

1. 新增接口 

  - 接口地址 : `/api/addApi`
  - 请求方式：`post`
  - 参数:

| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| projectId | String  | 是   |  项目id|  
| apiName | String  | 是  |接口名 | 
| apiUrl | String  | 是   |接口地址 | 
| apiMehod | String  | 是  |接口请求方式,只能是 get、post、put、delete | 
| apiJson | Array/ Obeject  | 是  |接口数据 |
| apiDescribe | String  | 否  |接口描述 |
| apiWaitTime | Number  | 否  |请求延时时间 |

返回值：

| 值     | 类型   | 说明               |
| ------ | ------ | ------------------ |
| code   | int    | 200 成功，400 失败 |
| desc   | string | 请求成功/失败原因  |

请求示例

```js
axios.post('/api/add', {    
     "apiName":"示例接口",
     "apiUrl":"/t1",
     "apiMehod":"get",
     "apiWaitTime":200,
     "apiDescribe":"接口介绍",
     "apiJson":"{name:1}",
     "projectId":"61d6a8199a40ae532bf89a2e"
});
```
------

2. 获取接口列表（支持模糊搜索）

  - 接口地址 : `/api/list`
  - 请求方式：`get`
  - 参数:

| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| projectId | String  | 是   |  项目id| 
| pageNum | int  | 否  |页码 | 
| pageSize | int  | 否  |每页条数，不传默认显示20条 | 
| apiName |string|否| 接口名称模糊搜索参数|
| apiUrl  |  string |否| 接口地址模糊搜索参数|

返回值：

| 值     | 类型   | 说明               |
| ------ | ------ | ------------------ |
| code   | int    | 200 成功，400 失败 |
| desc   | string | 请求成功/失败原因  |
| max| int |  最大数据长度  |
| data | Array | 返回的数据  |

`data` 中的单条数据说明：

| 值     | 类型   | 说明               |
| ------ | ------ | ------------------ |
| _id | String  | 接口id|  
| apiName | String |接口名 | 
| apiUrl | String   |接口地址 | 
| apiMehod | String   |接口请求方式,只能是 get、post、put、delete | 
| apiJson | Array/ Obeject  |接口数据 |
| apiMockUrl |String | 接口地址相对路径，请根据请求的域名进行拼接 |
| apiDescribe | String   |接口描述 |
| apiWaitTime | Number   |请求延时时间 |
|creatAt| Date  |接口创建时间 |
| projectId | String  | 是   |  项目id| 


请求示例：
```js
let projectId= `61d6a8199a40ae532bf89a2e`;
let pageNum=1;
let pageSize=20;
axios.get(`/api/list?projectId=${projectId}&pageNum=${pageNum}&pageSize=${pageSize}`);
```
------

3. 编辑接口

  - 接口地址 : `/api/update`
  - 请求方式：`put`
  - 参数: 

| 参数名 | 类型 | 是否必须 | 说明    |
| ------ | ---- | -------- | ------- |
| id | String  | 是   | 接口id | 
| apiName | String  | 否  |接口名 | 
| apiUrl | String  | 否   |接口地址 | 
| apiMehod | String  | 否  |接口请求方式,只能是 get、post、put、delete | 
| apiJson | Array/ Obeject  | 否  |接口数据 |
| apiDescribe | String  | 否  |接口描述 |
| apiWaitTime | Number  | 否  |请求延时时间 | 

返回值：见获取接口列表 `data` 中的单条数据说明。

请求示例：

```js
axios.put('/api/update', {        
     "id":"62a166e06b205138158edbbd",
     "apiName":"ee",
     "apiUrl":"/testi",
     "apiMehod":"get",
     "apiWaitTime":200,
     "apiDescribe":"",
     "apiJson":[5555], 
});
```
------
4. 删除接口

  - 接口地址 : `api/delete`
  - 请求方式：`delete/${接口id}`
  - 参数:无

请求示例：

```js
let apiId= `61d6a8199a40ae532bf89a2e`;
axios.delete(`/api/delete/${apiId}`);
```
------