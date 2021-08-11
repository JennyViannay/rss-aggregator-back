const express = require('express');
var cors = require('cors')

require('dotenv').config()

const categoriesRouter = require('./routes/categories');
const fluxRouter = require('./routes/flux');
const usersRouter = require('./routes/users');
const { tokenMiddleware } = require('./middlewares/tokenMiddleware');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors(), express.json())
app.use('/users', usersRouter);
app.use(tokenMiddleware)
app.use('/categories', categoriesRouter);
app.use('/flux', fluxRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening at port ${port}`);
    }
});
