const mongoose = require('mongoose');
const buildSchema = mongoose.Schema({
    item1: "string",
    item2: "string",
    item3: "string",
    item4: "string",
    item5: "string",
    item6: "string",
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Build', buildSchema);
