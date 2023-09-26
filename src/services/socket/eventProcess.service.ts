import { catchError } from "../../helpers/catchError.helper";
import registerController from "../../controllers/register.controller";
import { Socket } from "socket.io";
import Validation from "../../middleware/validation.middleware"

class ProcessEvent {
	process = async(socket: Socket, event: string, message: unknown) => {
		let response: response | undefined = {success: false, code: 500, data: {message: "Something went wrong"}};
		const checkResponse = await Validation.validate(event, message);
		if (!checkResponse.isValid) {
			response.code = 400;
			response.data.message = checkResponse.errorMsg;
		}
		switch(event) {
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
			case "EventRegistration": {
				response = await registerController.registerUser(event, message);
				// socket.emit("EventLoginResponse", response);
				break;
			}  
		}
		socket.emit("EventLoginResponse", response);
	};
}

export default new ProcessEvent();