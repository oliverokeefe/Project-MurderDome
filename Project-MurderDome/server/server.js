"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const path = require("path");
const testRoute_1 = require("./routes/testRoute");
const index_1 = require("./routes/index");
const user_1 = require("./routes/user");
const classes_1 = require("./routes/classes");
const app = express();
// view engine setup
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/test', testRoute_1.default);
app.use('/index', index_1.default);
app.use('/users', user_1.default);
app.use('/\*/classes/', classes_1.default);
app.get('/', (req, res) => {
    res.sendFile(path.join(app.get('views'), 'testPage.html'));
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log("Server listeneing on port" + server.address().port);
});
//# sourceMappingURL=server.js.map