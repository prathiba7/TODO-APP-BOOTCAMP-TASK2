const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const { ObjectId } = require("mongoose");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

const db=require('./views/keys.js').MongoURI;
mongoose.connect(db,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>console.log('MongoDb Connected...'))
.catch(err=>console.log(err))

const todoSchema = new mongoose.Schema({

        name:String
        
});

const Todoobject=mongoose.model("Todoobject",todoSchema);



app.get("/",(req,res)=>{
    Todoobject.find({},(err,todo)=>{
        if(err)
        console.log(err);
        else{
            res.render("index.ejs",{todo:todo});
        }
    });
    
});

//add button
app.post("/newtodo",(req,res)=>{
    
    const newitem=new Todoobject({
    name : req.body.todoitem
    });
    Todoobject.create(newitem,(err,Todoobject)=>{
        if(err)
        console.log(err);
        else{
            console.log("item added:");
        }
    });
    res.redirect("/");
});
//delete
app.post('/delete', function(req, res) {
    const id=req.body.btndelete;
    Todoobject.findByIdAndRemove(id,(err)=>{
        if(err)
        console.log(err);
        else{
                console.log("item deleted");
        }
    });
        res.redirect("/");

});




app.listen(4000,()=>{
    console.log("server started");
});