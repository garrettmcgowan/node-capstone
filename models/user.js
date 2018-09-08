const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});
model.exports = mongoose.model('User', userSchema);
