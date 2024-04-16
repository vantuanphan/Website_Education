const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tuaasn_dev');
        console.log('Connected BD ok');
    } catch (error) {
        console.log('Connected BD fail');
    }
}

module.exports = { connect };
