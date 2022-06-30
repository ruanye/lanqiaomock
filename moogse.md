1. MongoDB 简介 #
   Mongodb 是一个开源的 NoSQL 数据库，相比 MySQL 那样的关系型数据库，它更显得 轻巧、灵活，非常适合在数据规模很大、事和性不强的场合下使用。
   同时它也是一个对象数据库，没有表和行的概念，也没有固定的模式和结构，所有的数据都是以文档的形式存存储(文档，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组、甚至是一个嵌套文档)，数据格式就是 JSON。

2. Mongoose 是什么？
   Mongoose 是 MongoDB 的一个对象模型工具
   同时它也是针对 MongoDB 操作的一个对象模型库,封装了 MongoDB 对文档的的一些增删改查等常用方法
   让 NodeJS 操作 Mongodb 数据库变得更加灵活简单
   Mongoose 因为封装了 MongoDB 对文档操作的常用方法，可以高效处理 mongodb,还提供了类似 Schema 的功能，如 hook、plugin、virtual、populate 等机制。
   官网 mongoosejs
3. 使用 mongoose
   3.1 安装 mongoose

```shell
    $ npm install mongoose
```

3.2 使用 mongoose

```js
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://user:pass@ip:port/database');
//user 用户名
//pass 密码
//ip IP地址
//port 端口号
//database 数据库
```

3.3 使用 mongoose

```js
var mongoose = require('mongoose');
var connection = mongoose.createConnection(
  'mongodb://stu:123456@132.232.89.22:27017/stu'
);
connection.then(
  data => {
    console.log('连接成功');
  },
  err => {
    console.log('连接失败');
    console.log(err);
  }
);
```

3.4 Schema

- Schema 是数据库集合的模型骨架
- 定义了集合中的字段的名称和类型以及默认值等信息
  3.4.1 Schema.Type
- NodeJS 中的基本数据类型都属于
- Schema.Type 另外 Mongoose 还定义了自己的类型
- 基本属性类型有:

  - 字符串(String)
  - 日期型(Date)
  - 数值型(Number)
  - 布尔型(Boolean)
  - null
  - 数组([])
  - 内嵌文档

    3.4.2 定义 Schema

```js
var personSchema = new Schema({
name:String, //姓名
binary:Buffer,//二进制
living:Boolean,//是否活着
birthday:Date,//生日
age:Number,//年龄
_id:Schema.Types.ObjectId, //主键
_fk:Schema.Types.ObjectId, //外键
array:[],//数组
arrOfString:[String],//字符串数组
arrOfNumber:[Number],//数字数组
arrOfDate:[Date],//日期数组
arrOfBuffer:[Buffer],//Buffer 数组
arrOfBoolean:[Boolean],//布尔值数组
arrOfObjectId:[Schema.Types.ObjectId]//对象 ID 数组
nested:{ //内嵌文档
name:String,
}
});
let p = new Person();
p.name= 'ym';
p.age = 25;
p.birthday = new Date();
p.married = false;
p.mixed= {any:{other:'other'}};
p._otherId = new mongoose.Types.ObjectId;
p.hobby.push('smoking');
p.ofString.push('string');
p.ofNumber.pop(3);
p.ofDates.addToSet(new Date);
p.ofBuffer.pop();
p.ofMixed = ['anything',3,{name:'ym'}];
p.nested.name = 'ym';
```

3.4.3 Model

- Model 是由通过 Schema 构造而成
- 除了具有 Schema 定义的数据库骨架以外，还可以操作数据库
- 如何通过 Schema 来创建 Model 呢，如下:

```js
//连接数据库
mongoose.connect('mongodb://123.57.143.189:27017/zfpx');
//两个参数表示定义一个模型
var PersonModel = mongoose.model('Person', PersonSchema);
// 如果该 Model 已经定义，则可以直接通过名字获取
var PersonModel = mongoose.model('Person'); //一个参数表示获取已定义的模型
```

> 拥有了 Model，我们也就拥有了操作数据库的能力 在数据库中的集合名称等于 模型名转小写再转复数,比如
> Person>person>people,Child>child>children

3.4.4 Entity 简述

- 通过 Model 创建的实体，它也可以操作数据库 使用 Model 创建 Entity，如下示例：

```js
var personEntity = new PersonModel({
  name: 'zfpx',
  age: 6
});
```

> Schema 生成 Model，Model 创造 Entity，Model 和 Entity 都可对数据库操作,但 Model 比 Entity 可以实现的功能更多

3.4.5 保存 Entity

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zfpx');
var PersonSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number, default: 0 }
});
var PersonModel = mongoose.model('Person', PersonSchema);
var PersonEntity = new PersonModel({
  name: 'zfpx',
  age: 6
});
PersonEntity.save(function(error, doc) {
  if (error) {
    console.log('error :' + error);
  } else {
    //doc 是返回刚存的 person 对象
    console.log(doc);
  }
});
```

3.4.6 ObjectId

- 存储在 mongodb 集合中的每个文档都有一个默认的主键\_id
- 这个主键名称是固定的，它可以是 mongodb 支持的任何数据类型，默认是 ObjectId 该类型的值由系统自己生成，从某种意义上几乎不会重复
- ObjectId 使用 12 字节的存储空间，是一个由 24 个 16 进制数字组成的字符串（每个字节可以存储两个 16 进制数字）
  `5d9c70b3 f88966 4f24 d9caa5`

| 部分   | 值       | 含义                                                                                               |
| ------ | -------- | -------------------------------------------------------------------------------------------------- |
| 4 字节 | 5d9c70b3 | 时间戳是自 1970 年 1 月 1 日（08:00:00 GMT）至当前时间的总秒数，它也被称为 Unix 时间戳，单位为秒   |
| 3 字节 | f88966   | 所在主机的唯一标识符,通常是机器主机名的散列值(hash),可以确保不同主机生成不同的 ObjectId 不产生冲突 |
| 2 字节 | 4f24     | 产生 ObjectId 的进程的进程标识符(PID)                                                              |
| 3 字节 | d9caa5   | 由一个随机数开始的计数器生成的值                                                                   |

```js
let ts = parseInt('5d9c70b3', 16);
console.log(ts);
let date = new Date(ts * 1000);
console.log(date.toLocaleString());

console.log(parseInt('4f24', 16)); //20260
console.log(parseInt('d9caa5', 16)); //14273189
```

> 前 9 个字节保证了同一秒钟不同机器不同进程产生的 ObjectId 是唯一的,最后 3 个字节是一个自动增加的计数器，确保相同进程同一秒产生的 ObjectId 也是不一样的,一秒钟最多允许每个进程拥有 256 的 3 次方(16777216)个不同的 ObjectId 每一个文档都有一个特殊的键\_id，这个键在文档所属的集合中是唯一的。

3.5 基础操作
3.5.1 查询
语法

```js
Model.find(查询条件, callback);
代码;
Model.find({}, function(error, docs) {
  //若没有向 find 传递参数，默认的是显示所有文档
});
Model.find({ age: 6 }, function(error, docs) {
  if (error) {
    console.log('error :' + error);
  } else {
    console.log(docs); //docs: age 为 6 的所有文档
  }
});
```

3.5.2 Model 保存
语法

```js
Model.create(文档数据, callback))
代码
PersonModel.create({ name:"zfpx", age:7}, function(error,doc){
if(error) {
console.log(error);
} else {
console.log(doc);
}
});
```

3.5.3 Entity 保存
语法

```js
Entity.save(callback))
代码
var PersonEntity = new PersonModel({name:"zfpx",age: 9});
PersonEntity.save(function(error,doc) {
if(error) {
console.log(error);
} else {
console.log(doc);
}
});
```

3.5.4 更新
语法

```js
Model.update(查询条件,更新对象,callback);
代码
var conditions = {name : 'zfpx'};
var update = {$set : { age : 100 }};
   PersonModel.update(conditions, update, function(error){
   if(error) {
   console.log(error);
   } else {
   console.log('Update success!');
   }
   });
   请注意如果匹配到多条记录，默认只更新一条，如果要更新匹配到的所有记录的话需要加一个参数 {multi:true}
   3.5.5 删除
   语法
   Model.remove(查询条件,callback);
   代码
   var conditions = { name: 'zfpx' };
   PersonModel.remove(conditions, function(error){
   if(error) {
   console.log(error);
   } else {
   console.log('Delete success!');
   }
   });
```

3.5.6 基本查询
3.5.6.1 准备数据

```js
PersonModel.create(
  [
    { name: 'ym1', age: 1 },
    { name: 'ym2', age: 2 },
    { name: 'ym3', age: 3 },
    { name: 'ym4', age: 4 },
    { name: 'ym5', age: 5 },
    { name: 'ym6', age: 6 },
    { name: 'ym7', age: 7 },
    { name: 'ym8', age: 8 },
    { name: 'ym9', age: 9 },
    { name: 'ym10', age: 10 }
  ],
  function(error, docs) {
    if (error) {
      console.log(error);
    } else {
      console.log('save ok');
    }
  }
);
```

3.5.6.2 属性过滤
语法

```js
find(Conditions,field,callback)
代码
//field 省略或为 Null，则返回所有属性。
//返回只包含 name、age 两个键的所有记录
Model.find({},{name:1, age:1, _id:0}，function(err,docs){
//docs 查询结果集
})
```

> 我们只需要把显示的属性设置为大于零的数就可以，当然 1 是最好理解的，id 是默认返回，如果不要显示加上("id":0)

3.5.6.3 findOne(查询单条)
与 find 相同，但只返回单个文档，也就说当查询到即一个符合条件的数据时，将停止继续查询，并返回查询结果 语法

```js
findOne(Conditions, callback);
代码;
TestModel.findOne({ age: 6 }, function(err, doc) {
  // 查询符合 age 等于 6 的第一条数据
  // doc 是查询结果
});
```

3.5.6.4 findById(按 ID 单条数据)
与 findOne 相同，但它只接收文档的\_id 作为参数，返回单个文档 语法
findById(\_id, callback)
代码

```js
PersonModel.findById(person._id, function(err, doc) {
  //doc 查询结果文档
});
```

3.5.6.5 lt(大于、小于)
查询时我们经常会碰到要根据某些字段进行条件筛选查询，比如说 Number 类型，怎么办呢，我们就可以使用 lt(<)、gte(>=)操作符进行排除性的查询，如下示例：

```js
Model.find({ age: { $gt: 6 } }, function(error, docs) {
  //查询所有 nage 大于 6 的数据
});
Model.find({ age: { $lt: 6 } }, function(error, docs) {
  //查询所有 nage 小于 6 的数据
});
Model.find({ age: { lt: 9 } }, function(error, docs) {
  //查询所有 nage 大于 6 小于 9 的数据
});
```

3.5.6.6 ne(!=)操作符的含义相当于不等于、不包含，查询时我们可通过它进行条件判定，具体使用方法如下：

```js
Model.find({ age: { $ne: 6 } }, function(error, docs) {
  //查询 age 不等于 6 的所有数据
});
```

3.5.6.7 ne 操作符相反，\$in 相当于包含、等于，查询时查找包含于指定字段条件的数据

```js
Model.find({ age: { $in: 6 } }, function(error, docs) {
  //查询 age 等于 6 的所有数据
});
Model.find({ age: { $in: [6, 7] } }, function(error, docs) {
  //可以把多个值组织成一个数组
});
```

3.5.6.8 \$or(或者)
可以查询多个键值的任意给定值，只要满足其中一个就可返回，用于存在多个条件判定的情况下使用，如下示例：

```js
Model.find({ $or: [{ name: 'zfpx' }, { age: 6 }] }, function(error, docs) {
  //查询 name 为 zfpx 或 age 为 6 的全部文档
});
```

3.5.6.9 exists 操作符，可用于判断某些关键字段是否存在来进行条件查询。如下示例：

```js
Model.find({ name: { $exists: true } }, function(error, docs) {
  //查询所有存在 name 属性的文档
});
Model.find({ email: { \$exists: false } }, function(error, docs) {
  //查询所有不存在 email 属性的文档
});
```

3.5.7 高级查询
可以限制结果的数量,跳过部分结果,根据任意键对结果进行各种排序
所有这些选项都要在查询被发送到服务器之前指定
3.5.7.1 limit(限制数量)
在查询操作中,有时数据量会很大,这时我们就需要对返回结果的数量进行限制 那么我们就可以使用 limit 函数，通过它来限制结果数量。 语法
find(Conditions,fields,options,callback);
代码

```js
Model.find({}, null, { limit: 20 }, function(err, docs) {
  console.log(docs);
});
```

> 如果匹配的结果不到 20 个，则返回匹配数量的结果，也就是说 limit 函数指定的是上限而非下限
> 3.5.7.2 skip(跳过/略过的数量)
> skip 函数的功能是略过指定数量的匹配结果，返回余下的查询结果 如下示例：

```js
find(Conditions, fields, options, callback);
代码;
Model.find({}, null, { skip: 4 }, function(err, docs) {
  console.log(docs);
});
```

> 如果查询结果数量中少于 4 个的话，则不会返回任何结果。

3.5.7.3 sort 函数
sort 函数可以将查询结果数据进行排序操作 该函数的参数是一个或多个键/值对 键代表要排序的键名,值代表排序的方向,1 是升序,-1 是降序 语法

```js
find(Conditions, fields, options, callback);
代码;
Model.find({}, null, { sort: { age: -1 } }, function(err, docs) {
  //查询所有数据，并按照 age 降序顺序返回数据 docs
});
```

> sort 函数可根据用户自定义条件有选择性的来进行排序显示数据结果。
> 3.5.7.4 分页查询

```js
Model('User').find({})
.sort({createAt:-1})
.skip((pageNum-1)\*pageSize)
.limit(pageSize)
.populate('user')
.exec(function(err,docs){
console.log(docs);
});
```

3.5.7.5 populate

```js
var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/201606blog');
//定义课程 Schema
var CourseSchema = new mongoose.Schema({
  name: String
});
var CourseModel = mongoose.model('Course', CourseSchema);
var PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // 外键 别的集合的主键
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' //指明此外键是哪个集合中的外键
  }
});
var PersonModel = mongoose.model('Person', PersonSchema);
CourseModel.create({ name: 'node.js' }, function(err, course) {
  PersonModel.create({ name: 'zfpx', course: course.\_id }, function(err, doc) {
    console.log(doc);
    PersonModel.findById(doc.\_id)
      .populate('course')
      .exec(function(err, doc) {
        console.log(doc);
      });
  });
});
```


