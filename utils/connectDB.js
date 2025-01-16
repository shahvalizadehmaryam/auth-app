import mongoose from "mongoose";

async function connectDb() {
  // if it is connected so don't do anything
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to db");
}
export default connectDb;
