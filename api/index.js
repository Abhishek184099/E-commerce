const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const app = express();
require('dotenv').config({});


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit:1000000,limit:'1000mb'}));
app.use(bodyParser.json());

app.use(fileUpload({
    limits: {
        fileSize : 50*1024*1024,    
    },
     useTempFiles: true,
    tempFileDir: '/tmp/',
}))

app.use("/uploads", express.static("uploads"));




const port = process.env.PORT || 0;

app.use('/api/auth/',require('./routes/auth.route'))
app.use('/api/product/',require('./routes/product.route'))
app.use('/api/cart/',require('./routes/cart.route'))
app.use('/api/order/',require('./routes/order.route'))





app.listen(port, () => {
    console.log(`server started at ${port}`);
    require('./db/connectDb').connectDb();
})