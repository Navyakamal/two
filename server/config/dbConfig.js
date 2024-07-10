const mongoose=require('mongoose')

mongoose.connect(process.env.mongo_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection=mongoose.connection;

connection.on("connected",()=>{
    console.log("Mongo db connected");
});

connection.on("error",(err)=>{
    console.log("Mongo db connection failed",err);
})