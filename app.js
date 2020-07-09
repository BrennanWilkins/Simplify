const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('config');
const authRouter = require('./routes/auth');
const netWorthRouter = require('./routes/netWorth');
const portfolioRouter = require('./routes/portfolio');
const goalsRouter = require('./routes/goals');
const budgetsRouter = require('./routes/budgets');
const demoRouter = require('./routes/demo');

const app = express();

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(config.get('DB_URL'), { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/netWorth', netWorthRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/demo', demoRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
