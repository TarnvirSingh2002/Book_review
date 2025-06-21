import mongoose from "mongoose";

export const db=()=>{
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error(err));
}