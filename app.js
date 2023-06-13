// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// require('dotenv').config()

// var productRouter = require('./routes/product');
// var categorieRouter =require('./routes/categorie')
// var usersRouter = require('./routes/users');

// var app = express();
    
// app.use(logger('dev'));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // app.use('/', productRouter);
// app.use('/categorie',categorieRouter)
// app.use('/product', productRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //   next(createError(404));
// // });

// // error handler
// // app.use(function(err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.json('error');
// // });

// module.exports = app;
// ____________________________________________________________________________________________
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

require('dotenv').config()

// const authJwt = require('./middleware/auth-jwt')

var productRouter = require('./routes/product');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categorie');
var orderRouter =require('./routes/order')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());// gestion des cookies
app.use(express.static(path.join(__dirname, 'public')));
// app.use(authJwt())
app.use('/order',orderRouter )
app.use('/product', productRouter);
app.use('/categorie', categoriesRouter);
app.use('/users', usersRouter);
                
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};// ls erreurs dial developpement 

//   // render the error page
//   res.status(err.status || 500);
//   res.json('error');
// });

module.exports = app;