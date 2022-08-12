const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const router = require('./routes/routes');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const wishlistRouter = require('./routes/wishlistRouter');
const productRouter = require('./routes/Products')
const giftCardRouter = require("./routes/Giftcards");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongodb = 'mongodb+srv://nirav:Assignment3!@cluster0.dmey5jx.mongodb.net/shopit?retryWrites=true&w=majority';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('database connection successfully'));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/cart',cartRouter);
app.use('/user',userRouter);
app.use("/", orderRouter);
app.use("/", wishlistRouter);
app.use("/", productRouter)
app.use("/", giftCardRouter);
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
