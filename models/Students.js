var mongoose=require('mongoose');

const studSchema=new mongoose.Schema({
    fac_id:{
        type:String,
        required:true
    },
    class_id:{
        type:String,
        required:true
    },
    studs:{
        type:Array
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Stud',studSchema);