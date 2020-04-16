const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')


app.use(bodyParser.json())
//7qJqOB3z7NVudfo9
const Employee = mongoose.model("employee")

const mongoUri = "mongodb+srv://Utkarsh:7qJqOB3z7NVudfo9@amigos-fpfdz.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected",()=>{
    console.log("Connected to the mongo")
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)  
    })
  
})


app.post('/send-data',(req,res)=>{
 const employee = new Employee({
     name:req.body.name,
     email:req.body.email,
     phone:req.body.phone,
     picture:req.body.picture,
     salary:req.body.salary,
     postion:req.body.postion
 })
 employee.save()
 .then(data=>{
     console.log(data)
     res.send(data)
 }).catch(err=>{
    console.log(err)  
})

})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)  
    })
})
app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
     name:req.body.name,
     email:req.body.email,
     phone:req.body.phone,
     picture:req.body.picture,
     salary:req.body.salary,
     postion:req.body.postion
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)  
    })
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})