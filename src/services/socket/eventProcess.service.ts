import { catchError } from "../../helpers/catchError.helper";
import registerController from "../../controllers/register.controller";
import { Socket } from "socket.io";

class ProcessEvent {
	process = async(socket: Socket, event: string, message: unknown) => {
		switch(event) {
		case "disconnect":
			break;
		case "connect_error":
			console.log(`connect_error due to ${catchError(message)}`);
			break;
		case "EventLogin":
			break;
		case "EventRegistration": {
			const response = await registerController.registerUser(message);
			console.log("socketResponse", response);
			socket.emit("EventLoginResponse", response);
			break;
		}
			
                
		}
	};
}

export default new ProcessEvent();