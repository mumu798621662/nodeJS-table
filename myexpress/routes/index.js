var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'demo'
});
connection.connect();


router.get('/',function(req,res){
    connection.query("select * from students",function(err,result){
        res.render('index',{result:result})
    })
})
router.get('/del/id=:id',function(req,res){
    var id = req.params.id;
    console.log(id)
    connection.query("delete from students where id="+id,function(err,result){
        if(err){
            console.log(err)
            res.end(err)
        }else{
           res.render("message",{message:"删除成功"})
        }
    })
})

router.get("/add",function(req,res){
    res.render('add')
})

router.get("/addcontent",function(req,res){

    var name = req.query.name
    var sex = req.query.sex
    var age = req.query.age
    connection.query(`insert into students (name,sex,age) values ('${name}','${sex}','${age}')`,function(err,result){
        if(err){
            console.log(err)
            res.end(err)
        }else{
            res.render("message",{message:"添加成功"})
        }
})
})


router.get("/update/:id&:name&:sex&:age",function(req,res){
    var id = req.params.id;
    var name = req.params.name
    var sex = req.params.sex
    var age = req.params.age

    res.render('update',{id,name,sex,age})
})

router.get("/updatecontent",function(req,res){
    var id = req.query.id;
    var name = req.query.name
    var sex = req.query.sex
    var age = req.query.age
    console.log(id)
    connection.query(`update students set name='${name}',sex='${sex}',age='${age}' where id='${id}'`,function(err,result){
        if(err){
            console.log(err)
            res.end(err)
        }else{
            res.render("message",{message:"修改成功"})
        }
    })
})
module.exports = router;
