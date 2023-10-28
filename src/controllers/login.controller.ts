import httpServices from "../common/services/http/http.services";
import compileSchema from "../common/services/schema/compile.schema";
import { response } from "../types/response.type";
import LoginServices from "../services/login.services"

class LoginController {
	registerUser = async (event: string, newUserData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = newUserData as object;
		const response = await httpServices.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	loginUser = async (event: string, data: unknown): Promise<response | undefined> => {
		const loginDataObject = data as {SESSIONID: string, LOGINDATA: object};
		const loginData = loginDataObject.LOGINDATA;
		const sessionId = loginDataObject.SESSIONID;
		const loginResponse = await LoginServices.login(event, loginData);
		console.log("loginResponse", loginResponse);
		const userdata = loginResponse?.data.data
		const sessionData = {SESSIONID: sessionId, SESSIONDATA: userdata};
		const addUserDatatoSessionResponse = await LoginServices.addUserDataToSession(event, sessionData);
		console.log("addUserDatatoSessionResponse", addUserDatatoSessionResponse);
		if (addUserDatatoSessionResponse?.code === 200) {
			return loginResponse;
		} else {
			const response: response = {code: 500, success: false, data: {message: "Something went wrong"}};
			return response;
		}
	};

	sendOtp = async (event: string, userData: unknown): Promise<response | undefined> => {
		// const url = "http://localhost:3000/registerUser";
		const url = process.env[event]!;
		const data = userData as object;
		const response = await httpServices.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	validateOtp = async (event: string, userData: unknown): Promise<response | undefined> => {
		console.log("2");
		const url = process.env[event]!;
		const data = userData as object;
		const response = await httpServices.postRequest(url, data);
		console.log("response", response);
		return response;
	};

	getSessionId = async (event: string): Promise<response | undefined> => {
		const url = process.env[event]!;
		const response = await httpServices.getRequest(url);
		console.log("response", response);
		return response;
	}

	verifySessionId = async (event: string, sessionData: unknown): Promise<response | undefined> => {
		const url = process.env[event]!;
		const data = sessionData as object;
		const response = await httpServices.postRequest(url, data);
		console.log("response", response);
		return response;
	}
}

export default new LoginController();