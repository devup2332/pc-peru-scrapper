import express from "express";
import morgan from "morgan";
import RipleyRouter from "./routes/ripley.router";
import CycComputerRouter from "./routes/cyccomputer";
import { logMessage } from "./lib/log";

const server = express();

server.use(morgan("common"));
server.use("/ripley", RipleyRouter);
server.use("/cyccomputer", CycComputerRouter);

server.listen(process.env.PORT, () => {
  logMessage(`Server running on port ${process.env.PORT}`, "green");
});
