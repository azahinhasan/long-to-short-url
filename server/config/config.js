require("dotenv").config();

const config = {
  THROTTLING_WINDOW_MS: 60000 * 10, //10 MIN
  THROTTLING_LIMIT_EACH_IP: 20,
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5003,
  JWT_SECRET: process.env.JWT_SECRET || "tkf2efDPQEqKKmq",
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://admin:vsuyGLadTUkMA3oP@cluster0.u3psp.mongodb.net/long_to_short_url?authMechanism=DEFAULT",
};

module.exports = config;
