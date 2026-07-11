import api from "../api/api";

export const getDevices = () => {

    const token = localStorage.getItem("token");

    return api.get("/api/devices", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};