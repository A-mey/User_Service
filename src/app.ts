import { createServer } from "http";

// import { Server } from "socket.io";


import { ConnectSocketService } from "./common/services/socket/connect.service";
import * as dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.DEPLOY_STAGE}` });
if (dotenvResult.error) {
	throw dotenvResult.error;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
// import { MailConsumer } from "./services/mailer/consumer.mailer";

const PORT = parseInt(process.env.PORT!, 10) || 4201;
console.log(PORT);

// const runConsumer = async (): Promise<void> => {
// 	const topic = process.env.MAIL_TOPIC!;
// 	console.log(topic);
// 	const mailConsumer: MailConsumer = new MailConsumer(topic);
// 	await mailConsumer.connect();
// };
  
// runConsumer()
// 	.then(() => {
// 		console.log("Consumer is running...");
// 	})
// 	.catch((error) => {
// 		console.error("Failed to run kafka consumer", error);
// 	});



const httpServer = createServer();

// const io = new Server(httpServer, {
// 	cors: {origin : "/*"}
// });

// connectSocket = async() => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// io.on("connection", (socket) => {
// 	console.log("a user connected");

// 	socket.on("message", (message) => {
// 		console.log(message);
// 	});

// socket.on("disconnect", () => {
// 	console.log("a user disconnected!");
// });

// socket.on("connect_error", (err) => {
// 	console.log(`connect_error due to ${err.message}`);
// });
// });
// };   

const socketService = new ConnectSocketService(httpServer);
socketService.connectSocket();

httpServer.listen(PORT);