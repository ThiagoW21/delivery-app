const express = require('express');
const cors = require('cors');
const path = require('path');

const usersRouter = require('../routers/usersRouter');
const loginRouter = require('../routers/loginRouter');
const productsRouter = require('../routers/productsRouter');
const salesRouter = require('../routers/salesRouter');
const errMid = require('../middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../../public')));
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.get('/coffee', (_req, res) => res.status(200).json({ message: 'ok, biiirll' }));

app.use(errMid);

module.exports = app;
