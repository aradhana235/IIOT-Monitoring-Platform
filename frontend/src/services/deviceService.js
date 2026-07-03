import api from "../api/api";

export const getDevices = () => {
    return api.get("/api/devices");
};