import * as http from "http";
import { SocketService } from "./socket.service";
import {events} from "./events.service";
import ProcessEvent from "./eventProcess.service";
import { Socket } from "socket.io";

export class ConnectSocketService extends SocketService {

	constructor(httpServer: http.Server) {
		super(httpServer);
		// this.connectSocket();
	}

	connectSocket = async() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.io.on("connection", (socket: Socket) => {
			console.log("a user connected");
			
			events.forEach((event: string) => {
				socket.on(event, (message) => {
					ProcessEvent.process(socket, event, message);
				});
			});
		});  
	};   
}