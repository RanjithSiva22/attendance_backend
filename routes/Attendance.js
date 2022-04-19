var express = require('express');
var router = express.Router();
var FacClass = require('../models/FacClass');
const fast2sms = require('fast-two-sms')


router.get('/class/:id', async (req, res) => {
    const classdet = await FacClass.findOne({ _id: req.params.id });
    // console.log(classdet);
    res.send(classdet);
})

router.post('/marked', async (req, res) => {
    const { class_id, marked } = req.body;
    // console.log(req.body);
    const arr = marked.filter(i => i.status === false);
    // const nums=arr.map(x=>x.Phone);
    console.log(arr);

    var currentdate = new Date();
    var datetime =  currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    console.log(datetime);

    try {
        var previousvalue = await FacClass.findOne({ _id: class_id });
        // console.log(previousvalue);
        const result = await FacClass.updateOne({ _id: class_id }, { $set: { periods: previousvalue.periods + 1 } });
        // console.log(result);

        const getclass = await FacClass.findOne({ _id: class_id });
        const totalperiods = getclass.periods;
        let list = getclass.studs;

        console.log(getclass.periods);
        let j = 0;
        // console.log(list);
        console.log(JSON.stringify(list, null, '\t'));


        for (let i = 0; i < list.length; i++) {
            // console.log(i, j);
            if (j < arr.length) {
                if (list[i].Roll_no == arr[j].Roll_no) {
                    j++;
                    list[i].Percent = (list[i].Attended / totalperiods) * 100;

                    continue;
                } else {
                    list[i].Attended += 1;
                    list[i].Percent = (list[i].Attended / totalperiods) * 100;
                    // console.log(list[i].Percent)
                }
            } else {
                list[i].Attended += 1;
                list[i].Percent = (list[i].Attended / totalperiods) * 100;
                // console.log(list[i].Percent)
            }

        }
        console.log(JSON.stringify(list, null, '\t'));
        await FacClass.updateOne({ _id: class_id }, { $set: { studs: [...list] } });
        let narr = arr.map(n => n.Phone);
        if (arr.length > 0)
            sendsms(res, arr,previousvalue,datetime);
        else {
            return res.send("success");
        }
        // console.log(arr);
        // if(sms.return) return res.send("success");

        // return res.send("fail");
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

const sendsms = (res, nums,cls,datetime) => {
    // console.log(nums);

    nums.forEach(async x => {
        var options = {
            authorization: "IybOlZ4h8Ud6EAPgXimtQK9oLjCFwD0vs7rpfHWSRzJ1TnuqcGTp2lPjiAWC3ZInuUdMcKQmDz89RrGt",
            message: `Hi sir/Mam, We are from Sri Shakthi College. ${x.Name} was absent for ${cls.sub} class today at ${datetime}.Thank you`,
            numbers: [x.Phone]
        }
        await fast2sms.sendMessage(options).catch(e => {
            console.log(e);
            return res.send("fail");

        });
    }
    )

    return res.send("success");

    // fast2sms.sendMessage(options).then((a) => {
    //     console.log(a);
    //     res.send("success");
    // }).catch(e => {
    //     console.log(e);
    //     res.send("fail");

    // }) //Asynchronous Function.
};

module.exports = router;
