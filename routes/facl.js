var express=require('express');
var router=express.Router();

var Faculty=require('../models/Faculty');
const bcrypt = require('bcrypt');

router.post('/addfaculty',async (req, res) => {
    console.log('hitting the route -----------------------------');
   
    const duplicateuser= await Faculty.findOne({email:req.body.email});
    if(duplicateuser)return res.status(400).send("Email already exists");
  

    const salt=await bcrypt.genSalt(10);
    const hashpwd=await bcrypt.hash(req.body.password,salt);

    const user=new Faculty({
        name:req.body.name,
        email:req.body.email,
        password:hashpwd,
        dept:req.body.dept,
        phone:req.body.phone
    })
    try{
        // console.log("initiating save command -------------------------");
        const savedUser= await user.save();
        console.log(savedUser);
        // console.log("saved dacoments-------------------------------");
        return res.send("success");

        // console.log('returning -------------------------');
        // res.send("done");
    }catch(err){
        // console.log(err,"-------------------------error");
       return  res.status(400).json(err);
    }})

// router.get('/hlo',(req,res)=>{
//     res.send("helo");
// })

router.post('/login',async (req,res)=>{
    
    console.log('login');
    const emailvalid= await Faculty.findOne({email:req.body.email});
    // console.log(emailvalid);

    if(!emailvalid)return res.status(400).send("Email not exists");

 
    var msg=await bcrypt.compare(req.body.password, emailvalid.password);
    console.log(msg);
    if(!msg)return res.status(400).send("Password wrong");

    res.send({status: "success",fac_id: emailvalid._id});
      
});

module.exports = router;