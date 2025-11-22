import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "b0qxompucw36xbuz8jdi-mysql.services.clever-cloud.com",
  user: process.env.DB_USER || "u8rqr2evyaarccbi",
  password: process.env.DB_PASSWORD || "U15r3MMosNsION7NdWnP",
  database: process.env.DB_NAME || "b0qxompucw36xbuz8jdi",
  port: process.env.DB_PORT || 3306,
});