const mongoose = require('mongoose');
const MONGO_URI='mongodb+srv://zouhairfgra:root@cluster0.nuy3tte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDatabase = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose Connected");
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = connectDatabase;