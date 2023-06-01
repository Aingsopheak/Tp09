const mongoose = require('mongoose');

module.exports = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tp09', {
            autoIndex: true,
            serverSelectionTimeoutMS: 30000 
        });
        console.log("MongoDB successfully connected~");

    } catch (err) {
        console.log("Mongoose: ", err);
    }
}