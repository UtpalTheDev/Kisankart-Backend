const express = require('express');
let bodyparse = require('body-parser');
const mongoose = require('mongoose');
const {Schema} =mongoose;
const cors = require('cors');
const app = express();



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
mongoose.connect('mongodb+srv://utpal:utpalpati@cluster0.pxyfi.mongodb.net/kisankart?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongoose connected")}).catch(eror=>{console.log("mongoose connection problem",error)})



app.get("/", (req, res) => {
  // throw Error("galat")
  res.send("nahi he")
})


app.use('/wishlist', verifyAuth,wishlist);
app.use('/cart', verifyAuth, cart);
app.use('/user', verifyAuth, user);

app.use('/product', product);
app.use('/login',login);
app.use('/signup',signup)

app.use(routeNotFound);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});