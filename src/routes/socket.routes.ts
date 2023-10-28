import { catchError } from "../helpers/catchError.helper";
import registerController from "../controllers/login.controller";
import { Socket } from "socket.io";
import Validation from "../middleware/validation.middleware"
import { events } from "../enums/events.enum";
import { response } from "../types/response.type";

class SocketRoutes {
	process = async(socket: Socket, event: string, message: unknown) => {
		const eventKey: (keyof typeof events) = event as (keyof typeof events);
		let response: response | undefined = {success: false, code: 500, data: {message: "Something went wrong"}};
		const checkResponse = await Validation.validate(event, message);
		console.log(checkResponse, "checkResponse");
		if (checkResponse.isValid) {
			switch(eventKey) {
				case "disconnect":
					break;
				case "connect_error":
					console.log(`connect_error due to ${catchError(message)}`);
					break;
				case "EventLogin":
					response = await registerController.loginUser(event, message);
					break;
				case "EventSendOTP":
					response = await registerController.sendOtp(event, message);
					break;
				case "EventRegistration":
					response = await registerController.registerUser(event, message);
					// socket.emit("EventLoginResponse", response);
					break;
				case "EventValidateOTP":
					console.log("1");
					response = await registerController.validateOtp(event, message);
					break;
				case "EventGetSessionId":
					response = await registerController.getSessionId(event);
					break;
				case "EventVerifySessionId":
					response = await registerController.verifySessionId(event, message);
			}
		} else {
			response.code = 400;
			response.data.message = checkResponse.errorMsg;
		}

		console.log("responseEvent", events[eventKey]);

		if (eventKey === "disconnect" || eventKey === "connect_error") {return;}
		
		socket.emit(events[eventKey], response);
	};
}

export default new SocketRoutes();