import api from "../api/api";

export const getTelemetry = (deviceId) => {
    return api.get(`/api/telemetry/${deviceId}`);
};