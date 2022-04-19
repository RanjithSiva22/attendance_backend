var express = require('express');
var app = express();
var cors = require('cors');
var dotenv=require('dotenv');
var mongoose=require('mongoose');
var faclRouter=require('./routes/facl');
var classRouter=require('./routes/classDtl');
var attendRouter=require('./routes/Attendance');
var markRouter=require('./routes/Marks');



dotenv.config();

mongoose.connect(process.env.db_con,{ useNewUrlParser: true,useUnifiedTopology: true },function (err, res) {
   try {
       console.log('Connected to Database');
   } catch (err) {
       throw err;
   }
})
app.use(cors());

app.use(express.json());

app.get('/', function (req, res) {
   console.log('hlo');
   res.send("Hello world!");
});
// app.post('/cart',(req,res)=>{
//    console.log(req.body);
//    res.send("cartsaved");
// });

app.use('/',faclRouter);
app.use('/facl', classRouter);
app.use('/attend',attendRouter);
app.use('/stmark',markRouter);



app.listen(4000, () => {console.log("Server started");});