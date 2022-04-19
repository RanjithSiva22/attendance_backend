var express=require('express');
var router=express.Router();
var FacClass=require('../models/FacClass');


router.post('/addclass',async (req,res)=>{
    // console.log(req.header);
    const {subject,dept,year}=req.body.classDetail;
    const cls=new FacClass({
        fac_id:req.header('fac_id'),
        sub:subject,
        year:year,
        dept:dept,
        studs:req.body.students,
        periods: 0
    });
    try{
        // console.log("initiating save command -------------------------");
        const savedClass= await cls.save();
        console.log(savedClass);
        // console.log("saved dacoments-------------------------------");
        return res.send("success");

        // console.log('returning -------------------------');
        // res.send("done");
    }catch(err){
        // console.log(err,"-------------------------error");
       return  res.status(400).json(err);
    }
});

router.get('/getclasses',async (req,res)=>{
    const faclass= await FacClass.find({fac_id:req.header('fac_id')});
    // console.log(faclass);
    res.send(faclass);
});

module.exports = router;
