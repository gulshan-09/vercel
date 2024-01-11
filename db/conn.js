const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected");
    } catch (error) {
        console.log("Error", error);
    }
};

connectToDatabase();
