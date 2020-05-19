"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const path = require("path");
//import classes from './routes/classes';
const app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
//app.use((req, res, next) => {
//    console.log(req.url);
//    next();
//});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views', 'testPage.html'));
});
app.use(express.static(path.join(__dirname, '../client/public')));
//app.use('/\*/classes/', classes);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('EnterBtnClicked', (msg) => {
        console.log('message: ' + msg);
        io.emit('Output', msg + "</br></br>This Came From Server!");
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.send("respond with a BLANK resource");
    });
}
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("respond with a BLANK resource");
});
app.set('port', process.env.PORT || 3000);
const server = http.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log("Server listeneing on port" + server.address().port);
});
//# sourceMappingURL=server.js.map