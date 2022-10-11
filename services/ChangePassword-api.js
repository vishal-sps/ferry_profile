import apiClient from ".";
export const changePaswordApi  = async (payload) => {
    try {
      const res = await apiClient.post("user/api/consumer/change-password", { json: payload }).json();
       return res;
    } catch (err) {
      console.log('error', err);
      throw new Error("failed");
    }
  };