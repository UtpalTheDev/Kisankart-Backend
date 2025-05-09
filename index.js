const express = require('express');
let bodyparse = require('body-parser');
const mongoose = require('mongoose');
const {Schema} =mongoose;
const cors = require('cors');
const app = express();

require("dotenv").config();

app.use(bodyparse.json())
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { routeNotFound } = require("./middlewares/route-not-found.middleware");
const { verifyAuth } = require("./middlewares/verifyAuth.middleware")

app.use(cors());

const wishlist = require("./routes/wishlist.router.js")
const cart = require("./routes/cart.router.js");
const product = require("./routes/product.router.js")
const login=require("./routes/login.router.js");
const signup=require("./routes/signup.router.js");
const user=require("./routes/user.router.js");

//mongoose conn
mongoose.connect(process.env.DB_Secret,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongoose connected")}).catch(error=>{console.log("mongoose connection problem",error)})



app.get("/", (req, res) => {
  res.send("kishankart backend")
})


app.use('/wishlist', verifyAuth,wishlist);
app.use('/cart', verifyAuth, cart);
app.use('/user', verifyAuth, user);

app.use('/product', product);
app.use('/login',login);
app.use('/signup',signup)

app.use(routeNotFound);

app.use(errorHandler);

const port=process.env.PORT || 3100
app.listen(port, () => {
  console.log('server started');
});