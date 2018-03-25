import {HttpRequest} from "../utils";
import ApiConf from "../ApiConf";

export const login = async (payload) => {
    try {
        return await HttpRequest.post(ApiConf.createUrl('login'), payload, 'form').then(data => data);
    } catch (e) {
        return {error:e.toString()}
    }
};
