"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var express = require("express");
var path = require("path");
var testRoute_1 = require("./routes/testRoute");
var index_1 = require("./routes/index");
var user_1 = require("./routes/user");
//import scripts from './routes/scripts';
//import classes from './routes/classes';
//import types from './routes/types';
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'src')));
app.use('/test', testRoute_1.default);
app.use('/index', index_1.default);
app.use('/users', user_1.default);
//app.use('/src/scripts',scripts);
//app.use('/src/classes', classes);
//app.use('/src/types', types);
//app.get('/scripts/testScript.js', (req: express.Request, res: express.Response) => {
//    res.sendFile(path.join(__dirname, 'scripts', 'testScript.js'));
//});
app.get('/', function (req, res) {
    res.sendFile(path.join(app.get('views'), 'testPage.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log("Server listeneing on port" + server.address().port);
});
//# sourceMappingURL=app.js.map