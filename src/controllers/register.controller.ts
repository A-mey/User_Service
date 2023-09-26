import httpRequestService from "../services/httpRequest.service";
import compileSchema from "../services/schema/compile.schema";

class RegistrationController {
	registerUser = async(event: string, newUserData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = newUserData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	loginUser = async(event: string, userData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = userData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	sendOtp = async(event: string, userData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = userData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	};



}

export default new RegistrationController();