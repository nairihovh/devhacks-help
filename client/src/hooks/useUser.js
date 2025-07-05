import { API_URL } from "../config/config";
import axios from "axios";

const getUser = async (id) => {
    
    try {
        const res = await axios.get(`${API_URL}/api/user/get?user_id=${id}`)
        if (res.data) {
            return res.data;
        }
    } catch (error) {
    }
    return null;
};


export default getUser