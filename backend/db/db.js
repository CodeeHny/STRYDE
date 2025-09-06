import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/STRYDE`
    );
    console.log(
      `\n MongoDB connected !! || HOST : ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log('Failed to connect server || error : ', error);
  }
};

export default connectDb;