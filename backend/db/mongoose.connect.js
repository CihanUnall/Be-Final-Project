import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri === "ENTER YOUR CONNECTION STRING HERE") {
    console.error(":x: No valid MongoDB connection string found in .env!");
    console.warn(":nach_rechts_zeigen: Look at the DB_MONGO_URI in .env-file.");
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000,
    });
    console.log(":weißes_häkchen: MongoDB connection established");
  } catch (err) {
    console.error(":x: MongoDB connection error:", err.message);
    process.exit(1);
  }
  mongoose.connection.on("error", (err) => {
    console.error(":ausrufezeichen: Mongoose runtime error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn(":stecker: Mongoose disconnected");
  });
};
