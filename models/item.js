const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    cost: String,
    category: String,
    stats: {
        attackSpeed: {
            String
        },
        physicalLifesteal: {
            String
        },
        magicalLifesteal: {
            String
        },
        physicalPentration: {
            String
        },
        critChance: {
            String
        },
        physicalProtection: {
            String
        },
        magicalProtection: {
            String
        },
        health: {
            String
        },
        ccr: {
            String
        },
        hp5: {
            String
        },
        movementSpeed: {
            String
        },
        mana: {
            String
        },
        mp5: {
            String
        },
        passive: {
            String
        },
        cdr: {
            String
        },
    }
});

module.exports = mongoose.model('Item', itemSchema);
