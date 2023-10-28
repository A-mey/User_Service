import { Server } from "socket.io";
import * as http from "http";
// import { events } from "./events.service";
// import ProcessEvent from "./eventProcess.service";

export class SocketService {

	protected io: Server;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(httpServer: http.Server) {
		console.log("io called");
		this.io = new Server(httpServer, {
			cors: {origin : "*"}
		});
	}
}