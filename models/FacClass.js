var mongoose=require('mongoose');

const classSchema=new mongoose.Schema({
    fac_id:{
        type:String,
        required:true
    },
    sub:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    year:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    dept:{
        type:String,
        required:true,
        max:40
    },
    studs:{
        type:Array,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    periods:{
        type:Number
    }
});

module.exports=mongoose.model('Class',classSchema);