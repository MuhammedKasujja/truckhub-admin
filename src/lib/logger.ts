import pino from "pino";

const isProd = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProd ? "info" : "debug"),
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          colorizeObjects: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          singleLine: false,             // keep objects multi-line
          levelFirst: true,              // [ERROR] instead of level number
          messageFormat: true
          // Optional but nice for errors
          // errorProps: '*,err,ErrorCode,Response,Status',
        },
      }
    : undefined, // production → plain JSON
  // Optional: redact sensitive fields
  redact: [
    "req.headers.cookie",
    "req.headers.authorization",
    "password",
    "token",
    "refreshToken",
  ],
});
