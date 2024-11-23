const express=require('express')
const router= express.Router()

const EmployeeModel = require('../models/employee')

router.get("/", (req,res)=>{
    res.send("employee home page");

})

router.get("/employees", (req, res) => {
    //get all books 
    EmployeeModel.find().then((employees)=>{
        res.send(employees)
    }).catch((err)=>{
        res.status(500).send({message: err.message})
    })
})

router.post("/employees", async (req,res)=>{
    const empData = req.body
    try{
        const emp = new EmployeeModel(empData)
        const newEmp = await emp.save()
        res.send(newEmp)
    } catch(err){
        res.status(500).send({message: err.message})
    }
})

router.get("/employees/:id", (req,res)=>{
     //req.params
     EmployeeModel.findById(req.params.id).then((emp)=>{
        if(emp) {
            res.send(emp)
        } else {
            res.status(404).send({message: "Employee not found"})
        }
    }).catch((err)=>{
        res.status(500).send({message: err.message})
    })

})

router.put("/employees/:id", async (req,res)=>{
    await EmployeeModel.findByIdAndUpdate(req.params.id, req.body)
    .then((emp) => {
        if(emp) {
            emp.updated_at=Date.now()
            console.log('employee updating')
            res.send(emp)
            console.log(emp.department)
        } else {
            res.status(404).send({message: "Employee not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
   
})


router.delete("/employees", (req,res)=>{
    const id = req.query.eid;
    console.log(id)
    EmployeeModel.findByIdAndDelete(id)
    .then((emp) => {
        if(emp) {
            res.send(emp)
        } else {
            res.status(404).send({message: "Employee not found"})
        }
    }).catch((err) => {
        res.status(500).send({message: err.message})
})

})


module.exports = router;