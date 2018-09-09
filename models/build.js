const mongoose = require('mongoose');
const buildSchema = mongoose.Schema({
    name: {
        String
    },
    item1: {
        String
    },
    item2: {
        String
    },
    item3: {
        String
    },
    item4: {
        String
    },
    item5: {
        String
    },
    item6: {
        String
    },
    description: {
        String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Build', buildSchema);
