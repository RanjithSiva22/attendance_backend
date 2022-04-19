var mongoose=require('mongoose');

const facultySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    dept:{
        type:String,
        required:true,
        max:40
    },
    phone:{
        type:String,
        required:true,
        min:10,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:50
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Faculty',facultySchema);