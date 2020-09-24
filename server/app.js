//加载Express的模板
const express = require('express');
//引入cors模块
const cors = require('cors');
//加载mysql模块
const mysql = require('mysql');
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'tu'
})
const bodyParser = require('body-parser');
//创建express对象
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}))

//使用cors模块
app.use(cors({
  origin: ["http://127.0.0.1:8080", "http://localhost:8080"]
}))
//指定监听端口号
app.listen(3000);


// 获取分类

app.get('/query', (req, res) => {
  let sql = 'select * from sou ';
  pool.query(sql, (err, results) => {
    if (err) throw err;
    res.send({
      message: '查询成功',
      code: 1,
      results: results
    })
  })
})

// 主页搜索
app.get('/cha', (req, res) => {
  let guanjianzi = req.query.guanjianzi
  console.log(req.query.guanjianzi+"-----我是app的关键子")

  let sql = 'SELECT * FROM design WHERE QUERY REGEXP ? ';
  pool.query(sql, [guanjianzi],(err, results) => {
    if (err) throw err;
    console.log(results+"正中"+guanjianzi)
    res.send({
      message: '查询成功',
      code: 1,
      results: results
    })
  })
})

//获取图片
app.get("/pics", (req, res) => {
  // res.send("ok");
  let classify = req.query.classify;
  let page = req.query.page;
  let pagesize = 8;
  let offset = (page - 1) * pagesize;
  let sql = 'SELECT COUNT(id) AS count FROM design WHERE class_class=?';
  pool.query(sql, [classify], (err, result) => {
    let rowcount = result[0].count;
    let pagecount = Math.ceil(rowcount / pagesize)
    sql = 'SELECT id,path,theme,collect FROM design WHERE class_class=? LIMIT ' + offset + ',' + pagesize;
    pool.query(sql, [classify], (err, result) => {
      if (err) throw err;
      res.send({
        message: '查询成功',
        code: 1,
        result: result,
        pagecount: pagecount
      })
      // res.send(result)
    })
  })
})

//获取图片详情下载页
app.get("/download", (req, res) => {
  // res.send("ok");
  let id = req.query.id;
  let sql = 'SELECT id,path,theme,file_format,img_size,file_size,color FROM design WHERE id=?'
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({
      message: '查询成功',
      code: 1,
      result: result
    })
    // res.send(result)
  })
})

//收藏
app.post("/collect", (req, res) => {
  // res.send("ok");
  let id = req.body.id;
  let collect = req.body.collect;
  let sql = 'UPDATE design SET collect=?  WHERE id=?'
  pool.query(sql, [collect, id], (err, result) => {
    if (err) throw err;
    res.send({
      message: '查询成功',
      code: 1,
      result: result
    })
    // res.send(result)
  })
})

//获取图片
app.get("/pic", (req, res) => {
  // res.send("ok");
  let collect = req.query.collection;
  let page = req.query.page;
  let pagesize = 8;
  let offset = (page - 1) * pagesize;
  let sql = 'SELECT COUNT(id) AS count FROM design WHERE collect=?';
  pool.query(sql, [collect], (err, result) => {
    let rowcount = result[0].count;
    let pagecount = Math.ceil(rowcount / pagesize)
    sql = 'SELECT id,path,theme,collect FROM design WHERE collect=? LIMIT ' + offset + ',' + pagesize;
    pool.query(sql, [collect], (err, result) => {
      if (err) throw err;
      res.send({
        message: '查询成功',
        code: 1,
        result: result,
        pagecount: pagecount
      })
      // res.send(result)
    })
  })
})

//获取分类数
app.get("/fenlei", (req, res) => {
  let sql = 'select * from fenlei';
  pool.query(sql, (err, result) => {
    if (err) throw err;

    // console.log(results)
    res.send({
      message: '查询成功',
      code: 1,
      result: result
    })
  })
})

//用户注册接口
app.post("/register", (req, res) => {
  //1.获取客户端提交的用户名和密码
  let username = req.body.username;
  let passwrod = req.body.password;
  //2.以当前的用户名为条件进行查询操作，如果没有找到的话，则
  let sql = "SELECT id,username FROM login WHERE username=?"
  pool.query(sql, [username], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      //3.将用户信息写入数据表（还需要注意将密码变成md5的结果）
      let sql1 = "INSERT INTO login (username, password) VALUES (?,MD5(?))"
      pool.query(sql1, [username, passwrod], (err1, result1) => {
        if (err1) throw err1;
        res.send({
          message: '注册成功',
          code: 1
        })
      })
    } else {
      //4.如果找到的话，则直接产生错误响应信息到客户端
      res.send({
        message: '注册失败,用户名已存在',
        code: 0
      })
    }
  })
})

//用户登录接口
app.post("/login", (req, res) => {
  //1.获取客户端提交的用户名和密码
  let username = req.body.username;
  let passwrod = req.body.password;
  //2.以当前的用户名和密码为条件进行查询操作，如果没有找到的话，则
  let sql = "SELECT id,username,member_id FROM login WHERE username=? AND password=MD5(?)"
  pool.query(sql, [username, passwrod], (err, result) => {
    if (err) throw err;
    //如果返回的结果为空数组则没有该用户·密码
    if (result.length == 0) {
      res.send({
        message: '用户名或者密码错误',
        code: 0
      })
    } else {
      res.send({
        message: '登录成功',
        code: 1,
        userId: result[0].id,
        member_id: result[0].member_id
      })
    }
  })
})

//用户开通VIP
app.post('/openVip', (req, res) => {
  let id = req.body.id;
  let sql = 'UPDATE login SET member_id = 1  WHERE id=?';
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows) {
      res.send({
        code: 1
      })
    } else {
      res.send({
        code: 0
      })
    }
  })
})