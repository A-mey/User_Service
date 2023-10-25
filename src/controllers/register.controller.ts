import httpRequestService from "../services/httpRequest.service";
import compileSchema from "../services/schema/compile.schema";
import { response } from "../types/response.type";

class RegistrationController {
	registerUser = async (event: string, newUserData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = newUserData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	loginUser = async (event: string, userData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = userData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	sendOtp = async (event: string, userData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = userData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	validateOtp = async (event: string, userData: unknown): Promise<response | undefined> => {
		console.log("2");
		const url = process.env[event]!;
		const data = userData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	getSessionId = async (event: string): Promise<response | undefined> => {
		const url = process.env[event]!;
		const response = await httpRequestService.getRequest(url);
		console.log("response", response);
		return response;
	}

	verifySessionId = async (event: string, sessionData: unknown): Promise<response | undefined> => {
		const url = process.env[event]!;
		const data = sessionData as object;
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;
	}



}

export default new RegistrationController();