const express = require('express');
const app = express();
//const Hirez = require('hirez.js');
//let hirez = new Hirez({
//    devId: '2670'
//    authKey: '275CD287A1654C2D8CB0B0B6885158FF'
//});
//hirez.smite('platform').session.genterate().then((res) => {
//
//})
app.use(express.static('public'));
app.get("/", (req, res) => {
    res.send('hello world');
});
app.listen(process.env.PORT || 8080);
