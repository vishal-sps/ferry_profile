import apiClient from "..";

export const getChefHourlyRate = async (payload) => {
    try {
        const data = await apiClient.get(`pub/get-chef-hourly-rate/${payload}`).json();
        return data;
    } catch (err) {
        throw new Error(err);
    }
}
