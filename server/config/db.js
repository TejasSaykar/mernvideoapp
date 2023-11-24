import mongoose, { mongo } from "mongoose";

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`MONGO GOT CONNECTED`);
        }).catch((err) => {
            console.log(`MONGO ERROR : ${err}`)
        })
}

export default connectDb;