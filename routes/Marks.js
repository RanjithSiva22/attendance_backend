var express=require('express');
var router=express.Router();
var Marks=require('../models/Marks');
const fast2sms = require('fast-two-sms')


router.post('/addmarks',async (req,res)=>{
    console.log(req.header);
    console.log(req.body.detail);

    const {dept,year,stclass,sem,test,stmarks}=req.body.detail;
    const mark=new Marks({
        dept,
        year,
        stclass,
        sem,
        test,
        marks:stmarks
    });
    try{
        // console.log("initiating save command -------------------------");
        const savedMark= await mark.save();
        console.log(savedMark);
        // console.log("saved dacoments-------------------------------");
        // return res.send("success");
        sendsms(res,stmarks,sem,test)
        // console.log('returning -------------------------');
        // res.send("done");
    }catch(err){
        // console.log(err,"-------------------------error");
       return  res.status(400).json(err);
    }
});

const sendsms = (res,stmarks,sem, test) => {
    // console.log(nums);

    stmarks.forEach(async x => {
        var options = {
            authorization: "IybOlZ4h8Ud6EAPgXimtQK9oLjCFwD0vs7rpfHWSRzJ1TnuqcGTp2lPjiAWC3ZInuUdMcKQmDz89RrGt",
            message: `Hi sir/Mam This is to notice the Marks secured by ${x.name} on ${test} of ${sem}th semester Cloud  : ${x.cloudcomputing},IP : ${x.InternetProgram} ,DBMS : ${x.DBMS}, Java : ${x.Java} ,DataStructure : ${x.DataStructure}
            `,
            numbers: [x.phone]
        }
        await fast2sms.sendMessage(options).catch(e => {
            console.log(e);
            return res.send("fail");

        });
        
    }
    )

    return res.send("success");

};

// router.get('/getclasses',async (req,res)=>{
//     const faclass= await FacClass.find({fac_id:req.header('fac_id')});
//     // console.log(faclass);
//     res.send(faclass);
// });

module.exports = router;
