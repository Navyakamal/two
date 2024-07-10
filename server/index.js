require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConfig= require('./config/dbConfig')
const app=express()

app.use(cors());
app.use(express.json());

const userRoute=require('./routes/userRoute')

app.use('/api/users',userRoute)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}....`);
});
