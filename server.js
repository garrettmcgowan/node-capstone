const express = require('express');
const app = express();
app.use(express.static('public'));
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});
app.listen(process.env.PORT || 8080);
