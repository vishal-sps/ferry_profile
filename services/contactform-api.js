import apiClient from ".";
export const submitContactForm = async (payload) => {
    try {
      const data = await apiClient.post("user/pub/contactUs", { json: payload }).json();
      return data;
    } catch (err) {
      throw new Error("failed");
    }
  };