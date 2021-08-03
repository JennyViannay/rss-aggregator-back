const express = require('express');
require('dotenv').config()

const categoriesRouter = require('./routes/categories');

const port = process.env.PORT || 3000;
const app = express();

app.use('/categories', categoriesRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening at port ${port}`);
    }
});
