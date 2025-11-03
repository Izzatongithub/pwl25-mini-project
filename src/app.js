// ambil plugin dotenv
require('dotenv').config();

const express = require('express');
const app = express();
// const PORT = 3000;

const PORT = process.env.PORT || 5000;

const log = require("./middleware/log");
app.use(log);

app.use(express.json());

const toDoRouter = require('./routes/toDoRouter');
const authRouter = require('./routes/authRoutes');

const{notFoundHandler, errorHandler} = require('./middleware/errorHandler');

// const { configDotenv } = require('dotenv');

app.use('/toDo', toDoRouter);
app.use('/toDo', authRouter);

app.listen(PORT, () => {
    console.log(`Server run http://localhost:${PORT}`);
}); 

app.use(notFoundHandler);
app.use(errorHandler);
