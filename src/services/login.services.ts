import httpServices from "../common/services/http/http.services";
import { response } from "../types/response.type";

class LoginServices {
    login = async (event: string, loginDataObject: object): Promise<response | undefined> => {
        const url = process.env[event + "1"]!;
		const response = await httpServices.postRequest(url, loginDataObject);
        return response;
    }

    addUserDataToSession = async (event: string, userData: object) : Promise <response | undefined> => {
        const url = process.env[event + "2"]!;
		const response = await httpServices.postRequest(url, userData);
        return response;
    }


}

export default new LoginServices();