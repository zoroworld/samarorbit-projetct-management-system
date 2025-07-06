const connectDB = async (mongoose, logger) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info(`🔵 Database connected successfully`);
    console.log("🔵 MongoDB Connected");
  } catch (error) {
    logger.info(`Database connection failed: ${error.message}`);
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;