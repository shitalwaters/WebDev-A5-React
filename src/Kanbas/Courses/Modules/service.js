import axios from "axios";


const API_BASE = process.env.REACT_APP_API_BASE;
const MODULES_URL = `${API_BASE}/modules`;

export const updateModule = async (module) => {
    const response = await axios.
    put(`${MODULES_URL}/${module._id}`, module);
    return response.data;
    };