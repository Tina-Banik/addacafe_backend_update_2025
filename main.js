const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
/**Middlewares */
require("dotenv").config();
app.use(cookieParser());
app.use(require("cors")({origin:process.env.ALLOWED_ORIGIN, credentials:true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public/uploads'))
/**consume the database connection */
require("./db/db_connections");
/**consume the user route */
const userPath = "/user";
const userRoute = require("./route/user.route");
app.use(`${process.env.API_URL}${userPath}`, userRoute);
/**consume the food route */
const foodPath = "/food";
const foodRoute = require("./route/food.route");
app.use(`${process.env.API_URL}${foodPath}`, foodRoute);
/**consume the order route */
const orderPath = "/order";
const orderRoute = require("./route/order.route");
app.use(`${process.env.API_URL}${orderPath}`, orderRoute);
/**basic landing page */
app.get('/',(req,res)=>{
    res.send("<h4>Welcome to the flavour fusion cafe</h4>")
})

/**listens the port */
app.listen(process.env.PORT,()=>{
    console.log(`The server listens at port ${process.env.PORT}`)
})