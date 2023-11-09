import * as http from "http";
import { SocketService } from "./socket.service";
// import {events} from "./events.service";
import {events} from "../../../enums/events.enum"
import ProcessEvent from "../../../routes/socket.routes";
import { Socket } from "socket.io";
import EventHandlerEvent from "../../../events/eventHandler.event";

export class ConnectSocketService extends SocketService {

	constructor(httpServer: http.Server) {
		super(httpServer);
		// this.connectSocket();
	}

	connectSocket = async() => {
		console.log("connection function called")

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.io.on("connection", async (socket: Socket) => {
			console.log("a user connected");

			// const eventKeys = Object.keys(events);

			
			// eventKeys.forEach((event: string) => {
			// 	socket.on(event, (message) => {
			// 		ProcessEvent.process(socket, event, message);
			// 	});
			// });
			await EventHandlerEvent.handleEvent(socket);
		}); 
	};   
}