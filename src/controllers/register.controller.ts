import httpRequestService from "../services/httpRequest.service";

class RegistrationController {
	registerUser = async(newUserData: unknown): Promise<response | undefined> => {
		const url = "http://localhost:3000/registerUser";
		const data = newUserData as object;
		// console.log(data);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
		const response = await httpRequestService.postRequest(url, data);
		console.log("response", response);
		return response;

	};
}

export default new RegistrationController();