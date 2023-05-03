import mongoose from "mongoose";

//
// erstellen einer connectDB-Funktion:
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB;