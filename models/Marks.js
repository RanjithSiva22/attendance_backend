var mongoose=require('mongoose');

const markSchema=new mongoose.Schema({
    dept:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    stclass:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    sem:{
        type:String,
        required:true,
    },
    test:{
        type:String,
        required: true,
        min:3,
        max:255
    },
    marks:{
        type:Array,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    
});

module.exports=mongoose.model('Mark',markSchema);