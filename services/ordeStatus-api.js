import apiClient from ".";

export const orderStatusApi = async (payload) => {
    try {
        const data = await apiClient.post("user/api/consumer/message-chef-after-order-placed", { json: payload }).json();
        return data;
      } catch (err) {
        // new Error(err)
        throw new Error("failed");
      }
};